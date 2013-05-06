<?php

header('Content-type: text/plain;charset=utf8');

/** Beispiel für ein kleines Crawling / Scraping Script */
//$url = 'https://apify.heroku.com/api/bundesliga_sport_de.json?spieltag={tag}';
$url = 'http://www.lpi.usra.edu/meteor/metbullclass.php?sea={term}';


$classes = array("Doubtful eucrite", "L(?)3", "L3.7-4", "H3.0-3.4", "L/LL3.4", "LL3.7", "L~3", "H6-melt breccia", "CM-an", "H3.6", "CI1", "H3.2-3.7", "Iron, IAB-sLM", "H4-5", "H3.8-5", "L3.5-3.8", "Pseudometeorite", "Pallasite", "Mesosiderite-A2", "CV3-an", "Lodranite-an", "EL6", "L3.6", "CO3.0", "H3.7/3.8", "Eucrite-br", "L3.9-5", "Mesosiderite-A", "LL3.6", "L4/5", "L3.4", "L/LL3.2", "Mesosiderite-an", "Iron, IVA", "EH-imp melt", "H3.8-6", "H4(?)", "R3.8", "LL~3", "H4-6", "R3.9", "L4-an", "EL7", "K", "L/LL5/6", "Iron, IIAB-an", "H", "LL", "H3.9/4", "Doubtful meteorite", "L3-6", "L(LL)3.5-3.7", "CO3.5", "Lunar (basalt)", "H/L5", "R", "H3.5", "LL5-7", "Iron, IIE-an", "H3.8/4", "L5-6", "H3.7-6", "EH7-an", "EH3", "L5-7", "EL3", "LL3.00", "L5/6", "Doubtful chondrite", "L3.5", "C4/5", "Aubrite-an", "L3-4", "Iron, IIIAB-an", "Iron, IAB complex", "H-melt rock", "C2-ung", "L6-melt breccia", "L(LL)3", "L3.7-6", "L/LL~5", "Unknown", "L/LL", "Doubtful stone", "LL3.8", "H3.5-4", "Chondrite-uncl", "LL7(?)", "Achondrite-ung", "Mesosiderite?", "Lunar (bas. breccia)", "L-melt breccia", "H(L)3-an", "EH", "CBa", "Ureilite", "H~6", "E", "H5-melt breccia", "C1/2-ung", "LL3-5", "LL3.0", "Iron, IIIE", "LL6", "Iron?", "LL3.3", "L3.4-3.7", "Lunar (anorth)", "Lunar (norite)", "H6", "Pallasite?", "Aubrite", "Diogenite", "H/L6", "L4-6", "EH4/5", "Howardite", "H3.0", "H3.9-5", "Iron, IAB?", "H3.8-4", "Iron, IIF", "L3.5-3.9", "H3-4", "H/L4", "LL3.5", "LL4-5", "E4", "H4/6", "L3.05", "Martian (shergottite)", "L(LL)6", "Terrestrial rock", "Ureilite-pmict", "H3.2-6", "Iron, IIIAB?", "CO3.6", "H(5?)", "Mesosiderite-B2", "Iron, ungrouped", "K3", "L4", "LL~5", "H5-an", "LL4", "LL3.15", "L5", "EL4/5", "H-metal", "Iron, IIE", "L/LL3-5", "Iron, IAB-sHL", "Chondrite-fusion crust", "L3.2-3.5", "L4-5", "H3.8/3.9", "L3.5-5", "CO3", "R3", "E3-an", "H3.9", "Mesosiderite-C2", "H3.8", "LL3.1-3.5", "Diogenite-pm", "Diogenite-an", "CO3.3", "H3.7-5", "H-imp melt", "Iron, IIC", "H3-6", "Winonaite", "LL5/6", "Ureilite-an", "LL3", "L3.9-6", "L3", "EL6/7", "CBb", "CK6", "L(LL)3.05", "CM1", "L3.0", "Fusion crust", "Iron, IC", "L3.0-3.7", "Pallasite, PMG", "H3.2-an", "H5-6", "CK3", "L~6", "C5/6-ung", "LL3.7-6", "Angrite", "L3.9/4", "CK4-an", "EH3/4-an", "E5-an", "Iron", "CR1", "Iron, IIIF", "Eucrite-an", "L", "CR2", "L3.3", "LL3.8-6", "Martian (nakhlite)", "LL(L)3", "L3.7/3.8", "C3-ung", "H/L3", "CM2", "Relict OC", "EH6", "LL3.4", "H3.8-an", "LL3.1", "Mesosiderite-B", "H3.3", "L3.8-6", "Lodranite", "L3.3-3.6", "E6", "H/L3.6", "L/LL4/5", "L-imp melt", "Mesosiderite-A1", "Pallasite, ungrouped", "C6", "C4", "R3.6", "Pallasite, PES", "E5", "CV3", "Mesosiderite-B1", "H3.10", "L~4", "Iron, IC-an", "L3.2-3.6", "Iron, IVB", "EH4", "LL6(?)", "H4-an", "L3.3-3.7", "H~4", "L/LL5-6", "Iron, IIAB", "L/LL5", "H3", "H~5", "CK4", "H~4/5", "CV2", "Impact Crater", "Stone-uncl", "EH5", "L3.7-3.9", "H/L~4", "Eucrite-Mg rich", "EL5", "L/LL3.6/3.7", "Iron, IIIAB", "Doubtful Iron", "LL4-6", "CH3", "Iron, IAB-MG", "Iron, IAB-sLH", "LL3/4", "H3.2", "CR", "Eucrite-unbr", "L3.5-3.7", "Doubtful OC", "H3.9-6", "H7", "CO3.8", "LL~6", "H3-5", "LL7", "LL5", "H(?)4", "Iron, IAB-sHH", "L/LL6-an", "L-melt rock", "H3/4", "L3.1", "Lunar", "L3.7", "L3.2", "C", "L3.10", "Enst achon-ung", "L/LL3-6", "Pallasite, PMG-an", "CO3.7", "Acapulcoite/Lodranite", "Relict H", "Mesosiderite-B4", "H4", "R3.8-5", "H3.7", "H/L4-5", "H5", "CR-an", "L3-5", "C2", "L6", "Lunar (bas/anor)", "Iron, IVA-an", "L~5", "Diogenite-olivine", "H3.4/3.5", "L/LL~4", "OC", "CM1/2", "H/L3.9", "L3.0-3.9", "H3-an", "Iron, IAB-ung", "H3.4", "H-an", "Mesosiderite-A4", "L/LL3.10", "L/LL3", "Iron, IIIE-an", "R3.8-6", "CO3.2", "LL5-6", "L3.6-4", "LL3.9/4", "R4", "Stone-ung", "Chondrite-ung", "Iron, IIG", "EH6-an", "Acapulcoite", "Iron, IID", "R3.5-6", "Iron, IID-an", "H5-7", "Discredited", "E3", "H(L)3", "LL3-6", "L-metal", "L7", "EH7", "Martian (chassignite)", "CK4/5", "CR2-an", "R3-4", "H3.6-6", "LL3.9", "L/LL~6", "L/LL(?)3", "L/LL4", "H5/6", "L3.9", "H3.1", "CO3.4", "Eucrite-pmict", "Eucrite-mmict", "H/L3.5", "Brachinite", "Eucrite", "Mesosiderite-A3", "EL4", "L/LL6", "Lunar (gabbro)", "L3.8", "Iron, IAB-sLL", "H4/5", "Mesosiderite", "L6/7", "LL3.2", "CK5", "LL?", "Martian (OPX)", "Relict iron", "L3.8-an", "L3/4", "L/LL4-6", "H?", "H3.4-5", "L3.3-3.5", "CK3-an", "C4-ung", "CK5/6", "L(LL)5", "LL4/5", "R3-6", "Eucrite-cm", "CH/CBb", "E-an", "Mesosiderite-A3/4", "Lunar (feldsp. breccia)", "R5", "Iron, IAB-an");

