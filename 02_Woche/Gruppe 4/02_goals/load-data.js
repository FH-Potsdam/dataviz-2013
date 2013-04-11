// mini-format zur definition von Datei-Sequenzen
var filesequences = [{
		title: "Spiele",
		basename: "../../../data/bundesliga/bundesliga_sport_de-{i}.json",
		start: 1,
		end: 27
	}, {
		title: "Tabelle",
		basename: "../../../data/bundesliga/bundesliga_table_sport_de-{i}.json",
		start: 1,
		end: 27
	}];

var goalAll = 0;
var goalTemp = 0;
var currGame = 1;
var goalPerDay = 0;
var gamesPerDay = 9; 

// benutzt das file-loader.js Hilfsskript um eine Dateisequenz zu laden --> hier die Spiele
loader(filesequences[0], function(data) {
	console.log("Spiele: ", data);
	data.forEach(function (el, i) {
		d3.select("#gamecontainer").append("div").classed("games", true).html("<strong>Spieltag " + (i+1) + "</strong>").selectAll("div.game").data(el).enter().append("div").classed("game", true).html(function (d) {
			goalTemp = goalTemp + parseInt(d.result.substring(0, 1))+parseInt(d.result.substring(2, 3));
      if(currGame == gamesPerDay) {
        goalPerDay = goalTemp;
        currGame = 1;
        goalTemp = 0;
        goalAll = goalAll + goalPerDay;
        return "Pro Spieltag: "+goalPerDay+" Gesamt: "+ goalAll;
      }
      currGame++;
		});
	});
});