// siehe vorheriges Beispiel
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
  }
];

var cleanGame = function(gamedata) {
  var date = gamedata.datetime.match(/\d+.\d+.\d+/)[0].split(".");
  var time = gamedata.datetime.match(/\d+:\d+/)[0].split(":");

  var gametime = new Date();
  gametime.setDate(parseInt(date[0], 10));
  gametime.setMonth(parseInt(date[1], 10) - 1); // Danger! - setMonth fängt bei 0 an zu zählen!?!
  gametime.setFullYear(parseInt(date[2], 10));
  gametime.setHours(parseInt(time[0], 10));
  gametime.setMinutes(parseInt(time[1], 10));
  gametime.setSeconds(0);

  var clean = {
    datetime: gametime,
    result: gamedata.result.substring(0, gamedata.result.indexOf(" ")),
    team_home: gamedata.team_home,
    team_guest: gamedata.team_guest
  };
  return clean;
};

var cleanTable = function(row) {
  row.place = parseInt(row.place);
  row.place_before = parseInt(row.place_before) || 0;
  row.draws = parseInt(row.draws);
  row.games = parseInt(row.games);
  row.lost = parseInt(row.lost);
  row.points = parseInt(row.points);
  row.wins = parseInt(row.wins);
  return row;
};

loader(filesequences[0], function(dirty_data) {
  var clean_data = [];
  dirty_data.forEach(function(row, i) {
    var clean_row = [];
    row.forEach(function(gamedata) {
      clean_row.push(cleanGame(gamedata));
    });
    clean_data.push(clean_row);
  });
});

loader(filesequences[1], function(data) {
  data.forEach(function(table) {
    table.forEach(function(row) {
      row = cleanTable(row);
    });
  });

  console.log("Tabellen: ", data);

  graphics.draw(data);
});



// svg width and height
var width = window.innerWidth - 100;
var height = 700;
var TOTAL_TEAMS = 18;



