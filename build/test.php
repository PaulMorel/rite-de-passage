<?php 
$jsonFile = file_get_contents('data.json');
//$jsonFile = '{"a":1,"b":2,"c":3,"d":4,"e":5}';
$jsonObject = json_decode($jsonFile); 

function getMajor($data) {
	switch ($data) {
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

foreach( $jsonObject as $obj ) {

	$niceName = $obj->niceName;
	$fullName = $obj->firstName . ' ' . $obj->lastName;
	$grid = $obj->grid;
	$major = $obj->major;
	$majorFullName = getMajor($major);

	echo "<li class=\"major-$major grid-$grid\">
			<a href=\"#$niceName\" title=\"$fullName\">
				<figure>
					<img src=\"assets/img/portraits/$niceName.jpg\" alt=\"$fullName\">
					<figcaption>
						<h3>$fullName</h3>
						<p class=\"major\">$majorFullName</p>
					</figcaption>
				</figure>
			</a>
		</li>";
}

?> 