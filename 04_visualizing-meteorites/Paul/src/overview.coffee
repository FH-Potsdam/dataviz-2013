##                                                                           ##
#                                                                             #
# The overview.                                                               #
#                                                                             #
# Paul Vollmer <paul.vollmer@fh-potsdam.de>                                   #
#                                                                             #
##                                                                           ##



##
# Create the overview.
# Draw all classification items (Div's and SVG's)
##
overview = ->
	console.log 'Run overview()'

	for i of classification
    classificationItemDivHeadline(classification[i], i)
    classificationItemSvg(classification[i], i, 'red')



# modalHelper = "javascript:
modalHelper = "javascript:classificationItemSvgBig(this.id);"



##
# The classification name and total value
##
classificationItemDivHeadline = (obj, id) ->
  # Debugging stuff
  # console.log 'name  = ' + obj.name
  # console.log 'desc  = ' + obj.desc
  # console.log 'class = ' + obj.class
  # console.log 'total = ' + obj.total
  # console.log 'rows  = ' + obj.rows

  # create a div
  d3.select('#'+obj.class)
    .append('div')
    .attr('class', 'classification-label')
    .attr('id', id)

  # the name
  d3.select('#'+id)
    .append('a')
    .attr('href' ,'#openModal')
    .attr('class', 'classification-label-text tooltip')
    .attr('id', obj.name)
    .attr('onclick', modalHelper)
    .text(obj.name+' ')
    # the tooltip content
    .append('span')
    .text(obj.desc)

  # the count
  d3.select('#'+id)
    .append('a')
    .attr('href' ,'#')
    .attr('class', 'classification-label-count')
    .text(obj.total)

  d3.select('#'+id)
    .append('br')



##
# The classification item SVG
##
classificationItemSvg = (obj, id) ->
  # calculate the svg size
  tmpSvgWidth = RECT_SIZE_WITH_MARGIN*TOTAL_RECTS_ROW
  tmpSvgHeight = RECT_SIZE_WITH_MARGIN
  if obj.total >= TOTAL_RECTS_ROW
    tmpRows = obj.total/TOTAL_RECTS_ROW
    tmpSvgHeight = RECT_SIZE_WITH_MARGIN*tmpRows

  # create the svg object
  tmpSvg = d3.select('#'+id)

             .append('a')
             .attr('href', '#openModal')
             .attr('id', obj.name)
             .attr('onclick', modalHelper)
             
             .append('svg')
             .attr('width', tmpSvgWidth)
             .attr('height', tmpSvgHeight)
             


  tmpRectX = 0
  tmpRectY = 0
  tmpRectsCount = 0
  i = 0
  while i < obj.total
    tmpRectX += RECT_SIZE_WITH_MARGIN
    if tmpRectsCount == TOTAL_RECTS_ROW
      tmpRectX = RECT_SIZE_WITH_MARGIN
      tmpRectY += RECT_SIZE_WITH_MARGIN
      tmpRectsCount = 0

    
    if METEORITES_DATA[obj.rows[i]].fall == 'Fell'
      tmpSvg.append('rect')
         .attr('x', tmpRectX)
         .attr('y', tmpRectY)
         .attr('width', RECT_SIZE)
         .attr('height', RECT_SIZE)
         .attr('class', 'fell')
    else
      tmpSvg.append('rect')
         .attr('x', tmpRectX)
         .attr('y', tmpRectY)
         .attr('width', RECT_SIZE)
         .attr('height', RECT_SIZE)
         .attr('class', 'found')

    i++
    tmpRectsCount++
