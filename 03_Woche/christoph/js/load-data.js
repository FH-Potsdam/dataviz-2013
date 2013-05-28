var chart = chart || {};

jQuery(document).ready(function() {  
  d3.json("data/friends-location.json", function(data) {
    chart.setup({
      data : data,
      h: 500,
      barW: 10,
      currDay: 1,
      maxDay: 27
    });
  });
});

chart.setup = function(options) {
  chart.data = options.data;
  chart.width = options.width;
  chart.height = options.height;
  
  chart.container = d3.select("#container")
                          .append("svg")
                          .attr("width", $(window).width())
                          .attr("height", chart.height);
  chart.draw();
}

chart.draw = function() {
  var rawData = chart.data.data;
  var node = chart.node = chart.container.selectAll("rect").data(rawData);
  
  rawData.forEach(function (nodes) { 
    if(nodes.location) {
      nodes.locationname = nodes.location.name.substring(0, nodes.location.name.indexOf(","));
    }
  });
  
  
  
  node.enter()
    .append("svg:text")
      .attr("fill", "grb(0,0,0)")
      .attr("text-anchor",  "end")
      .attr("x", function(d,i) { return i * $(window).width()/chart.data.data.length })
      .attr("y", 500 )
      .attr("transform", function(d, i) { return "rotate(90," + d3.select(this).attr("x") + "," + d3.select(this).attr("y") +")";})
      .attr("class", function(d, i) { if(d.locationname) { return d.locationname } } )
      .attr("id", function(d, i) { return d.id } )
      .text(function(d,i) { return d.first_name })
      .on("mouseover", chart.over)
      .on("mouseout", chart.out);
}

chart.over = function(d, i) {
  var location = d3.select(this).attr("class");
  var startPosX = d3.select(this).attr("x");
  var startPosY = d3.select(this).attr("y");
  var connections = d3.selectAll("."+location);
  //console.log(connections);
  
  connections[0].forEach(function(con, index) {
    var endPosX = d3.select(con).attr("x");
    var endPosY = d3.select(con).attr("y");
    
    if(startPosX >= endPosX) { 
      console.log(startPosX+" "+endPosX);
      //console.log(parseInt(startPosX)-parseInt(endPosX));
    } else {
      console.log(endPosX+" "+startPosX);
      //console.log(parseInt(endPosX)-parseInt(startPosX));
    }

  });
  
  d3.selectAll("."+location).attr("fill", "rgb(255,0,0)");
}

chart.out = function(d, i) {
  var location = d3.select(this).attr("class");
  d3.selectAll("."+location).attr("fill", "rgb(0,0,0)");
}