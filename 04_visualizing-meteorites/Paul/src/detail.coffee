##                                                                           ##
#                                                                             #
# The detail view.                                                            #
#                                                                             #
# Paul Vollmer <paul.vollmer@fh-potsdam.de>                                   #
#                                                                             #
##                                                                           ##



##
# The detail view main function
##
detailView = (id) ->
  console.log 'detailView id = ' + id

  # Save the current detail view id
  currentId = 0

  # Search the id...
  for j of classification
    if classification[j].name == id
      currentId = j
      console.log 'TREFFER!!! -  ' + currentId
      console.log classification[j]

  detailViewUpdateInfos(id, currentId)
  detailViewSvg(id, currentId)



##
# Update the detail view information
##
detailViewUpdateInfos = (id, curId) ->
  d3.select('#modal-classification')
    .text(id)

  d3.select('#modal-classification-total')
    .text('Total: '+classification[curId].total)
  d3.select('#modal-classification-total-fell')
    .text('Fell: '+classification[curId].totalFell)
  d3.select('#modal-classification-total-found')
    .text('Found: '+classification[curId].totalFound)

  d3.select('#modal-classification-desc')
    .text(classification[curId].desc)



##
# Draw the detail view SVG
##
detailViewSvg = (id, curId) ->
  divHelper = d3.select('#modalDialog-tooltip-space')


  mouseoverHelper = (obj) ->
    console.log 'mouse over'
    

    offset = $('#modal-svg-container').offset()
    divHelper.style("left", (d3.event.pageX-offset.left+20) + "px")
             .style("top", (d3.event.pageY-offset.top+40) + "px");

    # remove the old info tag
    divHelper.select('#current_info')
             .remove()

    divHelper.append('div')
             .attr('id', 'current_info')

    d3.select('#current_info')
      .append('span')
      .text('Name: ')
      .append('span')
      .attr('id', 'current_info_name')
      .text(obj.name)
      .append('br')

    d3.select('#current_info')
      .append('span')
      .text('Mass: ')
      .append('span')
      .attr('id', 'current_info_mass')
      .text(obj.mass+'g')
      .append('br')

    d3.select('#current_info')
      .append('span')
      .text('Year: ')
      .append('span')
      .attr('id', 'current_info_year')
      .text(Math.floor(obj.year))
      .append('br')
    

  mousedownHelper = (obj) ->
    #console.log 'mouse down'
    #console.log obj
    # Link to the database
    # _newtab only works for chrome and firefox...
    window.open('http://www.lpi.usra.edu/meteor/metbull.php?code='+Math.floor(obj.id), '_newtab');



  # some variables
  tmpRectsRow = 100
  tmpRectWidth = 9
  tmpRectHeight = 9
  tmpRectPosX = 0
  tmpRectPosY = 0
  tmpRectCnt = 0


  # calculate the svg size
  tmpSvgWidth = tmpRectsRow*(tmpRectWidth+1)
  tmpSvgHeight = (tmpRectHeight+1)*(classification[curId].total/tmpRectsRow)


  tmpSvg = d3.select('#modal-svg-container')
             .append('svg')
             .attr('width', tmpSvgWidth)
             .attr('height', tmpSvgHeight)
             .attr('id', 'modal-svg')

  k = 0
  while k < classification[curId].total
    #tmpId = classification[curId].rows[k]
    #console.log tmpId

    tmpRectPosX +=tmpRectWidth+1
    if tmpRectCnt == tmpRectsRow
      tmpRectPosX = 0+tmpRectWidth+1
      tmpRectPosY += tmpRectHeight+1
      tmpRectCnt = 0

    if METEORITES_DATA[classification[curId].rows[k]].fall == 'Fell'
      tmpSvg.append('rect')
            .attr('x', tmpRectPosX)
            .attr('y', tmpRectPosY)
            .attr('width', tmpRectWidth)
            .attr('height', tmpRectHeight)
            .attr('class', 'fell-big')
            .attr('id', classification[curId].rows[k])
            .on("mouseover", ->
              mouseoverHelper(METEORITES_DATA[ this.id ])
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
            .attr('class', 'found-big')
            .attr('id', classification[curId].rows[k])
            .on("mouseover", ->
              mouseoverHelper(METEORITES_DATA[ this.id ])
              )
            .on('mousedown', ->
              mousedownHelper(METEORITES_DATA[ this.id ])
              )

    k++
    tmpRectCnt++
