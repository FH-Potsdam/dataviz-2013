##                                                                           ##
#                                                                             #
# Create a classification item javascript class                               #
#                                                                             #
# Paul Vollmer <paul.vollmer@fh-potsdam.de>                                   #
#                                                                             #
##                                                                           ##


modalHelper = "javascript:
document.getElementById('modal-svg').style.display='show';
classificationItemSvgBig(this.id);"


classificationItemDivHeadline = (obj, id) ->
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
    .attr('class', 'classification-label-text')
    #.attr('id', id+"__a")
    .attr('id', obj.name)
    .attr('onclick', modalHelper)
    .text(obj.name+' ')


  # the count
  d3.select('#'+id)
    .append('a')
    .attr('href' ,'#')
    .attr('class', 'classification-label-count tooltip')
    .text(obj.total)
    # the tooltip content
    .append('span')
    .text(obj.desc)

  d3.select('#'+id)
    .append('br')



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
         .attr('fill', RECT_COLOR_FELL)
    else
      tmpSvg.append('rect')
         .attr('x', tmpRectX)
         .attr('y', tmpRectY)
         .attr('width', RECT_SIZE)
         .attr('height', RECT_SIZE)
         .attr('fill', RECT_COLOR_FOUND)

    i++
    tmpRectsCount++


mouseoverHelper = (obj) ->
  console.log obj.name

classificationItemSvgBig = (id) ->
  console.log 'draw classificationItemSvgBig() = '+id

  
  tmpIdValue = 0;
  for j of classification
    if classification[j].name == id
      tmpIdValue = j
      console.log 'TREFFER!!! -  ' + tmpIdValue
      console.log classification[j]
      d3.select('#modal-classification')
        .text(id + ' -- ' + classification[j].total)
      

  tmpRectsRow = 50
  tmpRectSize = 20
  tmpRectPosX = 0
  tmpRectPosY = 0
  tmpRectCnt = 0

  tmpSvg = d3.select('#modal-svg')
             .append('g')

  k = 0
  while k < classification[tmpIdValue].total
    tmpRectPosX +=tmpRectSize+1
    if tmpRectCnt == tmpRectsRow
      tmpRectPosX = 0+tmpRectSize+1
      tmpRectPosY += tmpRectSize+1
      tmpRectCnt = 0

    if METEORITES_DATA[classification[tmpIdValue].rows[k]].fall == 'Fell'
      tmpSvg.append('rect')
            .attr('x', tmpRectPosX)
            .attr('y', tmpRectPosY)
            .attr('width', tmpRectSize)
            .attr('height', tmpRectSize)
            .attr('fill', RECT_COLOR_FELL)
            # .on('mouseover', ->
            #   mouseoverHelper(METEORITES_DATA[classification[tmpIdValue].ids[k]]) )
    else
      tmpSvg.append('rect')
            .attr('x', tmpRectPosX)
            .attr('y', tmpRectPosY)
            .attr('width', tmpRectSize)
            .attr('height', tmpRectSize)
            .attr('fill', RECT_COLOR_FOUND)
            # .on('mouseover', ->
            #   mouseoverHelper(METEORITES_DATA[classification[tmpIdValue].ids[k]]) )


    k++
    tmpRectCnt++
    
  
