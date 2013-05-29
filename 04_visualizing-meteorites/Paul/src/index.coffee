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
    

    # Run the viz.
    viz()

    'loading ready'  
)
