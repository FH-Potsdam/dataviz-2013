###
Request Startnext cities data.

@author Paul Vollmer <paul.vollmer@fh-potsdam.de>
###

# Module dependencies.
request = require 'request'
api     = require './api_constants'
utils   = require './utils'
async   = require 'async'


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
        data[i] =
          name: json.data[i]
          count: null
        i++

      utils.log2 'requestCitiesData() -> ', 'cities Ready'


    # Loop the cities to get more informations (Search projects with filter city)
    fetch = (file, cb) ->
      request.get api.url.search_projects_city+file, (err, response, body) ->
        if err
          cb err
        else
          #utils.log2 'request city -> ', file
          cb null, body # First param indicates error, null=> no error

    # Async stuff...
    async.map json.data, fetch, (err, results) ->
      if err
        utils.log1 err
      else
        r = 0
        while r < results.length
          tmpJson = JSON.parse(results[r])
          data[r].count = tmpJson.count
          #console.log data[r].name + ' --- ' + data[r].count
          r++
        utils.log1 'requestCities -> Ready'

        
