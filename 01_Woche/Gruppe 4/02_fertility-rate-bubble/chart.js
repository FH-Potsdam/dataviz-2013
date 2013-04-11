var chart = chart || {};

jQuery(document).ready(function() {
  d3.json("../00_data/fertility-rate_column-int.json", function(data) {
    chart.setup({
      rows: data,
      autostep: false,
      w: 1000,
      h: 500,
      r: 200,
      cur: 1980,
      max: 2010
    });
  });

});

chart.setup = function(options) {
  var w = chart.w = options.w || 800,
      h = chart.h = options.h || 600,
      data = chart.data = options.rows,
      current = chart.current = options.cur || 1980;
      max = chart.max = options.max || 2010;
  
  //alert(data["2010"]);
  
  var color = chart.color = d3.scale.category20c();
      //.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "#98abc5", "#8a89a6"]);
  
  chart.yearTitle = d3.select("body")
      .append("h2");
  
  chart.btn = d3.select("body")
      .append("button")
      .text("➜")
      .on("click", chart.step);
      
  var bubble = chart.bubble = d3.layout.pack()
      .sort(null)
      .size([w,h])
      .padding(1.5);
  
  var svg = chart.svg = d3.select("body")
      .append("svg")
      .attr("width" , w)
      .attr("height" , h)
      .attr("class", "bubble");

  chart.draw();
}

chart.draw = function() {
  if(chart.current <= chart.max) {
    chart.yearTitle.text(chart.current);
    
    var chartRow = chart.chartRow = chart.data;
    
    var node = chart.node = chart.svg.selectAll(".node")
        .data(chart.bubble.nodes(chart.classes(chartRow, chart.current)));
    
    node.transition()
        .duration(1000)
        .attr("transform", function(d) { return "translate("+d.x+","+d.y+")"; });
        
    node.select("circle").transition()
        .duration(1000)
        .attr("r", function(d) { return d.r });
    
        
    node.select("text").transition()
        .duration(1000)
        .text(function(d) { return d.value });
    
    node.enter()
      .append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate("+d.x+","+d.y+")"; })
      .append("circle")
        .attr("id", function(d, i) { return "bubble"+i; })
        .attr("r", function(d) { return d.r })
        .on("mouseover", chart.over)
        .on("mouseout", chart.out)
        .style("fill", function(d, i) { return chart.color(d.r) });
        
      node.append("text")
        .style("display", "none")
        .attr("id", function(d, i) { return "text"+i; })
        .text(function(d) { return d.value })
        .on("mouseover", chart.over)
        .on("mouseout", chart.out);
    
    d3.select("#bubble0").attr("style", "fill: transparent; stroke: #000");
    //d3.select("#text0").attr("style", "zindex: fixed; top: 200px; left: 10px;");
  }
}

chart.over = function(d, i) {
  //alert("#"+i);
  d3.select("#text"+i).style("display", "inline");
}

chart.out = function(d, i) {
  d3.select("#text"+i).style("display", "none");
}

chart.step = function() {
  chart.current++;
  chart.draw();
}

chart.classes = function(root, year) {
  var classes = [];
  
  function recurse(name, node) {
    if (node[year]) node[year].forEach(function(child) { recurse(node, child); });
    else classes.push({value: node});
  }

  recurse(null, root);
  return {children: classes};
}