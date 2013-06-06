###
Helper app for the Startnext API to generate a json files for the Startnext Viz.

@version   0.0.1
@author    Paul Vollmer <paul.vollmer@fh-potsdam.de>@author
###


# Node.js modules
request = require 'request'
express = require 'express'
app = express()

# CORS middleware
app.use express.methodOverride()

# see: http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
allowCrossDomain = (req, res, next) ->
  res.header "Access-Control-Allow-Origin", "*"
  res.header "Access-Control-Allow-Methods", "GET,PUT,POST,DELETE"
  res.header "Access-Control-Allow-Headers", "Content-Type, Authorization"
  
  # intercept OPTIONS method
  if "OPTIONS" is req.method
    res.send 200
  else
    next()

app.use allowCrossDomain


# The Startnext module 
startnext = require './startnext'
# Print out the API resources (debugging stuff)
# console.log startnext.api.url.base
# console.log startnext.api.url.projects
# console.log startnext.api.url.categories
# console.log startnext.api.url.search
# console.log startnext.api.url.search_projects
# console.log startnext.api.url.search_projects_category



getHelperText = (res, data) ->
  body = data
  res.setHeader 'Content-Type', 'text/plain'
  res.setHeader 'Content-Length', body.length
  res.end body

getHelperJSON = (res, data) ->
  body = data
  res.setHeader 'Content-Type', 'application/json'
  res.setHeader 'Content-Length', body.length
  res.end body


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# About and Ping
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

# Short about text
app.get '/', (req, res) ->
  getHelperText(res, 'This is the Startnext Visualisation helper to generate missing API features.')
  
# Test ping to check the app
app.get '/ping', (req, res) ->
  getHelperText(res, 'pong')



# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# Category counter
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

# Startnext categories object
categoriesActive =
  last_update: 
    year: null
  data:
    total: null


# Totally WIP
#
# Crawl the categories data we need
# Categories object can be grabbed from API resource:
# https://api.startnext.de/v1/categories
#
# TODO: Don't repeat ypurself
getCategoriesActive = () ->
  #console.log 'Start getCategoriesActive()'

  # Time checker
  currentDate = new Date()
  categoriesActive.last_update.year = currentDate.getFullYear()
  categoriesActive.last_update.month = currentDate.getMonth()
  categoriesActive.last_update.day = currentDate.getDay()
  categoriesActive.last_update.hour = currentDate.getHours()
  categoriesActive.last_update.minute = currentDate.getMinutes()
  categoriesActive.last_update.second = currentDate.getSeconds()

  
  # Get the active categories
  request startnext.api.url.search_projects_category, (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      categoriesActive.data.total = json.count

  request startnext.api.url.search_projects_category+'comic', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      categoriesActive.data.comic = json.count

  request startnext.api.url.search_projects_category+'design', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      categoriesActive.data.design = json.count

  request startnext.api.url.search_projects_category+'invention', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      categoriesActive.data.invention = json.count

  request startnext.api.url.search_projects_category+'event', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      categoriesActive.data.event = json.count

  request startnext.api.url.search_projects_category+'movie', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      categoriesActive.data.movie = json.count

  request startnext.api.url.search_projects_category+'photography', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      categoriesActive.data.photography = json.count

  request startnext.api.url.search_projects_category+'games', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      categoriesActive.data.games = json.count

  request startnext.api.url.search_projects_category+'audio-drama', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      categoriesActive.data.audio_drama = json.count

  request startnext.api.url.search_projects_category+'information', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      categoriesActive.data.information = json.count
  
  request startnext.api.url.search_projects_category+'journalism', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      categoriesActive.data.journalism = json.count

  request startnext.api.url.search_projects_category+'cultural-education', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      categoriesActive.data.cultural_education = json.count
  
  request startnext.api.url.search_projects_category+'art', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      categoriesActive.data.art = json.count

  request startnext.api.url.search_projects_category+'literature', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      categoriesActive.data.literature = json.count
  
  request startnext.api.url.search_projects_category+'fashion', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      categoriesActive.data.fashion = json.count

  request startnext.api.url.search_projects_category+'music', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      categoriesActive.data.music = json.count

  request startnext.api.url.search_projects_category+'technology', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      categoriesActive.data.technology = json.count
  
  request startnext.api.url.search_projects_category+'theater', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      categoriesActive.data.theater = json.count
  

# run the function at launch.
# (First request call)
getCategoriesActive()

# create the json...
app.get '/categories_active', (req, res) ->
  getHelperJSON(res, JSON.stringify(categoriesActive))

  # Check the date.
  # If the data is too old, call the API for new data.
  curTime = new Date()
  if curTime.getFullYear() is categoriesActive.last_update.year and
  curTime.getMonth() is categoriesActive.last_update.month and
  curTime.getDay() is categoriesActive.last_update.day and
  curTime.getHours() is categoriesActive.last_update.hour
    console.log 'categories_active -> Data up to date'
  else
    console.log 'categories_active -> We need new data for the next app.get call'
    getCategoriesActive()


# TODO: crawl all projects to get this data
# app.get '/categories_total', (req, res) ->
#   getHelperText(res, '{"data": {}}')



# Start listen express.js
port = process.env.PORT or 5000
app.listen port, ->
  console.log 'Listening on ' + port
