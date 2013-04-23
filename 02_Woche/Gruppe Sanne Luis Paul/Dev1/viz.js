// siehe vorheriges Beispiel
var filesequences = [{
        title: "Spiele",
        basename: "../../data/bundesliga/bundesliga_sport_de-{i}.json",
        start: 1,
        end: 27
    }, {
        title: "Tabelle",
        basename: "../../data/bundesliga/bundesliga_table_sport_de-{i}.json",
        start: 1,
        end: 27
    }
];

var cleanGame = function (gamedata) {
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
    }
    return clean;
}

var cleanTable = function (row) {
    row.place = parseInt(row.place);
    row.place_before = parseInt(row.place_before) || 0;
    row.draws = parseInt(row.draws);
    row.games = parseInt(row.games);
    row.lost = parseInt(row.lost);
    row.points = parseInt(row.points);
    row.wins = parseInt(row.wins);
    return row;
}

loader(filesequences[0], function (dirty_data) {
    var clean_data = [];
    dirty_data.forEach(function (row, i) {
        var clean_row = [];
        row.forEach(function (gamedata) {
            clean_row.push(cleanGame(gamedata));
        });
        clean_data.push(clean_row);
    });
});

loader(filesequences[1], function (data) {
    data.forEach(function (table) {
        table.forEach(function (row) {
            row = cleanTable(row);
        });
    });

    console.log("Tabellen: ", data);

    graphics.draw(data);
});



// svg width and height
var width = window.innerWidth - 100;
var height = 500;
var TOTAL_TEAMS = 15;



