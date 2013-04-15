// Kleines Hilfs-Skript um sequentielle Dateien zu laden
var loader = function(list, callback) {
	
	// benutzt https://github.com/mbostock/queue, unbedingt in der HTML Datei als Skript mit einbinden
	var q = queue(1);

	// alle Dateien aus unserer Fussball-Serie in die Warteschlange einfügen
	for (var i = list.start; i <= list.end; i++) {
		var file = list.basename.replace("{i}", i);
		q.defer(d3.json, file);
	}

	// wenn alle Dateien geladen sind, schieben wir das Ergebnis zurück
	q.awaitAll(function(error, results) {
		callback(results);
	});
}