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
  

# Get a list of all cities 
exports.callApi = callApi = () ->
  request api.url.cities, (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)

      i = 0
      while i < json.data.length-10
        tmp = json.data[i]
        console.log tmp

      data.list = json.data
      utils.log2 'requestCitiesData() -> ', 'cities Ready'
