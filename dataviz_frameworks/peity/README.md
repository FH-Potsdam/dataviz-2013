# Peity
Progressive ```<canvas>``` bar, line and pie charts

"Peity (sounds like deity) is a simple jQuery plugin that converts an element's content into a simple mini canvas pie, line or bar chart."

Peity is really lightweight.Uncompressed 6.4Kb  Minified 3.0Kb  

### Pie Charts
HTML  ```
<span class=“pie“>1/5</span>
```JavaScript  
```$(“span.pie“).peity(“pie“);
```

### Line Charts
HTML  ```
<span class=“line“>5,3,9,6,5,9</span>
```JavaScript  ```
$(“.line“).peity(“line“);
```

### Bar Charts
HTML  ```
<span class=“bar“>5,3,9,6,5,9</span>
```JavaScript  ```$(“.bar“).peity(“bar“)
```

### Customize
colours, diameter, min, max, width, height…  

**Customize diameter**  
HTML  
```<span class=“pie“ data-diameter=“100“>1/5</span>
```JavaScript  
```$(“span.pie“).peity(“pie“);
```

**Customize colours**  
HTML  
```<span class=“pie“ data-colours=“['red', 'blue']“>1/5</span>
```JavaScript  ```
$(“span.pie“).peity(“pie“);
```
… or …  
HTML  ```
<span class=“pie“>1/5</span>
```JavaScript  ```
$(“.pie“).peity(“pie“, {  colours: [“red“, “blue“]});
```
