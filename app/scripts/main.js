'use strict';

var App = {};

App.mainPage = function() {
	function init() {
		var fotorama_sets = {
			loop: true,
			width: '100%',
			height: '100%',
			autoplay: 5000,
			fit: 'cover',
			nav: false,
			arrows: false,
			swipe: false,
			click: false,
			transition: 'dissolve'
		};
		$('.js-indexFotorama').fotorama(fotorama_sets);
	}

	init();
};

App.uSlider = function() {
	function init() {
		var fotorama_sets = {
			loop: true,
			width: '100%',
			height: '590px',
			fit: 'cover',
			nav: false,
			arrows: false
		};

		$('.js-us-slider').fotorama(fotorama_sets);
	}

	init();
}

$(function(){
	var body = $('body');

	if(body.hasClass('index')) {
		App.mainPage();
	}
	if(body.hasClass('about')) {
		App.uSlider();
	}
});