###
Startnext module used to store some API parameter.

@author Paul Vollmer <paul.vollmer@fh-potsdam.de>
###

# Module dependencies.
request = require 'request'
clc = require 'cli-color'


# Module version
exports.version = version = '0.0.1b'


# API version
exports.API_VERSION = API_VERSION = 'v1'

# API base url
exports.API_BASE_URL = API_BASE_URL = 'http://api.startnext.de/' + API_VERSION + '/'

# API object contains API version and url resources
exports.api = api =
  version: API_VERSION
  url:
    base: API_BASE_URL
    categories: API_BASE_URL+'categories/'
    cities: API_BASE_URL+'cities/'
    projects: API_BASE_URL+'projects/'
    search: API_BASE_URL+'search'
    search_projects: API_BASE_URL+'search/projects/'
    search_projects_category: API_BASE_URL+'search/projects/?category='
    search_projects_status: API_BASE_URL+'search/projects/?status='


# The data object to store our data.
# This we use to create the json.
exports.data = data =
  last_update: 
    year: null
    month: null
    day: null
    hour: null
    minute: null
    second: null
  cities: null
  projects:
    total: null
    status_active: null
    status_started: null
    #status_finished: null
    #status_succesful: null
    #status_unsuccesful: null
  # Categories object grabbed from API resource: https://api.startnext.de/v1/categories
  categories_active:
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
  categories_all:
    total: 'TODO: implement this. (crawl all projects to get this data)'


# Initialize the module.
# If the server is started we start grabbing the data first time.
exports.init = init = () ->
  log1 'Initialize Startnext Module v'+version

  # Print out the API resources (debugging stuff)
  # log2 'API version                        = ' , API_VERSION
  # log2 'API base url                       = ' , api.url.base
  # log2 'API project url                    = ' , api.url.projects
  # log2 'API categories url                 = ' , api.url.categories
  # log2 'API search url                     = ' , api.url.search
  # log2 'API search projects url            = ' , api.url.search_projects
  # log2 'API search projects category url   = ' , api.url.search_projects_category

  updateData(true)


# Call the API for new data.
# @param timeCheck
#        true  = Check the time. if the data is too old, update.
#        false = Update data directly. 
exports.updateData = updateData = (timeCheck) ->
  if timeCheck is true
    curTime = new Date()
    if curTime.getFullYear() is data.last_update.year and
    curTime.getMonth() is data.last_update.month and
    curTime.getDay() is data.last_update.day and
    curTime.getHours() is data.last_update.hour
      log2 'updateData -> ', 'Data up to date'
    else
      log2 'updateData -> ', 'We need new data. Call the API...'
      callAllRequests()

  else
    callAllRequests()


# Call all requests we have defined.
# This function is a small helper for the updateData function.
callAllRequests = () ->
  requestCitiesData()
  requestProjectsData()
  requestCategoriesActive()
  saveDate()


# Totally WIP
# Crawl the active categories data
# TODO: Don't repeat ypurself
exports.requestCategoriesActive = requestCategoriesActive = () ->
  
  request api.url.search_projects_category, (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.categories_active.total = json.count
      log2 'requestCategoriesActive() -> ', 'total Ready'

  request api.url.search_projects_category+'comic', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.categories_active.comic = json.count
      log2 'requestCategoriesActive() -> ', 'comic Ready'

  request api.url.search_projects_category+'design', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.categories_active.design = json.count
      log2 'requestCategoriesActive() -> ', 'design Ready'

  request api.url.search_projects_category+'invention', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.categories_active.invention = json.count
      log2 'requestCategoriesActive() -> ', 'invention Ready'

  request api.url.search_projects_category+'event', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.categories_active.event = json.count
      log2 'requestCategoriesActive() -> ', 'event Ready'

  request api.url.search_projects_category+'movie', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.categories_active.movie = json.count
      log2 'requestCategoriesActive() -> ', 'movie Ready'

  request api.url.search_projects_category+'photography', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.categories_active.photography = json.count
      log2 'requestCategoriesActive() -> ', 'photography Ready'

  request api.url.search_projects_category+'games', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.categories_active.games = json.count
      log2 'requestCategoriesActive() -> ', 'games Ready'

  request api.url.search_projects_category+'audio-drama', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.categories_active.audio_drama = json.count
      log2 'requestCategoriesActive() -> ', 'audio_drama Ready'

  request api.url.search_projects_category+'information', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.categories_active.information = json.count
      log2 'requestCategoriesActive() -> ', 'information Ready'
  
  request api.url.search_projects_category+'journalism', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.categories_active.journalism = json.count
      log2 'requestCategoriesActive() -> ', 'journalism Ready'

  request api.url.search_projects_category+'cultural-education', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.categories_active.cultural_education = json.count
      log2 'requestCategoriesActive() -> ', 'cultural_education Ready'
  
  request api.url.search_projects_category+'art', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.categories_active.art = json.count
      log2 'requestCategoriesActive() -> ', 'art Ready'

  request api.url.search_projects_category+'literature', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.categories_active.literature = json.count
      log2 'requestCategoriesActive() -> ', 'literature Ready'
  
  request api.url.search_projects_category+'fashion', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.categories_active.fashion = json.count
      log2 'requestCategoriesActive() -> ', 'fashion Ready'

  request api.url.search_projects_category+'music', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.categories_active.music = json.count
      log2 'requestCategoriesActive() -> ', 'music Ready'

  request api.url.search_projects_category+'technology', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.categories_active.technology = json.count
      log2 'requestCategoriesActive() -> ', 'technology Ready'
  
  request api.url.search_projects_category+'theater', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.categories_active.theater = json.count
      log2 'requestCategoriesActive() -> ', 'theater Ready'


# API: http://api.startnext.de/v1/search/projects/?status=active
# Docs: http://doc.startnext.de/doku.php?id=cf_api_v1.1#projektstatus 
exports.requestProjectsData = requestProjectsData = () ->

  # Get the total number of projects
  request api.url.search_projects, (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.projects.total = json.count
      log2 'requestProjectsData() -> ', 'total Ready'

  request api.url.search_projects_status+'active', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.projects.status_active = json.count
      log2 'requestProjectsData() -> ', 'status_active Ready'

  request api.url.search_projects_status+'started', (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.projects.status_started = json.count
      log2 'requestProjectsData() -> ', 'status_started Ready'


# Get a list of all cities 
exports.requestCitiesData = requestCitiesData = () ->

  request api.url.cities, (error, response, body) ->
    if not error and response.statusCode is 200
      json = JSON.parse(body)
      data.cities = json.data
      log2 'requestCitiesData() -> ', 'cities Ready'


# Private module functions

# Get the current Time and save to data object.
# This is used to check if we need new data.
saveDate = () ->
  currentDate = new Date()
  data.last_update.year = currentDate.getFullYear()
  data.last_update.month = currentDate.getMonth()
  data.last_update.day = currentDate.getDay()
  data.last_update.hour = currentDate.getHours()
  data.last_update.minute = currentDate.getMinutes()
  data.last_update.second = currentDate.getSeconds()

# Logging with color support.
# The '1' means that we use one color for output
log1 = (i) ->
  console.log clc.green i

# Logging with color support.
# The '2' means that we use two colors for output
log2 = (i1, i2) ->
  console.log clc.green i1 + clc.yellow i2