/* draw the data (d3, svg stuff) */
var graphics = function() {
  var svg;

  return {
    init: function(container_id) {
      svg = d3.select(container_id).append("svg").attr("width", width).attr("height", height);
    },
    draw: function(data) {
      data.forEach(function(table, i) {

        // spielwoche
        var txt = svg.append("text")
            .attr("dx", 45 + i * 30)
            .attr("dy", height - 130)
            .style("fill", "white")
            .text(i+1);

        for (var j = 0; j < TOTAL_TEAMS; j++) {
          graphix(svg, table, i, j);
        }


        //   for(var j2=2; j2>0; j2--) {

        //   var lineBar = svg.append("g")
        //                  .style("fill", "none")
        //    .style("stroke", "red");
        // lineBar.append("line")
        //         .attr("x1", 50+i*10)
        //         .attr("y1", 10+j2*30)
        //         .attr("x2", 50+i*10)
        //         .attr("y2", 200);
        //   }

      });




      // function line(data, id) {
      //   var tmpPlace = data.place;
      //   var tmpPlaceBefore = data.place_before;
      //   console.log("place: "+tmpPlace+", placeBefore: "+tmpPlaceBefore);

      //   var tmpX1 = 50 + tmpPlace * 30;
      //   var tmpY1 = 10 + (j+tmpPlace-1) * 30;// + tmpPlace * 30;
      //   var tmpX2 = 50 + (j+tmpPlaceBefore) * 30;
      //   var tmpY2 = 10 + (j+tmpPlace-1) * 30;

      //   var lineBar = svg.append("g");
      //   lineBar.append("line")
      //          .attr("id", id)
      //          .attr("x1", tmpX1)
      //          .attr("y1", tmpY1)
      //          .attr("x2", tmpX2)
      //          .attr("y2", tmpY2);
      // }

      //data.forEach(function (table, i) {
        //for (var j = 0; j < TOTAL_TEAMS; j++) {
          // if (table[j].team === "FC Bayern München") {
          //   //console.log("treffer");
          //   //line(table[j], table[j].team.replace(/\s+/g, '').replace('1.', ''));
          // }
          // if (table[j].team === "Eintracht Frankfurt") {
          //   console.log("treffer");
          //   line(table[j], table[j].team.replace(/\s+/g, '').replace('1.', ''));
          // }

          //console.log(table[j].team);
          // var lineBar = svg.append("g");
          // var tmpPlace = table[j].place;
          // var tmpPlaceBefore = table[j].place_before;

          // var tmpX1 = 50 + i * 30;
          // var tmpY1 = -20 + tmpPlace * 30;
          // var tmpX2 = 50 + (i - 1) * 30;
          // var tmpY2 = 0;
          // if (tmpPlaceBefore == 0) {
          //   tmpY2 = 0;
          //   console.log("NO");
          //   //} else {

          //   //var tmpY2 = -20 + tmpPlace * 30;
          // } else {
          //   tmpY2 = -20 + (tmpPlace+tmpPlaceBefore) * 30;
          // }


          // svg.append("line")
          //          .attr("id", "lineGraph")
          //          .attr("x1", tmpX1)
          //         .attr("y1", tmpY1)
          //         .attr("x2", tmpX2)
          //         .attr("y2", tmpY2)
          //         .style("stroke", "yellow");
        //}
      //});



      // spielwochenlinie
      var line = svg.append("line")
          .attr("x1", 40)
          .attr("y1", height - 155)
          .attr("x2", 845)
          .attr("y2", height - 155)
          .style("stroke", "#373D43");


      /**
       * Tooltip
       */
      var tooltip = svg.append("g").attr("id", "tooltip").attr("visibility", "hidden");
      var teamTooltip = tooltip.append("rect")
          .attr("width", 250)
          .attr("height", 70)
          .attr("x", 70)
          .attr("y", -20)
          .style("fill", "black");
      var teamName = tooltip.append("text")
          .attr("id", "tooltipName")
          .attr("dx", 75)
          .attr("dy", 0)
          .style("fill", "white")
          .text("team");
      var teamPoints = tooltip.append("text")
          .attr("id", "tooltipPlacePoints")
          .attr("dx", 75)
          .attr("dy", 20)
          .style("fill", "white")
          .text("Points: ");
      var teamPlace = tooltip.append("text")
          .attr("id", "tooltipLostWins")
          .attr("dx", 75)
          .attr("dy", 40)
          .style("fill", "white")
          .text("Place: ");


    } // End 'draw'

  };
}();


function searchTeam(s) {
  if (tmpTeam.indexOf() !== -1) {
    return true;
  } else {
    return false;
  }
}


function graphix(svg, table, i, j) {
  var tempX = 50 + i * 30;
  var tempY = 10 + j * 30;
  var team = svg.append("circle")
      .attr("class", i)
      .attr("id", j)
      .attr("r", 13)
      .attr("cx", tempX)
      .attr("cy", tempY)
      .style("fill", "#373D43")
      .on("mouseover", function() {
    // tooltipData.name = table[j].team;
    // tooltipData.place = table[j].place;
    // tooltipData.points = table[j].points;
    d3.select(this).style("fill", "aliceblue");
    d3.select("#tooltip").attr("visibility", "visible").attr("transform", function(d) {
      // display line
      //      for (var j = TOTAL_TEAMS; j > 0; j--) {
      //   ines(i, j);
      // }
      return "translate(" + i * 30 + "," + tempY + ")";
    });
    d3.select("#tooltipName")
      .text(table[j].team);
    d3.select("#tooltipLostWins")
        .text("Lost: "+table[j].lost+"  Wins: "+table[j].wins);
    d3.select("#tooltipPlacePoints")
        .text("Place: "+table[j].place+"  Points: "+table[j].points);
  })
      .on("mouseout", function() {
    d3.select(this).style("fill", "#373D43");
    d3.select("#tooltip")
        .attr("visibility", "hidden");
  });


  var teamCircle = svg.append("circle")
      .attr("id", table[j].team.replace(/\s+/g, '').replace('1.', ''))
      .attr("r", 4)
      .attr("cx", tempX)
      .attr("cy", tempY);

  var tmpTeam = table[j].team;
}



// Run it
graphics.init("#vis");