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
var yPos = 250;  
var numTeams = 18;
var barWidth = 46;
var goals, average;

var loadData = function(currDay) {
  var goalsTotal = 0;
  loader(filesequences[1], function(data) {
    d3.selectAll(".games").remove();
    
    var bar = d3.select("#tablecontainer").append("svg")
      .attr("width", data[currDay].length*(barWidth+5))
      .classed("games", true)
      .selectAll("rect").data(data[currDay]);
      
    bar.enter().append("rect")
      .attr("x", function(d, i) { return i*(barWidth+5) })
      .attr("y", yPos)
      .attr("width", barWidth)
      .style("fill", function(d, i) { return color(d.team) } )
      .classed("table", true)
      .attr("data-goal", function (d, i) { g = d.goals.split(":"); goalsTotal = goalsTotal + parseInt(g[0]); return g[0]; })
      .on("mouseover", over)
      .transition()
      .duration(500);
          
    d3.selectAll(".table")
      .attr("data-total", function(d,i) { return goalsTotal;})
      .attr("data-average", function(d,i) { return goalsTotal/18;})
      .transition()
      .duration(500)
      .attr("height", function(d, i) { var goals = $(this).attr("data-goal"); var average = $(this).attr("data-average"); return Math.abs((goals-average)*10) })
      .attr("y", function(d, i) { var goals = $(this).attr("data-goal"); var average = $(this).attr("data-average"); if((goals-average)*10 < 0) { return 250-Math.abs((goals-average)*10)} else {return 250} });
      d3.select("#average").html( function() { return "Tore im Durchschnitt: "+goalsTotal/18 });
  });
}
loadData(0);

for(var j = 0; j < filesequences[1]["end"]; j++) {
  d3.select("#navigation ").append("div")
    .classed("button", true)
    .attr("id", j)
    .html(parseInt(j+1))
    
    $(".button").click(function() {
      var id = $(this).attr("id");
      loadData(id);
    })
}

var over = function(d, i) {
  d3.select("#name").html(d.team);
  d3.select("#total").html(function() { g = d.goals.split(":"); return "Tore gesamt: "+g[0]});
}