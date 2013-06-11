###
Helper app for the Startnext API to generate a json files for the Startnext Viz.

@version   0.0.1
@author    Paul Vollmer <paul.vollmer@fh-potsdam.de>@author
###


# Node.js modules
request = require 'request'
express = require 'express'
startnext = require './startnext'


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


responseText = (res, data) ->
  body = data
  res.setHeader 'Content-Type', 'text/plain;charset=utf-8'
  # Buggy: setting the length of content
  #res.setHeader 'Content-Length', body.length
  res.send body

responseJSON = (res, data) ->
  body = data
  res.setHeader 'Content-Type', 'application/json;charset=utf-8'
  # Buggy: setting the length of content
  #res.setHeader 'Content-Length', body.length
  res.send body


# Short about text
app.get '/', (req, res) ->
  responseText(res, 'This is the Startnext Visualisation helper to generate missing API features.')
  
# Test ping to check the app
app.get '/ping', (req, res) ->
  responseText(res, 'pong')


# Initialize the Startnext Module.
startnext.init()

# Response the Startnext data as json.
app.get '/data.json', (req, res) ->
  responseJSON(res, JSON.stringify(startnext.getData()))

# Update the Startnext data.
app.get '/update', (req, res) ->
  responseText(res, 'Updating data now...')
  startnext.updateData(true)


# Start listen express.js
port = process.env.PORT or 5000
app.listen port, ->
  console.log 'Listening on ' + port
