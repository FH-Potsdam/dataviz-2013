


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
      barW: 23,
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
  
  var container = chart.container = d3.select("body").append("div")
    .attr("width", chart.data.length*(chart.barWidth+5))
    .attr("height", chart.data[0].length*(chart.barWidth+5))
    .classed("games", true);
  
  d3.select("#filters").append("a").attr("href", "#").attr("data-sort", "day").text("Spieltag");
  d3.select("#filters").append("a").attr("href", "#").attr("data-sort", "goals_home").text("Tore Heim");
  d3.select("#filters").append("a").attr("href", "#").attr("data-sort", "goals_guest").text("Tore Gast");
  d3.select("#filters").append("a").attr("href", "#").attr("data-sort", "team_home").text("Heim");
  d3.select("#filters").append("a").attr("href", "#").attr("data-sort", "team_guest").text("Gast");
  d3.select("#filters").append("a").attr("href", "#").attr("data-sort", "result").text("Ergebniss"); 
  chart.draw();
}

chart.draw = function() {
  for(var j = 0; j < chart.data.length; j++) {
      var day = chart.day = chart.data[j];
      var game = chart.game = chart.container.selectAll(".game-day"+j).data(day);
      
      day.forEach(function (game) {
        game.goalsHome = parseInt(game.result.substring(0, game.result.indexOf(":")));
        game.goalsGuest = parseInt(game.result.substring(game.result.indexOf(":")+1, game.result.indexOf(" ")));
        game.resultClean = game.goalsHome+"-"+game.goalsGuest;
      });
      
      game.enter().append("div")
      .attr("class", "game game-day"+j)
      .attr("style", function(d,i) { console.log(255/9*d.goalsHome); return "width: "+chart.barWidth+"px; height: "+chart.barWidth+"px; background: rgb("+ parseInt(255/9*d.goalsHome) +","+ parseInt(255/9*d.goalsGuest) +","+ parseInt(255/9*d.goalsGuest) +");" })
      .attr("data-day", j )
      .attr("data-team-home", function(d,i) { return d.team_home} )
      .attr("data-team-guest", function(d,i) { return d.team_guest} )
      .attr("data-goals-home", function(d,i) { return d.goalsHome} )
      .attr("data-goals-guest", function(d,i) { return d.goalsGuest} )
      .attr("data-result-clean", function(d,i) { return d.resultClean} )
      .attr("class", function(d,i) { return "game game-day"+j+" "+d.resultClean } );
      
  }
  $('.games').isotope({
    getSortData : {
      day : function ( $elem ) {
        return parseInt($elem.attr('data-day'));
      },
      goals_home : function ( $elem ) {
        return parseInt($elem.attr('data-goals-home'));
      },
      goals_guest : function ( $elem ) {
        return parseInt($elem.attr('data-goals-guest'));
      },
      team_home : function ( $elem ) {
        return $elem.attr('data-team-home');
      },
      team_guest : function ( $elem ) {
        return $elem.attr('data-team-guest');
      },
      result : function ( $elem ) {
        return $elem.attr('data-result-clean');
      }
    },
    sortBy : 'day',
    itemSelector: '.game',
    layoutMode: 'bigGraph',
    bigGraph: {
        columnWidth: chart.barWidth+(chart.barWidth/10), // size of item
        rowHeight: chart.barWidth+(chart.barWidth/10), // size of item
        maxRows: 20, // max number of items vertically
        gutterWidth: { // width of gutter, needs to match getSortData names
          day: 20,
          goals_home: 20,
          goals_guest: 20,
          team_home: 20,
          team_guest: 20,
          result: 20
        }
      },
  });
  
  $('#filters a').click(function(){
    var selector = $(this).attr('data-sort');
    var selector2 = $(this).attr('data-filter');
    $('.games').isotope({ sortBy: selector });
    $('.games').isotope({ filter: selector2 });
    return false;
  });
}

chart.over = function(d, i) {
  d3.select("#team_home").html(d.team_home);
  d3.select("#result").html(d.result);
  d3.select("#team_guest").html(d.team_guest);
}