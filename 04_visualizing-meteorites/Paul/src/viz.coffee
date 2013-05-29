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
  # Print out one object from the dataset.
  # Used for debugging stuff
  #console.log METEORITES_DATA[0]


  for i of classification
    classificationItemDivHeadline(classification[i], i)
    classificationItemSvg(classification[i], i, 'red')
  

  tmpLog = 'Visualisation was created'
  console.log tmpLog
  tmpLog
