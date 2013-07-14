###
Startnext module used to store some API parameter.

@author Paul Vollmer <paul.vollmer@fh-potsdam.de>
###

# Module dependencies.
api = require './api_constants'
utils = require './utils'
categories = require './api_categories'
cities = require './api_cities'
projects = require './api_projects'


# Module version
exports.version = version = '0.0.1b'


# The data object to store some data.
data =
  last_update: 
    year: null
    month: null
    day: null
    hour: null
    minute: null
    second: null


# Initialize the module.
# If the server is started we start grabbing the data first time.
exports.init = init = () ->
  utils.log1 'Initialize Startnext Module v'+version
  # Print out the API resources (debugging stuff)
  # utils.log2 'API version                        = ', api.version
  # utils.log2 'API base url                       = ', api.url.base
  # utils.log2 'API project url                    = ', api.url.projects
  # utils.log2 'API categories url                 = ', api.url.categories
  # utils.log2 'API search url                     = ', api.url.search
  # utils.log2 'API search projects url            = ', api.url.search_projects
  # utils.log2 'API search projects category url   = ', api.url.search_projects_category
  updateData(false)


# Call the API for new data.
# @param timeCheck
#        true  = Check the time. if the data is too old, update.
#        false = Update data directly. 
exports.updateData = updateData = (timeCheck) ->
  if timeCheck is true
    # curTime = new Date()
    # if curTime.getFullYear() is data.last_update.year and
    # curTime.getMonth()+1 is data.last_update.month and
    # curTime.getDate() is data.last_update.day and
    # curTime.getHours() is data.last_update.hour
    #   utils.log2 'updateData -> ', 'Data up to date'
    # else
    #   utils.log2 'updateData -> ', 'We need new data. Call the API...'
    #   callAllRequests()

    if utils.checkDate(data.last_update) isnt true
      callAllRequests()

  else
    utils.log1 'Request Data first time.'
    callAllRequests()


# Call all requests we have defined.
# This function is a small helper for the updateData function.
callAllRequests = () ->
  cities.callApi()
  projects.callApi()
  categories.callApi()
  data.last_update = utils.getCurrentDate()


# Return the data objects.
# This can be used to create a json file.
exports.getData = getData = () ->
  updateData(true)
  # create the data object
  tmpData =
    last_update: data.last_update
    cities: cities.data
    projects: projects.data
    categories: categories.data
  # Return the data object
  tmpData
