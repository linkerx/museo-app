/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var lnkscrollfx_viewportHeight = jQuery(window).height();
var lnkscrollfx_debug = false;

var lnkscrollfx_array = [
    {
        selector: "body.home > header",
        scroll_from: 10,
        scroll_to: 30,
        value_from: 0,
        value_to: 1,
        value_unit: "",
        fx_property: "background-color",
        fx_value: "rgba(0,0,0,data)"
    },
    {
        selector: "body.home > header .site-title .logo img",
        scroll_from: 0,
        scroll_to: 10,
        value_from: 6.5,
        value_to: 5,
        value_unit: "vh",
        fx_property: "height",
        fx_value: "data"
    },
    {
        selector: "body.home > header .site-title .title a",
        scroll_from: 0,
        scroll_to: 10,
        value_from: 3,
        value_to: 2.5,
        value_unit: "vh",
        fx_property: "font-size",
        fx_value: "data"
    },
    {
        selector: "body.home > header .site-title .title .bapro",
        scroll_from: 0,
        scroll_to: 10,
        value_from: 0.5,
        value_to: 0.2,
        value_unit: "vh",
        fx_property: "margin-top",
        fx_value: "data"
    },
    {
        selector: "body.home > header .menu-icon i",
        scroll_from: 0,
        scroll_to: 10,
        value_from: 10,
        value_to: 8,
        value_unit: "vh",
        fx_property: "font-size",
        fx_value: "data"
    },
    
];

jQuery(window).load(function(){
    lnkscrollfx_onScroll();
});

function lnkscrollfx_onScroll() {
    setInterval(function(){
        window.requestAnimationFrame( function() {
            var scroll = jQuery(lnkplax_parallaxSelector).scrollTop();
            lnkscrollfx_array.forEach(function(effect){
                var fx_obj = jQuery(effect.selector);
                var scroll_from = (lnkscrollfx_viewportHeight / 100) * effect.scroll_from;
                var scroll_to = (lnkscrollfx_viewportHeight / 100)  * effect.scroll_to;
                
                if(scroll >= scroll_from && scroll <= scroll_to){
                    var percentaje = lnkscrollfx_percentaje(scroll,scroll_from,scroll_to);
                    var value = lnkscrollfx_reverse_percentaje(percentaje,effect.value_from,effect.value_to);
                    var css = effect.fx_value.replace("data",value+effect.value_unit);
                    if(lnkscrollfx_debug) console.log("scroll: "+scroll+" si. css: "+css);
                    fx_obj.css(effect.fx_property,css);            
                } else if(scroll < scroll_from && fx_obj.css(effect.fx_property)!= effect.value_from+effect.value_unit) {
                    var css = effect.fx_value.replace("data",effect.value_from+effect.value_unit);
                    if(lnkscrollfx_debug) console.log("scroll: "+scroll+" si. "+fx_obj.css(effect.fx_property)+" != de "+effect.value_from+effect.value_unit+". css: "+css);
                    fx_obj.css(effect.fx_property,css);
                } else if(scroll > scroll_to && fx_obj.css(effect.fx_property)!= effect.value_to+effect.value_unit) {
                    var css = effect.fx_value.replace("data",effect.value_to+effect.value_unit);
                    if(lnkscrollfx_debug) console.log("scroll: "+scroll+" si. "+fx_obj.css(effect.fx_property)+" != de "+effect.value_to+effect.value_unit+". css: "+css);
                    fx_obj.css(effect.fx_property,css);
                } else {
                    if(lnkscrollfx_debug) console.log("scroll: "+scroll+" no.");
                }
            });
        });
    },10);
}

function lnkscrollfx_percentaje(x,a,b) {
    return (x-a)/(b-a);
}

function lnkscrollfx_reverse_percentaje(x,a,b) {
    return (x*(b-a))+a;
}

