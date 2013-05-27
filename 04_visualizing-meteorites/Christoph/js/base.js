var allData = allData || {};
var groupData = groupData || {};

jQuery(document).ready(function() { 
  $(window).resize(function() {
    draw();
  });
  
  allData.meteors = new L.LayerGroup();
  var map = L.map('map', {
    center : [52.52, 13.4],
    zoom : 3,
    layers: allData.meteors
  });


  L.tileLayer('http://a.tiles.mapbox.com/v3/kennstenicht.map-yqa8hmw1/{z}/{x}/{y}.png').addTo(map);
  
  d3.json("data/allData.json", function(data) {
    setup({
      row: data
    });
  });
});

var setup = function(options) {
  //die geladenen Daten wieder in das Objekt kopieren
  allData.keyword = options.row.keyword;
  allData.class = options.row.class;
  allData.class_keyword = options.row.class_keyword;
  allData.meteorit = options.row.meteorit;
  
  draw();
}

var draw = function() {
  var windowWidth = $(window).width();
  $("#map").width(windowWidth);
  $("#container").width(windowWidth);
  
  //max Werte für die Scale funktion berechnen
  var maxCount = 0;
  var maxWeight = 0;
  var maxWeightGramm = 0;
  var maxPrice = 0;
  for(i=0; i<allData.keyword.length; i++) {
    maxCount = maxCount + allData.keyword[i].records.length;
    maxWeight = maxWeight + allData.keyword[i].weight;
    maxWeightGramm = maxWeightGramm + allData.keyword[i].gPrice;
    maxPrice = maxPrice + allData.keyword[i].price;
  }
  
  
  //Abstände der einzelnen Balken Elemente bestimmen
  var barWidth = windowWidth-150;
  var barHeight = 50;
  var barGap = 30;
  var barEntryGap = 3;
  var extendBar = 5;
  
  
  //SVG Element Container erstellen
  var name = d3.select('#container').append('div').attr('id', 'name');
  var svg = d3.select('#container').append('svg').attr('id', 'chart').attr("width",barWidth+8);
  var color = d3.scale.category10();
  
  
  //Werte Skalieren
  var scaleCount = d3.scale.linear()
    .domain([0, maxCount])
    .range([0, barWidth-(allData.keyword.length*(barEntryGap+extendBar))]);
  
  var scaleWeightGramm = d3.scale.linear()
    .domain([0, maxWeight])
    .range([0, barWidth-(allData.keyword.length*(barEntryGap+extendBar))]);
       
  var scaleWeight = d3.scale.linear()
    .domain([0, maxWeight])
    .range([0, barWidth-(allData.keyword.length*(barEntryGap+extendBar))]);
  
  var scalePrice = d3.scale.linear()
    .domain([0, maxPrice])
    .range([0, barWidth-(allData.keyword.length*(barEntryGap+extendBar))]);
      

  // Offset der einzelnen Balkenelemente
  allData.nameOffset = 0;
  allData.countOffset = 0;
  allData.weightGrammOffset = 0;
  allData.weightOffset = 0;
  allData.priceOffset = 0;
  
  
  //Append Connections Gruppe um sie hinter allen anderen Elementen zu plazieren
  svg.append("g").attr("id", "connections");
  
  
  //Gruppenname anzeigen und drehen
  name.selectAll('div').data(allData.keyword).enter()
  .append("div")
      .attr("class","group_box")
      .attr("style", function(d,i) { return "width: "+parseFloat(scaleCount(d.records.length)+barEntryGap+extendBar)+"px;" })
    .append("span")
      .attr("style", function(d,i) { return "left: "+(-70+parseFloat(scaleCount(d.records.length)+extendBar)/2)+"px;" })
      .attr("class", function(d,i) { return "group_name id"+d.id; })
      .text(function(d,i) { return d.key });
    
    
  //erster Balken (Anzahl der gefundenen Meteoriten pro Typ)
  svg.append("g").attr("id", "count").selectAll('rect').data(allData.keyword).enter()
    .append('rect')
      .attr("width", function(d,i) { return scaleCount(d.records.length)+extendBar; })
      .attr("height", barHeight)
      .attr("x", function(d,i) { 
        d.x1 = allData.countOffset+barEntryGap+extendBar;
        d.x2 = allData.countOffset + scaleCount(d.records.length)+barEntryGap+(extendBar*2);
        allData.countOffset = allData.countOffset + scaleCount(d.records.length)+barEntryGap+extendBar;
        return allData.countOffset - scaleCount(d.records.length);
      })
      .attr("data-x1", function(d,i) { return d.x1; })
      .attr("data-x2", function(d,i) { return d.x2; })
      .attr("y", 0*(barHeight+barGap))
      .attr("fill", function(d,i) { return color(d.id); })
      .attr("fill-opacity", "0.6")
      .attr("class", function(d,i) { return "id"+d.id; })
      .on("mouseover", over)
      .on("mouseout", out)
      .on("click", click);
    
    
  //zweiter Balken (Gewicht der gefunden Meteoriten pro Typ)
  svg.append("g").attr("id", "weight").selectAll('rect').data(allData.keyword).enter()
    .append('rect')
      .attr("width", function(d,i) { return scaleWeight(d.weight)+extendBar; })
      .attr("height", barHeight)
      .attr("x", function(d,i) { 
        d.x1 = allData.weightOffset+barEntryGap+extendBar;
        d.x2 = allData.weightOffset + scaleWeight(d.weight)+barEntryGap+(extendBar*2);
        allData.weightOffset = allData.weightOffset + scaleWeight(d.weight)+barEntryGap+extendBar;
        return allData.weightOffset - scaleWeight(d.weight);
      })
      .attr("data-x1", function(d,i) { return d.x1; })
      .attr("data-x2", function(d,i) { return d.x2; })
      .attr("y", 1*(barHeight+barGap))
      .attr("fill", function(d,i) { return color(d.id); })
      .attr("fill-opacity", "0.6")
      .attr("class", function(d,i) { return "id"+d.id; })
      .on("mouseover", over)
      .on("mouseout", out)
      .on("click", click);
    
    
  //dritter Balken (Preis der gefunden Meteoriten pro Typ)
  svg.append("g").attr("id", "price").selectAll('rect').data(allData.keyword).enter()
    .append('rect')
      .attr("width", function(d,i) { return scalePrice(d.price)+extendBar; })
      .attr("height", barHeight)
      .attr("x", function(d,i) { 
        d.x1 = allData.priceOffset+barEntryGap+extendBar;
        d.x2 = allData.priceOffset + scalePrice(d.price)+barEntryGap+(extendBar*2);
        allData.priceOffset = allData.priceOffset + scalePrice(d.price)+barEntryGap+extendBar;
        return allData.priceOffset - scalePrice(d.price);
      })
      .attr("data-x1", function(d,i) { return d.x1; })
      .attr("data-x2", function(d,i) { return d.x2; })
      .attr("y", 2*(barHeight+barGap))
      .attr("fill", function(d,i) { return color(d.id); })
      .attr("fill-opacity", "0.6")
      .attr("class", function(d,i) { return "id"+d.id; })
      .on("mouseover", over)
      .on("mouseout", out)
      .on("click", click);
    
    
    
  //Connections zeichnen und in die Connections Gruppe einfügen
  for(var i = 1; i < allData.keyword.length+1; i++) {
    var connections = d3.selectAll("#chart .id"+i);
    var connectionsArray = new Array();
    connectionsArray[i] = new Array();
    connections[0].forEach(function(con, index) {
      connectionsArray[i][index] = d3.select(con).attr("data-x1");
      connectionsArray[i][connections[0].length*2-index-1] = d3.select(con).attr("data-x2");
    });
  
    connectionsArray.forEach(function(array) {
      path = "M"+array[0]+","+parseInt(barHeight)+
      " L"+array[1] +","+parseFloat(1*(barHeight+barGap))+
      " L"+array[1] +","+parseFloat((1*((barHeight)+barGap))+barHeight)+
      " L"+array[2] +","+parseFloat(2*(barHeight+barGap))+
      " L"+array[3] +","+parseFloat(2*(barHeight+barGap))+
      " L"+array[4] +","+parseFloat((1*((barHeight)+barGap))+barHeight)+
      " L"+array[4] +","+parseFloat(1*(barHeight+barGap))+
      " L"+array[5] +","+parseFloat(barHeight);
      
      
      d3.select("#connections").append("path")
        .attr("class", "path"+i)
        .attr("d", path)
        .attr("fill", color(i))
        .attr("fill-opacity", "0.1");
    });
  }
}


var click = function(d,i) {
  var positionJSON = new Array();
  d.records.forEach(function(array, index) {
    positionJSON.push({ 'lon': array["Coordinate 1"], 'lat': array["Coordinates 2"]})
  })
  
  allData.meteors.clearLayers();
  
  for(i=0;i<positionJSON.length;i++){
    L.marker([positionJSON[i].lon,positionJSON[i].lat]).addTo(allData.meteors);
  }
}

var over = function(d,i) {
  d3.select("#group_name").html(d.key);
  var id = d3.select(this).attr("class");
  d3.selectAll("."+id).attr("fill-opacity","1");
  d3.selectAll(".path"+id.substring(2,4)).attr("fill-opacity","0.5");
}

var out = function(d,i) {
  var id = d3.select(this).attr("class");
  d3.selectAll("."+id).attr("fill-opacity","0.6");
  d3.selectAll(".path"+id.substring(2,4)).attr("fill-opacity","0.1");
}