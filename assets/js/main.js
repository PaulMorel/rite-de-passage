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
					<a href="${niceName}" title="${firstName} ${lastName}">\
						<h3>${firstName} ${lastName}</h3>\
						<p>${getMajor(major)}</p>\
						<!--<img src="" alt="">-->\
					</a>\
				</li>';

	// Compile the markup as a named template
	$.template('graduateTemplate', graduateTemplateMarkup);

	// Get JSON Data
	$.ajax({
		dataType: 'json',
		url: 'data.json',
		success: function(data) {
			// Render the template with the data and append to element
			$.tmpl( 'graduateTemplate', data ).appendTo( "section#finissants ul" );
		}
	}).done(function(){
		// Adaptive Grid Layout
		// ==================
		var isotopeContainer = $('.layout-grid ul');

		// Isotope Initialisation
		isotopeContainer.isotope({
			// Options
			itemSelector: 'li',
			layoutMode: 'masonry'
		});
	});

	// Google Maps Integration
	// =======================

	function initMaps() {
	    var uqoLocation = new google.maps.LatLng(45.428232, -75.738320);
	    
	    var mapOptions = {
	      center: uqoLocation,
	      zoom: 16,
	      mapTypeId: google.maps.MapTypeId.ROADMAP,
	      disableDefaultUI: true
	    };

	    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

		var contentString = "<h3>Exposition des Finissants de l'ÉMI</h3>"+
			"<p>Université du Québec en Outaouais <br />Pavillon Lucien-Brault <br />101, rue Saint-Jean-Bosco <br />Gatineau (secteur Hull)</p>"+
			"<p>819 595-3900 poste 1880 <br /><a href=\"http://uqo.ca/emi\" title=\"Université du Québec en Outaouais - École Multidisciplinaire de l'Image\">uqo.ca/emi</a></p>";

		var infowindow = new google.maps.InfoWindow({
		content: contentString
		});

	    var marker = new google.maps.Marker({
	      position: uqoLocation,
	      map: map,
	      title:"UQO - Exposition des Finissants de l'ÉMI"
	    });

		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		});
  	}

	$('#map').exists(function(){
		initMaps();
	})
});
