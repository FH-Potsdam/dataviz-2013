##                                                                           ##
#                                                                             #
# This is our Main Script                                                     #
#                                                                             #
# Paul Vollmer <paul.vollmer@fh-potsdam.de>                                   #
#                                                                             #
##                                                                           ##



##
# Variables
##
timer = 2000
timerSteps = 500



# Run the intro
intro()


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

    # Print out one object from the dataset.
    # Used for debugging stuff
    #console.log METEORITES_DATA[0]
    
    # Draw the Visualisation
    overview(classification)
    # or with timeout...
    #window.setTimeout ( ->
    #  overview(classification)
    #), timer

    'loading ready'  
)
