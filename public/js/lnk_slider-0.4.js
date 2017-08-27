/**
 * Slider Plugin
 * By: linkerx
 * Version: 0.4
 */

function lnk_slider(options){
    var self = this;
    self.options = options;
    self.timer = null;

    self.contentToCompleta = function(slide){
        jQuery(self.options.target.container).animate({opacity:0},self.options.transition.effectTime,function(){
            var link = jQuery(self.options.source.container+" "+self.options.source.prefix+slide+self.options.source.suffix+" "+self.options.source.link).attr("href");
            //console.log(self.options.source.container+" "+self.options.source.link,link);
            if(self.options.copy.image){
                if(self.options.imageAsBackground){
                    var image = jQuery(self.options.source.container+" "+self.options.source.prefix+slide+self.options.source.suffix+" "+self.options.source.image).css("background-image");
                    jQuery(self.options.target.container+" "+self.options.target.image).css("background-image",image);
                    var html_image = "";
                    if(self.options.targetLink.image) {
                        jQuery(self.options.target.container+" "+self.options.target.image).html("<a href='"+link+"' ></a>");
                    }
                } else {
                    var image_selector = self.options.source.container+" "+self.options.source.prefix+slide+self.options.source.suffix+" "+self.options.source.image;
                    var image = jQuery().html(image_selector);
                    var html_image = "";
                
                    if(self.options.targetLink.image) {
                        html_image = "<a href='"+link+"' >"+image+"</a>";
                    } else {
                        html_image = image;
                    }
                    jQuery(self.options.target.container+" "+self.options.target.image).html(html_image);
                }
            }
            if(self.options.copy.title){
                var title_selector = self.options.source.container+" "+self.options.source.prefix+slide+self.options.source.suffix+" "+self.options.source.title;
                var title = jQuery(title_selector).text();
                var html_title = "";
                
                //debugger;
                
                if(self.options.targetLink.title) {
                    html_title = self.options.inserts.beforeTitle+"<a href='"+link+"' >"+title+"</a>"+self.options.inserts.afterTitle;
                } else {
                    html_title = self.options.inserts.beforeTitle+title+self.options.inserts.afterTitle;
                }
                
                jQuery(self.options.target.container+" "+self.options.target.title).html(html_title);
            }
            if(self.options.copy.excerpt){
                var excerpt = jQuery(self.options.source.container+" "+self.options.source.prefix+slide+self.options.source.suffix+" "+self.options.source.excerpt).html();
                var html_excerpt = "";
                
                if(self.options.targetLink.excerpt) {
                    html_excerpt = "<a href='"+link+"' >"+excerpt+"</a>";
                } else {
                    html_excerpt = excerpt;
                }
                
                jQuery(self.options.target.container+" "+self.options.target.excerpt).html(html_excerpt);
            }
            if(self.options.copy.extra1){
                var extra1 = jQuery(self.options.source.container+" "+self.options.source.prefix+slide+self.options.source.suffix+" "+self.options.source.extra1).html();
                var html_extra1 = "";
                
                if(self.options.targetLink.extra1) {
                    html_extra1 = "<a href='"+link+"' >"+extra1+"</a>";
                } else {
                    html_extra1 = extra1;
                }
                jQuery(self.options.target.container+" "+self.options.target.extra1).html(html_extra1);
            }
            if(self.options.copy.extra2){
                var extra2 = jQuery(self.options.source.container+" "+self.options.source.prefix+slide+self.options.source.suffix+" "+self.options.source.extra2).html();
                var html_extra2 = "";
                
                if(self.options.targetLink.extra2) {
                    html_extra2 = "<a href='"+link+"' >"+extra2+"</a>";
                } else {
                    html_extra2 = extra2;
                }
                jQuery(self.options.target.container+" "+self.options.target.extra1).html(html_extra2);
            }
            if(self.options.copy.extra3){
                var extra3 = jQuery(self.options.source.container+" "+self.options.source.prefix+slide+self.options.source.suffix+" "+self.options.source.extra3).html();
                var html_extra3 = "";
                
                if(self.options.targetLink.extra3) {
                    html_extra3 = "<a href='"+link+"' >"+extra3+"</a>";
                } else {
                    html_extra3 = extra3;
                }
                jQuery(self.options.target.container+" "+self.options.target.extra1).html(html_extra3);
            }
            self.afterCopy();
            jQuery(self.options.source.container+" "+self.options.source.all).removeClass("selected");
            jQuery(self.options.target.container).animate({opacity:1},750,function(){
                jQuery(self.options.source.container+" "+self.options.source.prefix+slide+self.options.source.suffix).addClass("selected");
                slide++;
                if(slide === self.options.source.count) slide = 0;
                self.timer = setTimeout(function(){self.contentToCompleta(slide);}, self.options.transition.time);
            });
        });
    };

    self.run = function(){
        self.contentToCompleta(self.options.source.first);
        jQuery(self.options.source.container+" "+self.options.source.all).on("click",function(){
            clearTimeout(self.timer);
            self.contentToCompleta(jQuery(this).attr(self.options.source.nav_attr));
        });

    };

    self.afterCopy = function(){};
}