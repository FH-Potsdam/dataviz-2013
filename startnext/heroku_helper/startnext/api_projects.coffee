###
Request Startnext projects data.

@author Paul Vollmer <paul.vollmer@fh-potsdam.de>
###

# Module dependencies.
request = require 'request'
api = require './api_constants'
utils = require './utils'


# The data object
exports.data = data =
	total: null
	status_active: null
	status_started: null
	#status_finished: null
  #status_succesful: null
  #status_unsuccesful: null


# Docs: http://doc.startnext.de/doku.php?id=cf_api_v1.1#projektstatus 
exports.callApi = callApi = () ->
  
  # # Get the total number of projects
  request api.url.search_projects, (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.total = json.count
      utils.log2 'requestProjectsData() -> ', 'total Ready'

  request api.url.search_projects_status+'active', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.status_active = json.count
      utils.log2 'requestProjectsData() -> ', 'status_active Ready'

  request api.url.search_projects_status+'started', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.status_started = json.count
      utils.log2 'requestProjectsData() -> ', 'status_started Ready'
