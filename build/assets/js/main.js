function getMajor(data) {
	switch (data){
		case 'design':
			return 'Design graphique';
			break;
		case 'bd':
			return 'Bande desinée';
			break;
		case 'museo':
			return 'Muséologie et patrimoines';
			break;
		case 'art':
			return 'Arts visuels';
			break;
	}
}

$(document).ready(function() {

	// Templating System
	// ==================

	// Templates
	var graduateTemplateMarkup = '<li class="major-${major} grid-${grid}">\
					<a href="#${niceName}" title="${firstName} ${lastName}">\
						<figure>\
							<img src="assets/img/portraits/${niceName}.jpg" alt="${firstName} ${lastName}">\
							<figcaption>\
								<h3>${firstName} ${lastName}</h3>\
								<p class="major">${getMajor(major)}</p>\
							</figcaption>\
						</figure>\
					</a>\
				</li>';

	// Define container for Masonry
	var graduateMasonryContiner = $('.layout-grid ul');

	// Compile the markup as a named template
	$.template('graduateTemplate', graduateTemplateMarkup);

	// Get JSON Data
	$.ajax({
		dataType: 'json',
		url: 'data.json',
		success: function(data) {
			// Render the template with the data and append to element
			$.tmpl('graduateTemplate', data).appendTo('section#finissants ul');
		}
	}).done(function(){
		// Adaptive Grid Layout
		// Masonry Initialisation
		graduateMasonryContiner.masonry({
			// Options
			itemSelector: 'li'
		});

	});

	// Filtering
	// ==================

	$('.graduate-filter').on( 'click', 'button', function() {
		$('#finissants ul').find('li').removeClass('is-filtered');
		$('.graduate-filter button').removeClass('is-active');

		var filterValue = $(this).attr('data-filter');

		$('#finissants ul').find('li').not(filterValue).addClass('is-filtered');
		$(this).addClass('is-active')
	});

	// Google Maps Integration
	// =======================

	function initMaps() {
		var uqoLocation = new google.maps.LatLng(45.428232, -75.738320);
		
		var mapOptions = {
			center: uqoLocation,
			zoom: 14,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			disableDefaultUI: true,
			zoomControl: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.SMALL
			},
			scrollwheel: false,
			styles: [
				{
				"stylers": [
					{ "saturation": -100 },
					{ "gamma": 1.87 }
				]},
				{
					"featureType": "landscape",
					"stylers": [
						{ "lightness": 100 }
					]
				},
				{
					"featureType": "water",
					"stylers": [
						{ "lightness": 26 }
					]
				},
				{
					"featureType": "road",
					"elementType": "geometry.stroke",
					"stylers": [
						{ "weight": 0.8 },
						{ "lightness": -26 }
					]
				}
			]
		};

		var map = new google.maps.Map(document.getElementById("map"), mapOptions);

		var marker = new google.maps.Marker({
		  position: uqoLocation,
		  map: map,
		  title:"UQO - Exposition des Finissants de l'ÉMI",
		  icon:'assets/img/marker.png'
		});
	}

	$('#map').exists(function(){
		initMaps();
	})

	// Animated scrolling
	// =======

	$('nav.main-navigation').on('click', 'a', function(event){
		event.preventDefault();
		
		var anchor = $(this).attr('href');

		$('html, body').stop().animate({
			scrollTop: $(anchor).offset().top
		}, 800,'swing');
	});

	// Menu Fade
	// =======

	var fadeTo = $('section#concept').position();
	var fadeTarget = $('nav.main-navigation');
	
	setTimeout(function(){
		if ($(document).scrollTop() >= fadeTo.top ) {
			fadeTarget.css('opacity', 1);
		}
	}, 200);

	$(document).on('scroll', function(event){
		if ($(document).scrollTop() <= (fadeTo.top+200)) {
			var scrollPercent = ($(document).scrollTop() / (fadeTo.top) );
			
			if(scrollPercent >= 0){
				fadeTarget.css('opacity', scrollPercent);
			}
		}
	});

});
