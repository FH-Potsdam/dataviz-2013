var allData = allData || {};
var groupData = groupData || {};
jQuery(document).ready(function() { 
  
  var map = L.map('map', {
    center : [52.52, 13.4],
    zoom : 2,
    layers: meteors
  });

  L.tileLayer('http://a.tiles.mapbox.com/v3/kennstenicht.map-yqa8hmw1/{z}/{x}/{y}.png').addTo(map);
  
  
  jQuery('body').on('loaded', function() {
    if (allData.meteorit && allData.keyword && allData.class && allData.class_keyword) {
      jQuery('body').trigger('go');
    }
  });
   
  jQuery('body').on('go', function() {
    draw();    
  });
  
  d3.json("data/meteoritessize.json", function(data) {
    allData.meteorit = data;
    jQuery('body').trigger('loaded');
  });
  
  d3.json("data/2013-05-meteors-keywords.json", function(data) {
    allData.keyword = data;
    jQuery('body').trigger('loaded');
  });
  
  d3.json("data/2013-05-meteors-classes.json", function(data) {
    allData.class = data;
    jQuery('body').trigger('loaded');
  });
  
  d3.json("data/2013-05-meteors-classes_keywords.json", function(data) {
    allData.class_keyword = data;
    jQuery('body').trigger('loaded');
  });
});



allData.searchRecord = function(value) {
  var class_keyword_ids = _.filter(allData.class_keyword, function(item) {
    return item.keyword == value; 
  });
  
  var class_ids = _.filter(allData.class, function(item) {
    return !_.isEmpty(_.filter(class_keyword_ids, function(item2) { return item2.class == item.id }));
  });
  
  var meteorit = _.filter(allData.meteorit, function(item) {
    return !_.isEmpty(_.filter(class_ids, function(item2) { return item2.key == item["Type of meteorite"]; }));
  });
  
  return meteorit;
}



var draw = function() {
  var maxCount = 0;
  var maxWeight = 0;
  var maxPrice = 0;
  
  allData.keyword.forEach(function(item) {
    //Gesamtgewicht der Gruppe aus den einzelnen Funden berechnen
    var search = allData.searchRecord(item.id);
    
    //Anzahl von allen Suchergebnissen. 
    //Diese Zahl ist weit mehr als die 34k Meteoriten, da jeder Meteoriet aus verschiedenen Materialien besteht
    maxCount = maxCount + search.length
    
    //Suchergebnis in die Keyword JSON Datei eintragen
    item.records = search;
    
    var gruppeWeight = 0;
    var gruppePrice = 0;
    search.forEach(function(item2) {
      //Gesamtgewicht der Gruppe aus den einzelnen Funden berechnen
      gruppeWeight = gruppeWeight + parseInt(item2["Mass, g"]);
      item.weight = gruppeWeight;
      
      //Wert des Fundes durch Marktwert pro gramm und Gewicht des Fundes berechnen
      item2.price = item.gPrice * parseInt(item2["Mass, g"]);
      
      //Gesamtwert der Gruppe aus einzelnen Funden berechnen
      gruppePrice = gruppePrice + item2.price;
      item.price = gruppePrice;
    });
    
    maxWeight = maxWeight + item.weight;
    maxPrice = maxPrice + item.price;
  });
  
  allData.meteorit.sort(function(a,b) {
    return a["Type of meteorite"].localeCompare(b["Type of meteorite"]);
  })
  
  
  var barHeight = 50;
  var barGap = 90;
  var barEntryGap = 5;
  var extendBar = 1;
  
  var svg = d3.select('body').append('svg').attr('id', 'container');
  var color = d3.scale.category10();
  
  var scaleCount = d3.scale.linear()
    .domain([0, maxCount])
    .range([0, 1000]);
    
  var scaleWeight = d3.scale.linear()
    .domain([0, maxWeight])
    .range([0, 1000]);
  
  var scalePrice = d3.scale.linear()
    .domain([0, maxPrice])
    .range([0, 1000]);
      
  allData.countOffset = 0;
  allData.weightOffset = 0;
  allData.priceOffset = 0;
  
  
  //Append Connections Gruppe damit sie hinter allen anderen ist
  svg.append("g").attr("id", "connections");
  
  
  //erster Balken (Anzahl der gefundenen Meteoriten pro Typ)
  svg.append("g").attr("id", "count").selectAll('rect').data(allData.keyword).enter()
    .append('rect')
    .attr("width", function(d,i) { return scaleCount(d.records.length); })
    .attr("height", barHeight)
    .attr("x", function(d,i) { 
      d.x1 = allData.countOffset+barEntryGap;
      d.x2 = allData.countOffset + scaleCount(d.records.length)+barEntryGap;
      allData.countOffset = allData.countOffset + scaleCount(d.records.length)+barEntryGap;
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
    .attr("width", function(d,i) { return scaleWeight(d.weight); })
    .attr("height", barHeight)
    .attr("x", function(d,i) { 
      d.x1 = allData.weightOffset+barEntryGap;
      d.x2 = allData.weightOffset + scaleWeight(d.weight)+barEntryGap;
      allData.weightOffset = allData.weightOffset + scaleWeight(d.weight)+barEntryGap;
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
    .attr("width", function(d,i) { return scalePrice(d.price); })
    .attr("height", barHeight)
    .attr("x", function(d,i) { 
      d.x1 = allData.priceOffset+barEntryGap;
      d.x2 = allData.priceOffset + scalePrice(d.price)+barEntryGap;
      allData.priceOffset = allData.priceOffset + scalePrice(d.price)+barEntryGap;
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
    for(var i = 0; i < allData.keyword.length; i++) {
      var connections = d3.selectAll(".id"+i);
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

var meteors = null;

var click = function(d,i) {
  
  var positionJSON = new Array();
  d.records.forEach(function(array, index) {
    positionJSON.push({ 'lon': array["Coordinate 1"], 'lat': array["Coordinates 2"]})
  })
  
  
  if (meteors) {
    meteors.clearLayers();
  }
  
  // console.log(positionJSON);
  

  var customIcon = new L.Icon( {
    iconUrl: 'img/forest-marker.png',
    iconSize: [53, 57],
    iconAnchor: [27, 51],
    popupAnchor: [0, 0],
    shadowUrl: 'img/forest-marker-shadow.png',
    shadowSize: [99, 57],
    shadowAnchor: [27, 51]
  });

  // console.log(positionJSON);
  var markerList = [];
  for(i=0;i<positionJSON.length;i++){
  	markerList.push(L.marker([positionJSON[i].lon,positionJSON[i].lat]));
  }
  
  meteors = L.layerGroup(markerList).addTo(map);
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