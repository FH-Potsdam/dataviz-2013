##                                                                           ##
#                                                                             #
# Draw the Visualisation                                                      #
#                                                                             #
# Paul Vollmer <paul.vollmer@fh-potsdam.de>                                   #
#                                                                             #
##                                                                           ##



##
# The main viz function.
##
viz = ->
  #console.log METEORITES_DATA[0]


  for i of classification
    classificationItemDivHeadline(classification[i], i)
    classificationItemSvg(classification[i], i, 'red')
    
  #classificationItemSvgBig()


  tmpLog = 'Visualisation was created'
  console.log tmpLog
  tmpLog
