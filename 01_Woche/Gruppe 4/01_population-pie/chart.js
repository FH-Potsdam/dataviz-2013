var chart = chart || {};

jQuery(document).ready(function() {
  
  d3.json("../../../data/population-germany/1978-2011.rows.json", function(data) {
    chart.setup({
      rows: data,
      autostep: false,
      w: 400,
      h: 400,
      r: 200
    });
  });
  
});

chart.setup = function(options) {
  var w = chart.w = options.w || 800,
      h = chart.h = options.h || 600,
      r = chart.r = options.r || 300,
      data = chart.data = options.rows,
      current = chart.current = 0;
  
  var color = chart.color = d3.scale.category20c();
      //.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "#98abc5", "#8a89a6"]);
  
  var arc = chart.arc = d3.svg.arc()
      .innerRadius(r - 50)
      .outerRadius(r);
    
  var pie = chart.pie = d3.layout.pie()
      .sort(null);
  
  var svg = chart.svg = d3.select("body")
      .append("svg")
      .attr("width" , w)
      .attr("height" , h)
    .append("g")
      .attr("transform", "translate(" + w/2 + "," + h/2 +")");
    
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
  if(chart.current < chart.data.length){
    var chartRow = chart.chartRow = chart.data[chart.current],
        year = chartRow.shift();

    var g = chart.svg.selectAll(".arc")
        .data(chart.pie(chartRow));
    
    g.enter().append("g")
        .attr("class", "arc")
    
    g.append("path")
        .attr("d", chart.arc)
        .style("fill", function(d, i) { return chart.color(i) })
        .on("mouseover", chart.hover);
        
  
    chart.yearTitle.text(year);
  }
}

chart.step = function() {
  chart.current++;
  chart.draw();
}

chart.hover = function(d, i) {
  chart.population.text(chart.chartRow[i]);
}