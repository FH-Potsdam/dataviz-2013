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


    streamgraph.n = 18; // number of layers ( in our case these represent clubs)
    streamgraph.m = 27; // number of samples per layer ( in our case these represent the played days)

    var test = streamgraph.teams.map( function(team, index) {
      var scores = new Array();
          for( var j in team.scores ) {
            scores[j] = { "x" : parseInt(j), "y" : team.scores[j] };
          }
          return scores;
    });

    console.log(test[0]);

    streamgraph.stack = d3.layout.stack().offset("zero").values(function(element, index) {
      return element[index];
    });

    //console.log(streamgraph.teams);
    streamgraph.layers0 = streamgraph.stack(d3.map());
    console.log(streamgraph.layers0);

    streamgraph.width = 960;
    streamgraph.height = 500;

    streamgraph.x = d3.scale.linear().domain([0, streamgraph.m - 1]).range([0, streamgraph.width]);
    streamgraph.y = d3.scale.linear().domain([0, 10]).range([0, streamgraph.height]);

    streamgraph.color = d3.scale.linear().range(["#aad", "#556"]);

    streamgraph.area = d3.svg.area().
      x( function(d) {return streamgraph.x( d.x );} ).
      y0( function(d) {return streamgraph.y( d.y0);} ).
      y1( function(d) {return streamgraph.y( d.y0+d.y );
    });

    streamgraph.svg = d3.select("body").append("svg").attr("width", streamgraph.width).attr("height", streamgraph.height);
    streamgraph.svg.selectAll("path").data(streamgraph.layers0).enter().append("path").attr("d", streamgraph.area).style("fill", function() { return streamgraph.color(Math.random()); });



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