/* draw the data (d3, svg stuff) */
var graphics = function () {
    var svg;

    return {
        init: function (container_id) {
            svg = d3.select(container_id).append("svg").attr("width", width).attr("height", height);
        },

        draw: function (data) {
            data.forEach(function (table, i) {
                // spielwoche
                var txt = svg.append("text")
                    .attr("dx", 50 + i * 30)
                    .attr("dy", height - 20)
                    .style("fill", "white")
                    .text(i);

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



            //data.forEach(function (table, i) {
                // for (var j = TOTAL_TEAMS; j > 0; j--) {
                    //lines(i, j);
                // }

                // function lines(i, j) {
                //     //console.log("TEAM: "+table[j].team+", place"+table[j].place+", place_before"+table[j].place_before);

                //     var tmpTeam = table[j].team;
                //     //console.log(tmpTeam);

                //     if (tmpTeam == "Borussia Dortmund") {
                //         //console.log("Borussia Dortmund");

                //         var lineBar = svg.append("g");
                //         var tmpPlace = table[j].place;

                //         //
                //         var tmpPlaceBefore = table[j].place_before;
                //         if(tmpPlaceBefore === 0) {
                //         	console.log("tmpPlaceBefore");
                //         }

                //         var tmpX1 = 50 + i * 30;
                //         var tmpY1 = -20 + tmpPlace * 30;
                //         var tmpX2 = 50 + (i - 1) * 30;
                //          if (tmpPlaceBefore === 0) {
                //         //   var tmpY2 = 0;
                //         //   console.log("NO");
                //         // } else {

                //           var tmpY2 = -20 + tmpPlace * 30;
                //         } else {
                //         	tmpY2 = -20 + (tmpPlace+tmpPlaceBefore) * 30;
                //         }
                //         //   }
                //         //console.log("place: "+tmpY1+", place_bef: "+tmpY2);
                //         lineBar.append("line")
                //             .attr("id", "lineGraph")
                //             .attr("x1", tmpX1)
                //             .attr("y1", tmpY1)
                //             .attr("x2", tmpX2)
                //             .attr("y2", tmpY2)
                //             .style("stroke", "yellow");
                //         //lineBar.attr("id", "dortmund")
                //     } else if (tmpTeam == "Fortuna Düsseldorf") {
                //         //console.log("Fortuna Düsseldorf");
                //     }
                // }
            //});


            // var lineBar = svg.append("path")
            //                  .attr("d", "M 0 0 L 300 100 L 200 300 L 500 400 z")
            //                  .style("fill", "none")
            //    .style("stroke", "red");


            // spielwochenlinie
            var line = svg.append("line")
                .attr("x1", 0)
                .attr("y1", height - 40)
                .attr("x2", width)
                .attr("y2", height - 40)
                .style("stroke", "white");


            /**
             * Tooltip
             */
            var tooltip = svg.append("g").attr("id", "tooltip").attr("visibility", "hidden");
            var teamTooltip = tooltip.append("rect")
                .attr("width", 350)
                .attr("height", 70)
                .attr("x", 70)
                .attr("y", -40)
                .style("fill", "black");
            var teamName = tooltip.append("text")
                .attr("id", "tooltipName")
                .attr("dx", 75)
                .attr("dy", -20)
                .style("fill", "white")
                .text("team");
            var teamPoints = tooltip.append("text")
                .attr("id", "tooltipPoints")
                .attr("dx", 75)
                .attr("dy", 0)
                .style("fill", "white")
                .text("Points: ");
            var teamPlace = tooltip.append("text")
                .attr("id", "tooltipPlace")
                .attr("dx", 75)
                .attr("dy", 20)
                .style("fill", "white")
                .text("Place: ");
            

        } // End 'draw'

    }
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
                        .on("mouseover", function () {
                          // tooltipData.name = table[j].team;
                          // tooltipData.place = table[j].place;
                          // tooltipData.points = table[j].points;
                          d3.select(this).style("fill", "aliceblue");
                          d3.select("#tooltip").attr("visibility", "visible").attr("transform", function (d) {
                              // display line
                        //      for (var j = TOTAL_TEAMS; j > 0; j--) {
                              //   ines(i, j);
                              // }
                              return "translate(" + i * 30 + "," + tempY + ")";
                          });
                        d3.select("#tooltipName")
                            .text(table[j].team + ', lost: ' + table[j].lost + ', wins: ' + table[j].wins + ', points: ' + table[j].points);
                        d3.select("#tooltipPlace")
                          .text(table[j].place);
                    })
                        .on("mouseout", function () {
                        d3.select(this).style("fill", "#373D43");
                        d3.select("#tooltip")
                            .attr("visibility", "hidden");
                    });




                    var teamCircle = svg.append("circle")
                        .attr("id", table[j].team)
                        .attr("r", 2)
                        .attr("cx", tempX)
                        .attr("cy", tempY)
                        .style("fill", "#fff");

                    var tmpTeam = table[j].team;
                    //console.log(tmpTeam);

                    if (tmpTeam.indexOf("C Bayern München") !== -1) {
                        //console.log('FC Bayern München');
                        teamCircle.attr("fill", "#f00");
                    } else if (tmpTeam.indexOf("orussia Dortmund") !== -1) {
                        //console.log('Borussia Dortmund');
                        teamCircle.style("fill", "#ff0");
                    } else if (tmpTeam.indexOf("ortuna Düsseldorf") !== -1) {
                        //console.log('Fortuna Düsseldorf');
                        teamCircle.style("fill", "#f0f");
                    } else if (tmpTeam.indexOf("intracht Frankfurt") !== -1) {
                        //console.log('Eintracht Frankfurt');
                        teamCircle.style("fill", "#f00");
                    } else if (tmpTeam.indexOf("orussia Mönchengladbach") !== -1) {
                        console.log('Borussia Mönchengladbach');
                        teamCircle.style("fill", "#08FD92");
                    } else if (tmpTeam.indexOf("amburger SV") !== -1) {
                        console.log('Hamburger SV');
                        teamCircle.style("fill", "#00F");
                    }/* else if (tmpTeam.indexOf("V Werder Bremen") !== -1) {
                        //console.log('SV Werder Bremen');
                        teamCircle.style("fill", "#00F");
                    } */else if (tmpTeam.indexOf("899 Hoffenheim") !== -1) {
                        //console.log('1899 Hoffenheim');
                        teamCircle.style("fill", "#F00");
                    } else if (tmpTeam.indexOf("fB Stuttgart") !== -1) {
                        //console.log('VfB Stuttgart');
                        teamCircle.style("fill", "#F00");
                    }/* else if (tmpTeam.indexOf("C Schalke 04") !== -1) {
                        //console.log('FC Schalke 04');
                        teamCircle.style("fill", "#0ff");
                    }*/

                    //d3.select("circle").on("click", function() {
                    //  console.log("TEST");
                    //});
                }



// Run it
graphics.init("#vis");