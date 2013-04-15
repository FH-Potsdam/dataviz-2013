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

$("#tablecontainer").width(filesequences[1]["end"]*210);

// benutzt das file-loader.js Hilfsskript um eine Dateisequenz zu laden --> hier die Tabellenstände
loader(filesequences[1], function(data) {
    console.log("Tabellen: ", data);
    data.forEach(function (el, i) {
        d3.select("#tablecontainer")
            .append("g")
            .classed("games", true)
            .html("<strong>Spieltag " + (i+1) + "</strong>")
            .selectAll("div.table")
            .data(el)
            .enter()
            .append("div")
            .classed("table", true)
            .html(function (d) {
                return d.goal_difference;
            });
    });
});