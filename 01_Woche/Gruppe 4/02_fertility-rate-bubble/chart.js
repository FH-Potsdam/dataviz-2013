var chart = chart || {};

jQuery(document).ready(function() {
  d3.json("../00_data/fertility-rate_column-int.json", function(data) {
    chart.setup({
      rows: data,
      autostep: false,
      w: 1000,
      h: 800,
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
  
  var bubble = chart.bubble = d3.layout.pack()
      .sort(null)
      .size([w,h])
      .padding(1.5);
  
  var svg = chart.svg = d3.select("body")
      .append("svg")
      .attr("width" , w)
      .attr("height" , h)
      .attr("class", "bubble");
    
  chart.yearTitle = d3.select("body")
      .append("h2");
      
  chart.population = d3.select("body")
      .append("span")
      .attr("class", "population");
      
  chart.btn = d3.select("body")
      .append("button")
      .text("➜")
      .on("click", chart.step);
  
  chart.draw();
}

chart.draw = function() {
  if(chart.current <= chart.max) {
    var chartRow = chart.chartRow = chart.data;
    
    var node = chart.node = chart.svg.selectAll(".node")
        .data(chart.bubble.nodes(chart.classes(chartRow, chart.current)))
      .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate("+d.x+","+d.y+")"; });

    
    node.append("circle")
        .attr("r", function(d) { return d.r })
        .style("fill", function(d, i) { return chart.color(i) })
        .on("mouseover", chart.hover);
        
    node.append("text")
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .text(function(d) { return d.value });
    //chart.yearTitle.text(year);
  }
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