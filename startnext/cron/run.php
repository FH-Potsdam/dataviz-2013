<?php

/*
 * Cronjob for reading data from the Starnext API
 */

date_default_timezone_set('Europe/Berlin');


$output_dir = './values';
if (!is_dir($output_dir)) {
	die("Please create the 'values' directory first and make it writeable.");
}


$now = new DateTime();
$dateinfo = $now->format("Y-m-d H.i");

$data = file_get_contents('https://startnext-viz.herokuapp.com/data.json');
file_put_contents($output_dir . '/heroku-data-'. $dateinfo .'.json', $data);