/**
 * Parallax Controller
 * By: linkerx
 * Version: 0.4
 */

/**
 * Setup
 */
var lnkplax_viewportHeight = jQuery(window).height();
var lnkplax_viewportWidth = jQuery(window).width();
var lnkplax_headerHeight = (lnkplax_viewportHeight / 100) * 8;
var lnkplax_navigatorHeight = 0;

var lnkplax_automoveOnScroll = false;
var lnkplax_automoveOnResize = true;

var lnkplax_hideHeaderOnMove = false;
var lnkplax_hideHeaderOnFirst = false;
var lnkplax_changeHeaderClassOnTop = false;
var lnkplax_activeNavigatorItem = true;
var lnkplax_activeNavigatorItemClass = "active";

var lnkplax_parallaxSelector = "body.home .parallax";
var lnkplax_navigatorSelector = "#parallax-navigator";
var lnkplax_navigatorItemsSelector = "ul li";
var lnkplax_navigatorUniqueItemPrefix = "#parallax-page-";
var lnkplax_headerSelector = "body.home > header";
var lnkplax_headerTopClass = "toppage";
var lnkplax_headerNoTopClass = "notoppage";

var lnkplax_animationSpeed = 1000;
var lnkplax_checkResizeWaitTime = 500;
var lnkplax_checkScrollWaitTime = 200;

var lnkplax_debugMode = 1;

/**
 * Initial State
 */
var lnkplax_actualView = 0;
var lnkplax_lastScrollTop = 0;

var lnkplax_moving = false;
var lnkplax_movingTo = 0;

/**
 * Parallax navigation array
 * @var top: valor del scrolltop expresado en vh
 */
var lnkplax_parallaxArray = [
    {view: 0, name: "Inicio", top: 0},
    {view: 1, name: "Novedades", top: 100},
    {view: 2, name: "Carerras", top: 200},
];

jQuery(window).load(function(){
    
    jQuery(lnkplax_parallaxSelector).on("scroll",function(){
        lnkplax_onScroll();
    });
    
    jQuery(lnkplax_navigatorSelector).on("click","ul li:not(.active)",function(){
        var newView = parseInt(jQuery(this).attr('view'));
        if(lnkplax_debugMode) console.log("Navigator Click: ",newView);
        lnkplax_scrollTo(newView);    
    });
    
    jQuery(window).on("resize",function(){
        lnkplax_checkWindowsResize();
    });
    
    lnkplax_updateView();
});

function lnkplax_onScroll(){
    if(!lnkplax_moving){
        var thisScrollTop = jQuery(lnkplax_parallaxSelector).scrollTop();
        if(lnkplax_debugMode) console.log("Manual Scroll: ",thisScrollTop);
        lnkplax_checkManualScroll(thisScrollTop);
    }
}

function lnkplax_scrollUp(){
    var newView = lnkplax_actualView - 1;
    scrollTo(newView);
}

function lnkplax_scrollDown(){
    var newView = lnkplax_actualView + 1;   
    scrollTo(newView);
}

function lnkplax_scrollTo(newView){
    if(lnkplax_debugMode) console.log("Scrolling to: ",newView);
    lnkplax_onStartScroll(newView);
    var newViewScroll = (lnkplax_viewportHeight / 100) * lnkplax_parallaxArray[newView].top;
    jQuery(lnkplax_parallaxSelector).animate({scrollTop: newViewScroll},lnkplax_animationSpeed,function(){
        lnkplax_onCompleteScroll(lnkplax_movingTo);
    });
}

function lnkplax_onStartScroll(newView) {
    if(lnkplax_hideHeaderOnMove) {
	jQuery(lnkplax_headerSelector).hide();
    }    
    lnkplax_moving = true;
    if(lnkplax_debugMode) console.log("moving: true");
    lnkplax_movingTo = newView;
}

function lnkplax_onCompleteScroll(newView) {
    lnkplax_moving = false;
    if(lnkplax_debugMode) console.log("moving: false");
    lnkplax_actualView = newView;
    lnkplax_lastScrollTop = jQuery(lnkplax_parallaxSelector).scrollTop();
    lnkplax_updateView();
}

