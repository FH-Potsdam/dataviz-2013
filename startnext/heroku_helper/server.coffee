# Node.js modules
express = require 'express'
app = express()


# Small about text
app.get '/about', (req, res) ->
  body = 'This is the Startnext Visualisation helper to generate missing API features.'
  res.setHeader 'Content-Type', 'text/plain'
  res.setHeader 'Content-Length', body.length
  res.end body


# Start listen express.js
port = process.env.PORT or 5000
app.listen port, ->
  console.log 'Listening on' + port
