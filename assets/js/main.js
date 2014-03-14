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

	console.log(data);
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
			$.tmpl( 'graduateTemplate', data ).appendTo( "section.graduates ul" );
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
});
