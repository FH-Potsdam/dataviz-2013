var chart = chart || {};

jQuery(document).ready(function() {
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
  
  loader(filesequences[0], function(data) {
    chart.setup({
      data : data,
      w: 1000,
      h: 500,
      barW: 46,
      currDay: 1,
      maxDay: 27
    });
  });
});

chart.setup = function(options) {
  data = chart.data = options.data;
  width = chart.width = options.w;
  height = chart.height = options.h;
  barWidth = chart.barWidth = options.barW;
  currDay = chart.currDay = options.currDay;
  maxDay = chart.maxDay = options.maxDay;
  xPos = chart.xPos = 0;
  yPos = chart.yPos = -1;
  color = chart.color = d3.scale.category20();
  
  var svg = chart.svg = d3.select("#tablecontainer").append("svg")
    .attr("width", chart.data.length*(chart.barWidth+5))
    .classed("games", true);
  
  chart.draw();
}

chart.draw = function() {
  for(var j = 0; j < chart.data.length; j++) {


      var day = chart.data[j];

      day.forEach(function (game) {
        game.goalsshot = parseInt(game.result.substring(0, game.result.indexOf(":")));
      });

      /* day.sort(function (a,b) {
        if(a.goalsshot > b.goalsshot) return 1;
        if(a.goalsshot < b.goalsshot) return -1;
        return 0;
      }); */

      var bar = chart.bar = chart.svg.append("g").selectAll("rect")
      .data(day);
      var color = chart.color = d3.rgb(255,255,0);
      bar.enter().append("rect")
        .attr("y", function(d, i) { return i*(chart.barWidth+5)} )
        .attr("x", function(d, i) { return j*(chart.barWidth+5)} )
        .attr("width", chart.barWidth)
        .attr("height", chart.barWidth)
        .attr("fill", function(d, i) { 
          var result = d.result.split(" "); 
          var goal = d.result.split(":");
          console.log(goal[0] + goal[1]); 
          var r = 255/9*parseInt(goal[0]); 
          var g = 255/9*(parseInt(goal[1])); 
          return d3.rgb(r,g,0); })
        .on("mouseover", chart.over);
      //bar.selectAll("rect").
  }
}

chart.over = function(d, i) {
  d3.select("#team_home").html(d.team_home);
  d3.select("#result").html(d.result);
  d3.select("#team_guest").html(d.team_guest);
}