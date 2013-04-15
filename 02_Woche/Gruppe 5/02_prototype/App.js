var streamgraph = streamgraph || {};

// these variables need to be declared so we can use them thoughout the entire code … i think.

$(document).ready(function()  {

streamgraph.n = 18, // number of layers
streamgraph.m = 27, // number of samples per layer
streamgraph.stack = d3.layout.stack().offset("wiggle"),

/*
streamgraph.layers0 = streamgraph.stack(d3.range(streamgraph.n).map(function() { return bumpLayer(streamgraph.m); })),
streamgraph.layers1 = streamgraph.stack(d3.range(streamgraph.n).map(function() { return bumpLayer(streamgraph.m); }));

streamgraph.width = 960,
streamgraph.height = 500;

streamgraph.x = d3.scale.linear().domain([0, streamgraph.m - 1]).range([0, streamgraph.width]);
streamgraph.y = d3.scale.linear().domain([0, d3.max(streamgraph.layers0.concat(streamgraph.layers1), function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); })]).range([streamgraph.height, 0]);

streamgraph.color = d3.scale.linear().range(["#aad", "#556"]);

streamgraph.area = d3.svg.area().x(function(d) { return streamgraph.x(d.x); }).y0(function(d) { return streamgraph.y(d.y0); }).y1(function(d) { return streamgraph.y(d.y0 + d.y); });

streamgraph.svg = d3.select("body").append("svg").attr("width", streamgraph.width).attr("height", streamgraph.height);

streamgraph.svg.selectAll("path").data(streamgraph.layers0).enter().append("path").attr("d", streamgraph.area).style("fill", function() { return streamgraph.color(Math.random()); });


*/

streamgraph.transition = function() {
  d3.selectAll("path")
      .data(function() {
        var d = layers1;
        layers1 = layers0;
        return layers0 = d;
      })
    .transition()
      .duration(2500)
      .attr("d", area);
}

streamgraph.seasonData = {
    "days": [
        {
            "teamName" : "",
            "goals" : 0,
            "rank" : 0
        }
    ]
};

streamgraph.loadJSONData();

});




streamgraph.loadJSONData = function() {

// mini-format zur definition von Datei-Sequenzen
var filesequences = [{
    title: "Spiele",
    basename: "../02_prototype/data/bundesliga_sport_de-{i}.json",
    start: 1,
    end: 27
  }, {
    title: "Tabelle",
    basename: "../02_prototype/data/bundesliga_table_sport_de-{i}.json",
    start: 1,
    end: 27
  }];



// benutzt das file-loader.js Hilfsskript um eine Dateisequenz zu laden --> hier die Spiele
loader(filesequences[0], function(data) {
  // for every "match-day"
  data.forEach(function(dayInSeason, dayIndex) {
      // for every match
    dayInSeason.forEach(function(match, matchIndex) {
      streamgraph.extractMatchData(match, dayIndex);
      console.log(dayIndex);
    });
  });
});
}


streamgraph.extractMatchData = function(matchData, dayIndex) {

  teamHome = matchData.team_home;
  teamGuest = matchData.team_guest;

  var cleanScore = matchData.result.split(" ");
  var scores = cleanScore[0].split(":");

  teamHomeScore = scores[0];
  teamGuestScore = scores[1];

  streamgraph.pushGoalsToTeam(dayIndex, teamHome, teamHomeScore);
  streamgraph.pushGoalsToTeam(dayIndex, teamGuest, teamGuestScore);


}


streamgraph.pushGoalsToTeam = function(day, teamName, score) {

	console.log(streamgraph.seasonData);
	
	/*

    streamgraph.seasonData.forEach(function(dayInSeason, dayIndex) {
      if (dayIndex == day) {
        dayInSeason.forEach(function(team) {
          if(team.teamName == teamName) {
            team.score  = score;
          }
        });
      }
    });
    
    */
}



// this function updates the whole chart!
streamgraph.update = function(index) {
}


// this function loads the data from the corresponding year into the data-array
streamgraph.updateDataset = function() {
}