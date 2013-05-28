var allData = allData || {};
var groupData = groupData || {};
jQuery(document).ready(function() { 

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
  
  console.log(allData);
  document.write(JSON.stringify(allData.keyword));
}
