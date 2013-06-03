##                                                                           ##
#                                                                             #
# The detail view.                                                            #
#                                                                             #
# Paul Vollmer <paul.vollmer@fh-potsdam.de>                                   #
#                                                                             #
##                                                                           ##



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
  divHelper.text('')
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
        .text(id)

      d3.select('#modal-classification-total')
        .text('Total: '+classification[j].total)
      d3.select('#modal-classification-total-fell')
        .text('Fell: '+classification[j].totalFell)
      d3.select('#modal-classification-total-found')
        .text('Found: '+classification[j].totalFound)

      d3.select('#modal-classification-desc')
        .text(classification[j].desc)
      

  tmpRectsRow = 100
  tmpRectWidth = 9
  tmpRectHeight = 9
  tmpRectPosX = 0
  tmpRectPosY = 0
  tmpRectCnt = 0



  # calculate the svg size
  tmpSvgWidth = tmpRectsRow*(tmpRectWidth+1)
  tmpSvgHeight = (tmpRectHeight+1)*(classification[tmpIdValue].total/tmpRectsRow)


  tmpSvg = d3.select('#modal-svg-container')
             .append('svg')
             .attr('width', tmpSvgWidth)
             .attr('height', tmpSvgHeight)
             .attr('id', 'modal-svg')
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
