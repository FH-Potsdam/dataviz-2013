###
Request Startnext cities data.

@author Paul Vollmer <paul.vollmer@fh-potsdam.de>
###

# Module dependencies.
request = require 'request'
api = require './api_constants'
utils = require './utils'


# The data object
exports.data = data =
  total: null
  

# Get a list of all cities 
exports.callApi = callApi = () ->
  request api.url.cities, (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.total = json.data.length

      i = 0
      while i < json.data.length
        console.log '['+i+'] ' + json.data[i]
        data[i] =
          name: json.data[i]
          count: null
        i++

      utils.log2 'requestCitiesData() -> ', 'cities Ready'

    # Loop the cities to get more informations
    # j = 0
    # tmpRun = 0 # work around to save the current data.name
    # while j < data.total
    #   # Search projects from this city
    #   request api.url.search_projects_city+json.data[j], (error, response, body) ->
    #     if not error and response.statusCode is 200
    #       json2 = JSON.parse(body)
    #       data[tmpRun].count = json2.count
    #       console.log '['+tmpRun+'] ' + json2.count
    #       tmpRun++
    #   j++

