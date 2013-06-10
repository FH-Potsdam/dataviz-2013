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
    month: currentDate.getMonth()
    day: currentDate.getDay()
    hour: currentDate.getHours()
    minute: currentDate.getMinutes()
    second: currentDate.getSeconds()
  # Return the dateObj
  dateObj

# Logging with color.
# The '1' means that we use one color for output
exports.log1 = log1 = (i) ->
  console.log clc.green i

# Logging with color.
# The '2' means that we use two colors for output
exports.log2 = log2 = (i1, i2) ->
  console.log clc.green i1 + clc.yellow i2
