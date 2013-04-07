<?php
header('Content-type: text/plain;charset=utf8');

/** Beispiel für ein kleines Crawling / Scraping Script */
//$url = 'https://apify.heroku.com/api/bundesliga_sport_de.json?spieltag={tag}';
$url = 'https://apify.heroku.com/api/bundesliga_table_sport_de.json?spieltag={tag}';

$values = array();
for ($i = 1; $i < 28; $i++)
	$values[] = $i;

crawl($url, "{tag}", $values, './output/');

function crawl($url, $parameter, $values, $output_dir) {

	$file = basename($url);
	$filename = substr($file, 0, strrpos($file, '.')); // assuming we have a dot in the url
	$fileext = substr($file, strrpos($file, '.')); // assuming we have a dot in the url
	
	foreach($values AS $v) {
		$u = str_replace($parameter, $v, $url);
		echo $u ."\n";
		$data = file_get_contents($u);
		file_put_contents($output_dir .'/'. $filename .'-'. $v . $fileext, $data);
		sleep(1); // reduce rate of api calls a little.
	}
}

?>
