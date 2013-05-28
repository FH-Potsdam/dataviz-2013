
# Width and height
w = 314
h = 314

# Create SVG element
svg = d3.select('#content')
        .append('svg')
        .attr('width', w)
        .attr('height', h)

# Create a function called chart
chart = ->
  svg.append('circle')
     .attr('cx', w/2)
     .attr('cy', h/2)
     .attr('r', 100)
     .attr('fill', 'red')

chart()
