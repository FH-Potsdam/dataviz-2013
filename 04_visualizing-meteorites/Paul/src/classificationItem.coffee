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
    .attr('class', 'classification-label-text tooltip')
    #.attr('class', 'classification-label-count tooltip')
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
    # the tooltip content
    #.append('span')
    #.text(obj.desc)

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




divHelper = d3.select('#modalDialog-tooltip-space')


mouseoverHelper = (obj) ->
  console.log 'mouse over'
  divHelper.text('Fall = '+obj.fall+', Mass = '+obj.mass+', Name = '+obj.name+', Year = '+obj.year)
           # .style("left", (d3.event.pageX - 34) + "px")
           # .style("top", (d3.event.pageY - 12) + "px");
  

mousemovedHelper = (obj) ->
  console.log 'mouse moved'
  divHelper.text('Fall = '+obj.fall+', Mass = '+obj.mass+', Name = '+obj.name+', Year = '+obj.year)
           # .style("left", (d3.event.pageX - 34) + "px")
           # .style("top", (d3.event.pageY - 12) + "px");

mouseoutHelper = (obj) ->
  console.log 'mouse out'
  # d3.select('#modalDialog-tooltip-space')
  #   .remove()

mousedownHelper = (obj) ->
  #console.log 'mouse down'
  #console.log obj
  # Link to the database
  # _newtab only works for chrome and firefox...
  window.open('http://www.lpi.usra.edu/meteor/metbull.php?code='+Math.floor(obj.id), '_newtab');



classificationItemSvgBig = (id) ->
  console.log 'draw classificationItemSvgBig() = '+id

  
  tmpIdValue = 0;
  for j of classification
    if classification[j].name == id
      tmpIdValue = j
      #console.log 'TREFFER!!! -  ' + tmpIdValue
      #console.log classification[j]

      d3.select('#modal-classification')
        .text(id + ' (' + classification[j].total + ')')
      d3.select('#modal-classification-desc')
        .text(classification[j].desc)
      

  tmpRectsRow = 100
  tmpRectWidth = 9
  tmpRectHeight = 4
  #tmpRectSize = 20
  tmpRectPosX = 0
  tmpRectPosY = 0
  tmpRectCnt = 0



  # calculate the svg size
  tmpSvgWidth = tmpRectsRow*(tmpRectWidth+1)
  tmpSvgHeight = (tmpRectHeight+1)*(classification[tmpIdValue].total/tmpRectsRow)


  tmpSvg = d3.select('#modal-svg')
             .attr('width', tmpSvgWidth)
             .attr('height', tmpSvgHeight)
             .append('g')

  k = 0
  while k < classification[tmpIdValue].total
    #tmpId = classification[tmpIdValue].rows[k]
    #console.log tmpId

    tmpRectPosX +=tmpRectWidth+1
    if tmpRectCnt == tmpRectsRow
      tmpRectPosX = 0+tmpRectWidth+1
      tmpRectPosY += tmpRectHeight+1
      tmpRectCnt = 0

    if METEORITES_DATA[classification[tmpIdValue].rows[k]].fall == 'Fell'
      tmpSvg.append('rect')
            .attr('x', tmpRectPosX)
            .attr('y', tmpRectPosY)
            .attr('width', tmpRectWidth)
            .attr('height', tmpRectHeight)
            .attr('class', 'fell')
            .attr('id', classification[tmpIdValue].rows[k])
            .on("mouseover", ->
              mouseoverHelper(METEORITES_DATA[ this.id ])
              )
            .on("mousemove", ->
              mousemovedHelper(METEORITES_DATA[ this.id ])
              )
            .on("mouseout", ->
              mouseoutHelper(METEORITES_DATA[ this.id ])
              )
            .on('mousedown', ->
              mousedownHelper(METEORITES_DATA[ this.id ])
              )

    else
      tmpSvg.append('rect')
            .attr('x', tmpRectPosX)
            .attr('y', tmpRectPosY)
            .attr('width', tmpRectWidth)
            .attr('height', tmpRectHeight)
            .attr('class', 'found')
            .attr('id', classification[tmpIdValue].rows[k])
            .on("mouseover", ->
              mouseoverHelper(METEORITES_DATA[ this.id ])
              )
            .on("mousemove", ->
              mousemovedHelper(METEORITES_DATA[ this.id ])
              )
            .on("mouseout", ->
              mouseoutHelper(METEORITES_DATA[ this.id ])
              )
            .on('mousedown', ->
              mousedownHelper(METEORITES_DATA[ this.id ])
              )


    k++
    tmpRectCnt++
    
  
