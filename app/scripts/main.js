'use strict';

var App = {};
var Help = {};
var Global = {};

Help.transform = function(value) {
	var prefixes = [ '-webkit-', '-ms-', '' ];
	var str = '';
	$.each(prefixes, function(index, prefix){
		str += prefix + 'transform:' + value + ';';
	});
	return str;
}

Help.popup = {
	open: function(type) {
		$('.overlay').show();
		$('.overlay [data-popup="' + type + '"]').show();
	},

	close: function() {
		$('.overlay').hide();
		$('.overlay [data-popup]').hide();
		$('.overlay').trigger('popups::close');
	}
};

Help.tabs = function() {
	function init() {
		$('.js-tab-links').each(function(){
			var type = $(this).attr('data-tabs');
			setTab(type, 0);
		});

		$('.js-tab-links li').on('click', function(){
			setTab($(this).parent().attr('data-tabs'), $(this).index());
		});
	}

	function setTab(type, id) {
		var tabs = $('.js-tab-links[data-tabs="' + type + '"]').find('li');
		tabs.eq(id).addClass('active')
			.siblings().removeClass('active');

		var blocks = $('.js-tabs[data-tabs="' + type + '"] .js-tab');
		blocks.eq(id).show()
			.siblings().hide();
	}

	init();
}

Global.events = function() {
	$(document).on('click', '.js-popups-close', function(){
		Help.popup.close();
	});
}

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
	var parent = this;

	this.init = function() {
		$('.js-slider-cont').each(function(){
			if(!$(this).hasClass('ajax-fotorama')) {
				parent.setFotorama($(this));
			}
		});
	}

	this.setFotorama = function(block, images_array) {
		var self = block;
		var fotorama_api;
		var fotorama_div;
		var fotorama_block = self.find('.js-us-slider');

		var fotorama = {};
		fotorama.init = function() {
			var fotorama_sets = {
				loop: true,
				width: '100%',
				height: '590px',
				fit: 'cover',
				nav: false,
				arrows: false,
			};

			if(images_array) {
				fotorama_sets.data = images_array;
				fotorama_sets.height = '100%';
				fotorama_sets.fit = 'contain';

				console.log(fotorama_sets);
			}

			fotorama_div = fotorama_block.fotorama(fotorama_sets);
	    	fotorama_api = fotorama_div.data('fotorama');
		}

		var control = {
			arrows: self.find('.c-arrow'),
			number_parent: self.find('.numbers-cont'),
			number_cont: self.find('.numbers'),
			number_width: 0,
			visible: 5,
			amount: 0,
		};
		control.init = function() {
			var parent = this;
			parent.number_cont.html('');
			parent.number_cont.before('<a class="c-arrow c-left"><i class="icon icon-arrow-left"></i></a>');
			parent.number_cont.after('<a class="c-arrow c-right"><i class="icon icon-arrow-right"></i></a>');
			for(var i = 1; i <= fotorama_api.size; i++) {
				parent.amount++;
				parent.number_cont.append('<li>' + i);
			}
			if(!(parent.amount < parent.visible)) {
				parent.number_width = parent.number_cont.find('li').eq(0).outerWidth();
				var new_width = parent.number_width * parent.visible;
				parent.number_parent.css('width', new_width+1);
			}
			control.goto(fotorama_api.activeIndex);

			self.find('.c-arrow').on('click', function(){
				var cid = fotorama_api.activeIndex;
				if($(this).hasClass('c-left')) {
					fotorama_api.show(cid - 1);
				} else {
					fotorama_api.show(cid + 1);
				}
			});
		}
		control.goto = function(id) {
			var parent = this;
			var numbers = parent.number_cont.find('li');
			numbers.eq(id).addClass('active')
				.siblings().removeClass('active');
			var none_tr = parseInt(parent.visible/2);
			var tr_amount;
			if(id <= none_tr) {
				tr_amount = 0;
			} else if(id >= parent.amount - none_tr) {
				tr_amount = -(parent.amount - parent.visible)*parent.number_width;
			} else {
				tr_amount = -(id-2)*parent.number_width;
			}
			var transform_str = Help.transform('translateX(' + tr_amount + 'px)');
			parent.number_cont.attr('style', transform_str);
		}

		fotorama.init();
		control.init();

		fotorama_block.on('fotorama:show', function (e, fotorama, extra) {
		    control.goto(fotorama_api.activeIndex);
		});
		control.number_cont.on('click', 'li', function(){
			fotorama_api.show($(this).index());
		});

		return fotorama_api;
	}

	return {init: parent.init, setFotorama: parent.setFotorama};
}

