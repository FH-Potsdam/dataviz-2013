###
Request Startnext categories data.

@author Paul Vollmer <paul.vollmer@fh-potsdam.de>
###

# Module dependencies.
request = require 'request'
api = require './api_constants'
utils = require './utils'


# The data object
# Categories object grabbed from API resource: https://api.startnext.de/v1/categories
exports.data = data =
  total: null
  art: null
  audio_drama: null
  cultural_education: null
  comic: null
  design: null
  event: null
  fashion: null
  games: null
  information: null
  invention: null
  journalism: null
  literature: null
  movie: null
  music: null
  photography: null
  technology: null
  theater: null
  

# Request the active categories data
exports.callApi = callApi = () ->
  
  request api.url.search_projects_category, (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.total = json.count
      utils.log2 'requestCategoriesActive() -> ', 'total Ready'

  request api.url.search_projects_category+'comic', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.comic = json.count
      utils.log2 'requestCategoriesActive() -> ', 'comic Ready'

  request api.url.search_projects_category+'design', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.design = json.count
      utils.log2 'requestCategoriesActive() -> ', 'design Ready'

  request api.url.search_projects_category+'invention', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.invention = json.count
      utils.log2 'requestCategoriesActive() -> ', 'invention Ready'

  request api.url.search_projects_category+'event', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.event = json.count
      utils.log2 'requestCategoriesActive() -> ', 'event Ready'

  request api.url.search_projects_category+'movie', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.movie = json.count
      utils.log2 'requestCategoriesActive() -> ', 'movie Ready'

  request api.url.search_projects_category+'photography', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.photography = json.count
      utils.log2 'requestCategoriesActive() -> ', 'photography Ready'

  request api.url.search_projects_category+'games', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.games = json.count
      utils.log2 'requestCategoriesActive() -> ', 'games Ready'

  request api.url.search_projects_category+'audio-drama', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.audio_drama = json.count
      utils.log2 'requestCategoriesActive() -> ', 'audio_drama Ready'

  request api.url.search_projects_category+'information', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.information = json.count
      utils.log2 'requestCategoriesActive() -> ', 'information Ready'
  
  request api.url.search_projects_category+'journalism', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.journalism = json.count
      utils.log2 'requestCategoriesActive() -> ', 'journalism Ready'

  request api.url.search_projects_category+'cultural-education', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.cultural_education = json.count
      utils.log2 'requestCategoriesActive() -> ', 'cultural_education Ready'
  
  request api.url.search_projects_category+'art', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.art = json.count
      utils.log2 'requestCategoriesActive() -> ', 'art Ready'

  request api.url.search_projects_category+'literature', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.literature = json.count
      utils.log2 'requestCategoriesActive() -> ', 'literature Ready'
  
  request api.url.search_projects_category+'fashion', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.fashion = json.count
      utils.log2 'requestCategoriesActive() -> ', 'fashion Ready'

  request api.url.search_projects_category+'music', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.music = json.count
      utils.log2 'requestCategoriesActive() -> ', 'music Ready'

  request api.url.search_projects_category+'technology', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.technology = json.count
      utils.log2 'requestCategoriesActive() -> ', 'technology Ready'
  
  request api.url.search_projects_category+'theater', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.theater = json.count
      utils.log2 'requestCategoriesActive() -> ', 'theater Ready'

  # Count the requested categories data after one minute.
  # This is only used for console output
  setTimeout (->
    totalCount = data.art
    totalCount += data.audio_drama
    totalCount += data.cultural_education
    totalCount += data.comic
    totalCount += data.design
    totalCount += data.event
    totalCount += data.fashion
    totalCount += data.games
    totalCount += data.information
    totalCount += data.invention
    totalCount += data.journalism
    totalCount += data.literature
    totalCount += data.movie
    totalCount += data.music
    totalCount += data.photography
    totalCount += data.technology
    totalCount += data.theater
    
    utils.log2 'Calculated categories total = ', totalCount
  ), 100000
