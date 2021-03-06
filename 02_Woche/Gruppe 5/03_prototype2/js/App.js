var chart = chart || {};

// these variables need to be declared so we can use them thoughout the entire code … i think.

$(document).ready(function()  {
    
    $("#runScript").click(function() {
        chart.setup();
    });
    
    chart.teams = new Array();

    d3.json("./data/clubs.json", function(data) { 
        data.forEach( function(club, index ) {
            chart.addTeam(club.name, club.primary_hex_color, club.crest_url);
            // console.log('Team added!');
        });
    });

});


/*
 *   Added
 */
 
// loads all the game-data
chart.loadJSONData = function(callback) {

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
              chart.extractMatchData(match, dayIndex);
              //console.log(dayIndex);
            }
          );
        }
      );
    });
}

// extract data from the given match and delegates an injection of the extracted 
// goals into the data-object based on the given day in season
chart.extractMatchData = function(match, dayIndex) {

  // split the string with the results into two
  var cleanScore = match.result.split(" "); // "1:2 (0:0)" >> ["1:2", " (0:0)"]     
  var scores = cleanScore[0].split(":"); // "1:2" >> ["1", "2"]

  var teamHomeScore = parseInt(scores[0]);
  var teamGuestScore = parseInt(scores[1]);

  chart.injectGoalsToTeam(dayIndex, match.team_home, teamHomeScore);
  chart.injectGoalsToTeam(dayIndex, match.team_guest, teamGuestScore);
    
  // console.log(chart.teams);
}

// extract data from the given match and delegates an injection of the extracted 
// rank into the data-object based on the given day in season
chart.injectRankToTeam = function(dayIndex, teamName, rank) {
    chart.teams.forEach(
      function(team) {
      if (team.name == teamName) {
        team.rank[dayIndex] = rank;
        console.log('rank');
      }
    });
}

// injects the match-data for the given day (dayIndex) and team (teamName) into the data-object
chart.injectGoalsToTeam = function(dayIndex, teamName, score) {


    chart.teams.forEach(
      function(team) {
      if (team.name == teamName) {
      // console.log("Am " + (parseInt(dayIndex) + 1) + ". Spieltag schoss " + teamName  + " " + score + " Tore.");
        team.scores[dayIndex] = score;
      }
    });
}

// this function adds a new team  to the data-array!
chart.addTeam = function(teamName, teamColor, teamLogoURL) {
  // empty team
  var team = {
      "name" : teamName,
      "scores" : [], // the goals over the 27 days of season
      "rank" : [], // the rank over the 27 days of season
      "color" : teamColor,
      "logoURL" : teamLogoURL
  };
  // add it to the existing list
  chart.teams.push(team);
}


// setup function, only once called
chart.setup = function(options) {
    
    var goals = [];
    
    chart.loadJSONData();
    
    /*
     *      ONLY CHECKS iF DATA IS COMING IN PROPERLY
     */
    
    for(var i = 0; i < chart.teams.length; i++) {
        
        console.log(chart.teams[i]);
        
        for(var j = 0; j < chart.teams[i].scores.length; j++) {
          // console.log(chart.teams[i].scores[j]);
        }
    }
    
    /*
    
    stack = d3.layout.stack().offset("zero"),
       layers0 = stack(d3.range(chart.teams[0].scores.length).map(function() { return bumpLayer(m);})),
       layers1 = stack(d3.range(chart.teams[0].scores.length).map(function() { return bumpLayer(m);}));
       
    */
   
   /*
   
   var totalGames = [];
   
   for(var j = 0; j < chart.teams.length; j++) {
       for(var k = 0; k < chart.teams[j].scores.length; k++) {
           // console.log('WH00P');
           totalGames.push(chart.teams[j].scores[k]);
       }
   }
   
   console.log(totalGames);
   
   */
   
   var m = 18
   var n = 27;
   
   stack = d3.layout.stack().offset("zero"),
       layers0 = stack(d3.range(chart.teams[0].scores.length).map(function() { return bumpLayer(m);})),
       layers1 = stack(d3.range(chart.teams[0].scores.length).map(function() { return bumpLayer(m);}));

    var width = 960,
        height = 500;

    var x = d3.scale.linear()
        .domain([0, m - 1])
        .range([0, width]);

    var y = d3.scale.linear()
        .domain([0, d3.max(layers0.concat(layers1), function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); })])
        .range([height, 0]);
   
   var teamColors = [];
   var teamNames = [];
   
   for(var i = 0; i < chart.teams.length; i++) {
       teamColors.push(chart.teams[i].color);
       teamNames.push(chart.teams[i].name);
   }
   
   var color = d3.scale.ordinal()
           .range(teamColors);

    var area = d3.svg.area()
        .x(function(d) { return x(d.x); })
        .y0(function(d) { return y(d.y0); })
        .y1(function(d) { return y(d.y0 + d.y); });

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.selectAll("path")
        .data(layers0)
      .enter().append("path")
        .attr("d", area)
        .attr("fill", function(d, i) { return color(i); });

    function transition() {
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
      console.log(a.map(function(d, i) { return {x: i, y: Math.max(0, d)}; }));
    }
    
}


// this function updates the whole chart!
chart.update = function(index) {
}


// this function loads the data from the corresponding year into the data-array
chart.updateDataset = function() {
}