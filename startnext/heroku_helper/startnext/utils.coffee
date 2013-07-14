###
Some utility functions...

@author Paul Vollmer <paul.vollmer@fh-potsdam.de>
###

# Module dependencies.
clc = require 'cli-color'

# Get the current Time and return as object.
# This is used to check if we need new data.
exports.getCurrentDate = saveDate = () ->
  currentDate = new Date()
  dateObj = 
    year: currentDate.getFullYear()
    month: currentDate.getMonth()+1
    day: currentDate.getDate()
    hour: currentDate.getHours()
    minute: currentDate.getMinutes()
    second: currentDate.getSeconds()
  # Return the dateObj
  dateObj

# Check if time is over.
# @return true  = data up to date
#         false = need new data
exports.checkDate = checkDate = (d) ->
  tmpBoolean = false
  curTime = new Date()
  if curTime.getFullYear() is d.year and
  curTime.getMonth()+1 is d.month and
  curTime.getDate() is d.day and
  curTime.getHours() is d.hour
  #curTime.getMinutes() is d.minute # Check every minute, used for debugging this function
    tmpBoolean = true
    log2 'updateData -> ', 'Data up to date'
  else
    tmpBoolean = false
    log2 'updateData -> ', 'We need new data. Call the API...'
  # Return the boolean
  tmpBoolean

# Logging with color.
# The '1' means that we use one color for output
exports.log1 = log1 = (i) ->
  console.log clc.green i

# Logging with color.
# The '2' means that we use two colors for output
exports.log2 = log2 = (i1, i2) ->
  console.log clc.green i1 + clc.yellow i2
