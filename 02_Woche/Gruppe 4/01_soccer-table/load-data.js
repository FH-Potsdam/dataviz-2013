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

var color = d3.scale.category20(); 

$("#tablecontainer").width(filesequences[1]["end"]*210);
// benutzt das file-loader.js Hilfsskript um eine Dateisequenz zu laden --> hier die Tabellenstände
loader(filesequences[1], function(data) {
  console.log("Tabellen: ", data);
  data.forEach(function (el, i) {
    d3.select("#tablecontainer")
        .append("div")
        .classed("games", true)
        .html("<strong>Spieltag " + (i+1) + "</strong>")
        .selectAll("div.table").data(el)
      .enter()
        .append("div")
        .style("color", function(d, i) { return color(d.team) } )
        .classed("table", true)
        .on("mouseover", tableOver)
        .on("mouseout", tableOut)
        .html(function (d, i) {
          return d.team;
        });
  });
});


var tableOver = function(d, i) {
  $(".table:contains('"+ d.team +"')").css("background", "#000");
}

var tableOut = function(d, i) {
  $(".table").css("background", "transparent");
}