App.eSlider = function() {
	var parent = $('.js-eSlider'),
		photos_cont = parent.find('.js-ePhotos'),
		slide_info = parent.find('.js-eInfo'),
		perc_cont = parent.find('.js-ePerc'),
		sections_cont = parent.find('.js-eSections'),
		episodes = [
		{
			image: "images/tmp/episode-thumb.jpg",
			date: "18.09.2014",
			percents: 5,
			photos: [	{img: 'images/tmp/popup1.jpg'},
						{img: 'images/tmp/popup2.jpg'},
						{img: 'images/tmp/popup3.jpg'},
						{img: 'images/tmp/popup4.jpg'},
					]
		},
		{
			image: "images/tmp/episode-thumb.jpg",
			date: "18.09.2014",
			percents: 10,
			photos: [	{img: 'images/tmp/popup1.jpg'}
					]
		},
		{
			image: "images/tmp/episode-thumb.jpg",
			date: "18.09.2014",
			percents: 15,
			photos: [	{img: 'images/tmp/popup1.jpg'}
					]
		},
		{
			image: "images/tmp/episode-thumb.jpg",
			date: "18.09.2014",
			percents: 25,
			photos: [	{img: 'images/tmp/popup1.jpg'}
					]
		},
		{
			image: "images/tmp/episode-thumb.jpg",
			date: "18.09.2014",
			percents: 30,
			photos: [	{img: 'images/tmp/popup1.jpg'}
					]
		}
	];

	this.setBuilding = function(id) {
		var percs = episodes[id].percents;
		var sect_amount = Math.floor(percs / 10);
		perc_cont.text(percs);
		sections_cont.find('li').hide();
		for(var i = 0; i < sect_amount; i++) {
			sections_cont.find('li').eq(i).show();
		}
	}

	this.setInfo = function(id) {
		var date = episodes[id].date;
		var photos_amount = episodes[id].photos.length;

		slide_info.find('.title').text(date);
		slide_info.find('.text span').text(photos_amount);
	}

	this.setActive = function(id) {
		var activeFrame = photos_cont.find('li').eq(id);

		activeFrame.addClass('active')
			.siblings().removeClass('active');
		this.setBuilding(id);
		this.setInfo(id);

		setTimeout(function(){
			var new_left = activeFrame.position().left;
			slide_info.css('left', new_left);
		}, 1);
	}

	this.setEvents = function() {
		var self = this;
		var past_block = parent.find('.past-episode');
		var fapi;
		past_block.on('mouseover', function(){
			self.setActive($(this).index());
		});
		past_block.on('click', function(){
			var id = $(this).index();
			Help.popup.open('episode-photos');
			fapi = App.uSlider().setFotorama($('.ajax-fotorama'), episodes[id].photos);
		});

		$('.overlay').on('popups::close', function(){
			fapi.destroy();
		});
	}

	this.init = function() {
		for(var i = 0; i < 23; i++) {
			var this_e = episodes[i];
			if(this_e) {
				photos_cont.append('<li class="past-episode" style="background-image: url(' + this_e.image + ');">');
			} else {
				photos_cont.append('<li class="future-episode">');
			}
		}

		this.setEvents();
		this.setActive(episodes.length - 1);
	}

	this.init();
}

App.layouts = function() {
	Help.tabs();
}

App.contacts_map = function() {
	var center_point = new google.maps.LatLng(47.228756, 39.735608);
	function initialize() {
		var mapOptions = {
			center: center_point,
			zoom: 17,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			scrollwheel: false
		};
		var map = new google.maps.Map(document.getElementById("contacts_map"), mapOptions);
		var image = 'images/includes/map_mark.jpg';
		var beachMarker = new google.maps.Marker({
			position: center_point,
			map: map,
			icon: image
		});
	}

	google.maps.event.addDomListener(window, 'load', initialize);
}

$(function(){
	var body = $('body');

	if(body.hasClass('index')) {
		App.mainPage();
	}
	if(body.hasClass('about')) {
		App.uSlider().init();
		App.eSlider();
	}
	if(body.hasClass('location')) {
		App.uSlider().init();
	}
	if(body.hasClass('layouts')) {
		App.layouts();
	}
	if(body.hasClass('mortgage')) {
		$('.js-accordion').accordion({
			active: false,
			collapsible: true,
			heightStyle: "content"
		});
	}
	if(body.hasClass('contacts')) {
		App.contacts_map();
	}

	Global.events();
});