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
  featured: null
  successful: null
  unsuccessful: null
  ending_soon: null
  success_stories: null
  most_viewed: null
  new: null


# Docs: http://doc.startnext.de/doku.php?id=cf_api_v1.1#projektstatus 
exports.callApi = callApi = () ->
  
  # Get the total number of projects
  request api.url.search_projects, (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.total = json.count
      utils.log2 'projects -> ', 'total ('+data.total+') Ready'

  # Get all active projects
  request api.url.search_projects_status+'active', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.status_active = json.count
      utils.log2 'projects -> ', 'status_active ('+data.status_active+') Ready'

  # Get all started projects
  request api.url.search_projects_status+'started', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.status_started = json.count
      utils.log2 'projects -> ', 'status_started ('+data.status_started+') Ready'
  
  # Get all projects featured by Startnext
  request api.url.search_projects_criterion+'featured', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.featured = json.count
      utils.log2 'projects -> ', 'featured ('+data.featured+') Ready'

  # Get all Successful projects
  request api.url.search_projects_criterion+'successful', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.successful = json.count
      utils.log2 'projects -> ', 'successful ('+data.successful+') Ready'

  # Get all projects ending soon
  request api.url.search_projects_criterion+'ending-soon', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.ending_soon = json.count
      utils.log2 'projects -> ', 'ending_soon ('+data.ending_soon+') Ready'

  request api.url.search_projects_criterion+'success-stories', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.success_stories = json.count
      utils.log2 'projects -> ', 'success_stories ('+data.success_stories+') Ready'

  request api.url.search_projects_criterion+'most-viewed', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.most_viewed = json.count
      utils.log2 'projects -> ', 'most_viewed ('+data.most_viewed+') Ready'

  request api.url.search_projects_criterion+'new', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.new = json.count
      utils.log2 'projects -> ', 'new ('+data.new+') Ready'

  # Wait 30 seconds to calc the unsuccessful value.
  setTimeout (->
    data.unsuccessful = data.total - data.successful - data.status_active
    utils.log2 'projects -> ', 'unsuccessful ('+data.unsuccessful+') Ready'
  ), 30000
  