function lnkplax_updateView() {
    //console.log(actualView,jQuery(parallaxSelector).scrollTop(),(viewportHeight / 100) * parallaxArray[actualView].top);
    if(lnkplax_hideHeaderOnFirst) {
        if(lnkplax_actualView === 0) {
            jQuery(lnkplax_headerSelector).hide();
	} else {
            jQuery(lnkplax_headerSelector).show();
        }
    } else {
        jQuery(lnkplax_headerSelector).show();        
    }
    if(lnkplax_changeHeaderClassOnTop) {
        if(lnkplax_lastScrollTop === 0){
            jQuery(lnkplax_headerSelector).removeClass(lnkplax_headerNoTopClass);
            jQuery(lnkplax_headerSelector).addClass(lnkplax_headerTopClass);
        } else {
            jQuery(lnkplax_headerSelector).removeClass(lnkplax_headerTopClass);
            jQuery(lnkplax_headerSelector).addClass(lnkplax_headerNoTopClass);
        }
    }
    
    if(lnkplax_activeNavigatorItem) {
        jQuery(lnkplax_navigatorSelector+" "+lnkplax_navigatorItemsSelector).removeClass(lnkplax_activeNavigatorItemClass);
        jQuery(lnkplax_navigatorSelector+" "+lnkplax_navigatorUniqueItemPrefix+lnkplax_actualView).addClass(lnkplax_activeNavigatorItemClass);
    }
}

function lnkplax_checkManualScroll(scrollTop) {
    
    setTimeout(function(){
        var thisScrollTop = jQuery(lnkplax_parallaxSelector).scrollTop();
        if(scrollTop === thisScrollTop) {
            var relativeScrollTop = scrollTop / (lnkplax_viewportHeight / 100);
            if((relativeScrollTop > lnkplax_parallaxArray[lnkplax_actualView].top +2) || (relativeScrollTop < lnkplax_parallaxArray[lnkplax_actualView].top -2)) {

                if(lnkplax_debugMode) {
                    var direction = "down";
                    if(thisScrollTop > lnkplax_lastScrollTop){
                        direction = "down";
                    } else {
                        direction = "up";
                    }
                    console.log("Scroll Stop: ",thisScrollTop," Relative: ",relativeScrollTop, " Direction: ",direction);
                }
            
                var x = 0;
                var found = 0;
                for(x = 0; x < lnkplax_parallaxArray.length; x++){
                    if(!found){
                        if(lnkplax_debugMode) console.log("actualView Top: ",lnkplax_parallaxArray[x].top);
                        if (x + 1 < lnkplax_parallaxArray.length && relativeScrollTop >= lnkplax_parallaxArray[x].top && relativeScrollTop < lnkplax_parallaxArray[x+1].top) {
                            found = 1;
                            lnkplax_actualView = x;
                            if(lnkplax_automoveOnScroll) {
                                if(thisScrollTop > lnkplax_lastScrollTop){                              
                                    lnkplax_scrollTo(lnkplax_actualView+1);
                                } else {
                                    lnkplax_scrollTo(lnkplax_actualView);
                                }
                            }
                        }
                    }
                }
            lnkplax_updateView();
            }
        } else {
            if(lnkplax_debugMode) console.log("Scroll ignored");
        }
    },lnkplax_checkScrollWaitTime);
}

function lnkplax_checkWindowsResize() {
    var reziseHeight = jQuery(window).height();
    var reziseWidth = jQuery(window).width();
    setTimeout(function(){
        if(reziseHeight === jQuery(window).height() && reziseWidth === jQuery(window).width())
        {
            lnkplax_viewportHeight = jQuery(window).height();
            lnkplax_viewportWidth = jQuery(window).width();
            if(lnkplax_automoveOnResize) {
                lnkplax_scrollTo(lnkplax_actualView);
            }
        }
        lnkplax_updateView();
    }, lnkplax_checkResizeWaitTime);
}