// mini-format zur definition von Datei-Sequenzen
var filesequences = [{
		title: "Spiele",
		basename: "../../data/bundesliga/bundesliga_sport_de-{i}.json",
		start: 1,
		end: 27
	}, {
		title: "Tabelle",
		basename: "../../data/bundesliga/bundesliga_table_sport_de-{i}.json",
		start: 1,
		end: 27
	}];

// benutzt das file-loader.js Hilfsskript um eine Dateisequenz zu laden --> hier die Spiele
loader(filesequences[0], function(data) {
	console.log("Spiele: ", data);
	data.forEach(function (el, i) {
		d3.select("#gamecontainer").append("div").classed("games", true).html("<strong>Spieltag " + (i+1) + "</strong>").selectAll("div.game").data(el).enter().append("div").classed("game", true).html(function (d) {
			return d.datetime + ": " + d.team_home + " gegen " + d.team_guest + ": " + d.result;
		});
	});
});

// benutzt das file-loader.js Hilfsskript um eine Dateisequenz zu laden --> hier die Tabellenstände
loader(filesequences[1], function(data) {
	console.log("Tabellen: ", data);
	data.forEach(function (el, i) {
		d3.select("#tablecontainer").append("div").classed("games", true).html("<strong>Spieltag " + (i+1) + "</strong>").selectAll("div.table").data(el).enter().append("div").classed("table", true).html(function (d) {
			return d.place + d.team;
		});
	});
});