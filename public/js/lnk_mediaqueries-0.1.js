var lnkmq_viewportHeight = "0"; // actual height
var lnkmq_viewportWidth = "0"; // actual width
var lnkmq_actualAR = "0"; // float aspect ratio number 
var lnkmq_actualMQ = "wide"; // default value
var lnkmq_actualMQindex = "1"; // default value


var lnkmq_aspectList = [
    {name:"super-wide", min:(8/3), max:20},
    {name:"wide", min:(16/11), max:(8/3)},
    {name:"square", min:(3/4), max:(10/11)},
    {name:"narrow", min:(2/4), max:(3/4)},
    {name:"super-narrow", min:(0), max:(2/4)}
];

jQuery(window).load(function(){
    lnkmq_updateActualMQ();
    
    jQuery(window).on("resize",function(){
        lnkmq_updateActualMQ();
    });
});

function lnkmq_refreshVars() {
    lnkmq_viewportHeight = jQuery(window).height();
    lnkmq_viewportWidth = jQuery(window).width();
    lnkmq_actualAR = lnkmq_viewportWidth / lnkmq_viewportHeight; 
} 

function lnkmq_updateActualMQ(){
    lnkmq_refreshVars();
    lnkmq_aspectList.forEach(function(item,index){
        if(lnkmq_actualAR > item.min && lnkmq_actualAR < item.max){
            lnkmq_actualMQ = item.name;
            lnkmq_actualMQindex = index;
            console.log(index,item.name);
        }
    });
}


