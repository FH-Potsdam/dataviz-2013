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
      h: 230,
      barW: 20,
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
  
  var container = chart.container = d3.select("#container").append("div")
    .attr("width", chart.data.length*(chart.barWidth+5))
    .attr("height", chart.data[0].length*(chart.barWidth+5))
    .classed("games", true);
  
  d3.select("#filters").append("a").attr("href", "#").attr("data-sort", "day").text("Spieltag");
  d3.select("#filters").append("a").attr("href", "#").attr("data-sort", "goals_home").text("Tore Heim");
  d3.select("#filters").append("a").attr("href", "#").attr("data-sort", "goals_guest").text("Tore Gast");
  d3.select("#filters").append("a").attr("href", "#").attr("data-sort", "team_home").text("Name Heim");
  d3.select("#filters").append("a").attr("href", "#").attr("data-sort", "team_guest").text("Name Gast");
  d3.select("#filters").append("a").attr("href", "#").attr("data-sort", "result").text("Ergebniss"); 
  chart.draw();
}

chart.draw = function() {
  for(var j = 0; j < chart.data.length; j++) {
      var day = chart.day = chart.data[j];
      var game = chart.game = chart.container.selectAll(".game-day"+j).data(day);
      var axes = chart.axes = chart.container.append("div")
          .attr("width", chart.data.length*(chart.barWidth+5))
          .attr("height", chart.data[0].length*(chart.barWidth+5))
          .classed("axes", true)
          .attr("fill", "#000");
      
      day.forEach(function (game) {
        game.goalsHome = parseInt(game.result.substring(0, game.result.indexOf(":")));
        game.goalsGuest = parseInt(game.result.substring(game.result.indexOf(":")+1, game.result.indexOf(" ")));
        game.resultClean = game.goalsHome+"-"+game.goalsGuest;
        game.day = j+1;
      });
      
      game.enter().append("div")
          .attr("id", function(d,i) { return "game-"+d.day+"-"+i })
          .attr("class", function(d,i) { return "game game-day"+d.day })
          .attr("style", function(d,i) { return "width: "+chart.barWidth+"px; height: "+chart.barWidth+"px; background: rgb("+ parseInt(255/9*d.goalsHome) +","+ parseInt(255/9*d.goalsGuest) +","+ parseInt(255/9*d.goalsGuest) +");" })
          .attr("data-day", j )
          .attr("data-team-home", function(d,i) { return d.team_home} )
          .attr("data-team-guest", function(d,i) { return d.team_guest} )
          .attr("data-goals-home", function(d,i) { return d.goalsHome} )
          .attr("data-goals-guest", function(d,i) { return d.goalsGuest} )
          .attr("data-result-clean", function(d,i) { return d.resultClean} )
          .attr("class", function(d,i) { return "game game-day"+j+" "+d.resultClean } )
          .on("mouseover", chart.over)
          .on("mouseout", chart.out);

      
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
        maxRows: 10, // max number of items vertically
        gutterWidth: { // width of gutter, needs to match getSortData names
          day: 10,
          goals_home: 10,
          goals_guest: 10,
          team_home: 10,
          team_guest: 10,
          result: 10
        }
      },
  });
  
  $('#filters a').click(function(){
    var selector = $(this).attr('data-sort');
    $(".legende").hide();
    $("#"+selector).show();
    var selector2 = $(this).attr('data-filter');
    $('.games').isotope({ sortBy: selector });
    $('.games').isotope({ filter: selector2 });
    return false;
  });
}

chart.over = function(d, i) {
  var el = $(this);
  var style = $(this).attr("style");
  el.attr("style", style +"padding: 5px; width: "+chart.barWidth*6+"px; height: "+chart.barWidth*8+"px; z-index:999; margin-top: -"+parseInt((chart.barWidth*8/2)-chart.barWidth/2)+"px; margin-left: -"+parseInt((chart.barWidth*6/2)-chart.barWidth/2)+"px;" );
  el.html("<span><b>Heim:</b></br>"+d.team_home+"</br></br><b>Gast:</b></br> "+d.team_guest+"</br></br><b>Ergebnis:</b></br>"+d.result+"</br></br><b>Spieltag:</b></br>"+d.day+"</span>");

}

chart.out = function(d, i) {
  var el = $(this);
  var style = $(this).attr("style");
  el.attr("style", style +"padding: 0; width: "+chart.barWidth+"px; height: "+chart.barWidth+"px; z-index: 998; margin-top: 0; margin-left: 0;" );
  el.html("");
}