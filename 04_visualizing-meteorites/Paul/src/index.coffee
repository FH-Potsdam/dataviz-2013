##                                                                           ##
#                                                                             #
# This is our Main Script                                                     #
#                                                                             #
# Paul Vollmer <paul.vollmer@fh-potsdam.de>                                   #
#                                                                             #
##                                                                           ##



##
# Constant variables
##
ID_CONTENT = '#content'

##
# Loading dataset
# The dataset was converted to JSON with Mr. Data Converter.
##
METEORITES_DATA = []
METEORITES_DATAPATH = './data/meteorites.csv'

d3.csv(METEORITES_DATAPATH, (error, data)->
  if error
    console.log 'Loading Error:'
    console.log error
  else
    METEORITES_DATA = data
    #console.log 'JSON Data Loaded:'
    #console.log METEORITES_DATA
    


    ##
    # Small helper for the classification object
    ##

    # classCounter = (str) ->
    #   tmpCount = 0
    #   tmpIds = []

    #   classificationHelper = (i) ->
    #     #if METEORITES_DATA[i].recclass.indexOf(str) isnt -1
    #     if METEORITES_DATA[i].recclass == str
    #       tmpCount++
    #       tmpIds.push(i)
    #     'classificationHelper'

    #   classificationHelper(_i) for name in METEORITES_DATA

    #   console.log 'NAME: ' + str
    #   console.log 'tmpCount = ' + tmpCount
    #   console.log 'tmpIds = ' + tmpIds


    # classCounter('CK6')




    # Run the viz.
    viz()

    'loading ready'  
)
