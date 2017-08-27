/* FONDOS: mejorar */

var lnkbg_fondoActual = 0;
var lnkbg_cantidadFondos = 0;
var lnkbg_fondos = [];
var lnkbg_velocidadFondo = 10000;

var lnkbg_sliderBack = "#home-inicio .slider";
var lnkbg_sliderFront = "#home-inicio .slider .slider-effect";

var lnkbg_zoomTo = 1.2;

var lnkbg_timer;

jQuery(window).load(function(){
	lnkbg_cargarFondosHome();
});

function lnkbg_cargarFondosHome(){
	
	var gal = "inicio";
        
        var data = {
            action: "lnk_get_background",
            gallery: gal
        }
	
	var success = function(response){
            //console.log(lnkbg_fondos);
            lnkbg_fondos = JSON.parse(response);
            lnkbg_cantidadFondos = lnkbg_fondos.length;
            console.log("se llama en el success del ajax");
            lnkbg_rotarFondos(lnkbg_cantidadFondos);
	};
	
	$.ajax({
            type: "POST",
            url: ajaxurl,
            data: data,
            success: success
        });
}

function lnkbg_ponerFondo(fondo){
	
	var cssBG = "url('"+lnkbg_fondos[fondo]['url']+"')";
	//console.log(cssBG);
	
        jQuery(lnkbg_sliderBack).css("background-image",cssBG);
	setTimeout(function(){
            jQuery(lnkbg_sliderFront).animate({opacity: "0"},4000,function(){
		jQuery(lnkbg_sliderFront).css("background-image",cssBG);
                jQuery(lnkbg_sliderFront).css("transform","scale(1)");
		jQuery(lnkbg_sliderFront).css("opacity","1");
            });
        }, 1000);

	lnkbg_fondoActual = fondo;
}

function lnkbg_forzarFondo(url){
	var cssBG = "url('"+url+"')";
	//console.log(cssBG);
	
        jQuery(lnkbg_sliderBack).css("background-image",cssBG);
        jQuery(lnkbg_sliderFront).css("background-image",cssBG);
}

function lnkbg_play(){
    //console.log("se llama en el play");    
    lnkbg_rotarFondos()
}

function lnkbg_stop(){
    clearTimeout(lnkbg_timer);
    //console.log("timerFrenado");
}

function lnkbg_rotarFondos(){
	var nuevoFondo = 0;
	if(lnkbg_fondoActual < (lnkbg_cantidadFondos - 1)){
		nuevoFondo = lnkbg_fondoActual+1
	}
        //console.log("rotando...");
	lnkbg_ponerFondo(nuevoFondo);

        lnkbg_timer = setTimeout(function(){
            jQuery(lnkbg_sliderFront).animate({"transform": "scale("+lnkbg_zoomTo+")"},lnkbg_velocidadFondo,function(){
		//console.log("se llama en el timer");
                lnkbg_rotarFondos();
            });
        }, 5000);

}