crawl($url, "{term}", $classes);

function crawl($url, $parameter, $values, $output_dir = 'temp') {

	$db = new mysqli('localhost', 'meteors', 'meteorites', 'meteorites');
	$db->set_charset("utf8");

	$c = 0;
	foreach ($values AS $v) {
		$c++;
		$class = false;
		$check = $db->query('SELECT * FROM `classes` WHERE `key` = "' . $v . '"');
		if ($check->num_rows > 0) {
			$class = $check->fetch_object();
		}
		$u = str_replace($parameter, urlencode($v), $url);
		echo "\n--- " . $u . " ---\n";
		$html = file_get_contents($u);
		file_put_contents($output_dir . '/' . urlencode($v) . '.html', $html);

		$doc = DOMDocument::loadHTML($html);
		$paragraphs = $doc->getElementsByTagName('p');
		$first = true;
		for ($i = 0; $i < $paragraphs->length; ++$i) {
			$p = $paragraphs->item($i);
			if ($style = $p->attributes->getNamedItem('style')) {
				if ($style->value == 'margin-left: 0.5in') {
					if ($first) {
						echo $v . ': ' . substr($p->nodeValue, 1, -1) . "\n";
						$first = false;
						if ($class === false) {
							$db->query('INSERT INTO `classes` SET `key` = "' . $v . '", `text` = "' . substr($p->nodeValue, 1, -1) . '"');
							$class = new stdClass();
							$class->key = $v;
							$class->text = substr($p->nodeValue, 1, -1);
							$class->id = $db->insert_id;
						}
					} else {
						$colon = strpos($p->nodeValue, ':');
						$keyword = trim(substr($p->nodeValue, 0, $colon));
						$text = trim(substr($p->nodeValue, $colon + 2));

						$keycheck = $db->query('SELECT * FROM `keywords` WHERE `key` = "' . $keyword . '"');
						if ($keycheck->num_rows === 0) {
							$db->query('INSERT INTO `keywords` SET `key` = "' . $keyword . '", `text` = "' . $text . '"');
							$keyword_id = $db->insert_id;
						} else {
							$k = $keycheck->fetch_object();
							$keyword_id = $k->id;
						}



						$connection = $db->query('SELECT * FROM `classes_keywords` WHERE `keyword` = "' . $keyword_id . '" AND `class` = "' . $class->id . '"');
						if ($connection->num_rows == 0) {
							$db->query('INSERT INTO `classes_keywords` SET `keyword` = "' . $keyword_id . '", `class` = "' . $class->id . '"');
						}

						echo $keyword . ': ' . $text . "\n";
					}
				}
			}
		}

		if ($c > 6) {
			//break;
		}
		
		flush();
	}
}

?>
