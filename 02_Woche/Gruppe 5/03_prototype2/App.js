var streamgraph = streamgraph || {};

  $(document).ready(function() {

    $("#runScript").click(function() {
        streamgraph.setup();
    });

    streamgraph.teams = new Array();

    // load the clubs-json, iterate through it and generates all teams for graph-data
     d3.json("./data/clubs.json", function(data) { 
      data.forEach( function(club, index ) {
        streamgraph.addTeam(club.name, club.primary_hex_color, club.crest_url);
      });
      streamgraph.loadJSONData();
    });

});


streamgraph.setup =  function() {
  
    //console.log(streamgraph.teams);

    stack = d3.layout.stack().offset("zero"),
    layers0 = stack(d3.range(streamgraph.teams.length).map(function() { return streamgraph.teams; }));
    console.log(streamgraph.teams);

    streamgraph.width = 1200;
    streamgraph.height = 600;

    
    
    streamgraph.x = d3.scale.linear().domain([0, streamgraph.m - 1]).range([0, streamgraph.width]);
    streamgraph.y = d3.scale.linear().domain([0, 10]).range([0, streamgraph.height]);

    

    streamgraph.color = d3.scale.linear().range(["#aad", "#556"]);

    streamgraph.area = d3.svg.area().
      x( function(d) {return streamgraph.x( d.x );} ).
      y0( function(d) {return streamgraph.y( d.y0);} ).
      y1( function(d) {return streamgraph.y( d.y0+d.y );
    });

    streamgraph.svg = d3.select("body").append("svg").attr("width", streamgraph.width).attr("height", streamgraph.height);
    streamgraph.svg.selectAll("path").data(streamgraph).enter().append("path").attr("d", streamgraph.area).style("fill", function() { return streamgraph.color(Math.random()); });

}


// this function adds a new team  to the data-array!
streamgraph.addTeam = function(teamName, teamColor, teamLogoURL) {
  // empty team
  var team = {
      "name" : teamName,
      "scores" : new Array(27), // the goals over the 27 days of season
      "rank" : new Array(27), // the rank over the 27 days of season
      "color" : teamColor,
      "logoURL" : teamLogoURL
  };
  // add it to the existing list
  streamgraph.teams.push(team);
}



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


  // loads all the game-data
streamgraph.loadJSONData = function(callback) {

  // mini-format zur definition von Datei-Sequenzen
  var filesequences = [{
      title: "Spiele",
      basename: "./data/bundesliga_sport_de-{i}.json",
      start: 1,
      end: 27
    }, {
      title: "Tabelle",
      basename: "./data/bundesliga_table_sport_de-{i}.json",
      start: 1,
      end: 27
    }];


  // benutzt das file-loader.js Hilfsskript um eine Dateisequenz zu laden --> hier die Spiele
    loader(filesequences[0], function(data) {
      // for every "match-day"
      data.forEach(
        function(dayInSeason, dayIndex) {
          // for every match
          dayInSeason.forEach( 
            function(match, matchIndex) {
              streamgraph.extractMatchData(match, dayIndex);
              //console.log(dayIndex);
            }
          );
        }
      );
    });    

// loads all the ranks and puts them into the data-object

  /*
  loader(filesequences[1], function(data) {
      data.forEach( function (el, i) {
        injectRankToTeam(i, el.team, parseInt(d.place));
       });
    });

  */
}



// extract data from the given match and delegates an injection of the extracted 
// goals into the data-object based on the given day in season
streamgraph.extractMatchData = function(match, dayIndex) {

  // split the string with the results into two
  var cleanScore = match.result.split(" "); // "1:2 (0:0)" >> ["1:2", " (0:0)"]     
  var scores = cleanScore[0].split(":"); // "1:2" >> ["1", "2"]

  var teamHomeScore = parseInt(scores[0]);
  var teamGuestScore = parseInt(scores[1]);

  streamgraph.injectGoalsToTeam(dayIndex, match.team_home, teamHomeScore);
  streamgraph.injectGoalsToTeam(dayIndex, match.team_guest, teamGuestScore);
}



// extract data from the given match and delegates an injection of the extracted 
// rank into the data-object based on the given day in season
streamgraph.injectRankToTeam = function(dayIndex, teamName, rank) {
    streamgraph.teams.forEach(
      function(team) {
      if (team.name == teamName) {
        team.rank[dayIndex] = rank;
      }
    });
}


// injects the match-data for the given day (dayIndex) and team (teamName) into the data-object
streamgraph.injectGoalsToTeam = function(dayIndex, teamName, score) {


    streamgraph.teams.forEach(
      function(team) {
      if (team.name == teamName) {
      // console.log("Am " + (parseInt(dayIndex) + 1) + ". Spieltag schoss " + teamName  + " " + score + " Tore.");
        team.scores[dayIndex] = score;
      }
    });
}


// this function updates the whole chart!
streamgraph.update = function(index) {
}


// this function loads the data from the corresponding year into the data-array
streamgraph.updateDataset = function() {
}



/*

// Inspired by Lee Byron's test data generator.
function bumpLayer(n) {

  function bump(a) {
    var x = 1 / (.1 + Math.random()),
        y = 2 * Math.random() - .5,
        z = 10 / (.1 + Math.random());
    for (var i = 0; i < n; i++) {
      var w = (i / n - y) * z;
      a[i] += x * Math.exp(-w * w);
    }
  }

  var a = [], i;
  for (i = 0; i < n; ++i) a[i] = 0;
  for (i = 0; i < 5; ++i) bump(a);
  return a.map(function(d, i) { return {x: i, y: Math.max(0, d)}; });
}

*/