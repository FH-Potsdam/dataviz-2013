###
Startnext API version and url reaources.

@author Paul Vollmer <paul.vollmer@fh-potsdam.de>
###

# API version
API_VERSION = API_VERSION = 'v1'

# API base url
API_BASE_URL = API_BASE_URL = 'http://api.startnext.de/' + API_VERSION + '/'

# API object contains API version and url resources
exports.api = api =
  version: API_VERSION
  url:
    base: API_BASE_URL
    categories: API_BASE_URL + 'categories/'
    cities: API_BASE_URL + 'cities/'
    projects: API_BASE_URL + 'projects/'
    search: API_BASE_URL + 'search'
    search_projects: API_BASE_URL + 'search/projects/'
    search_projects_category: API_BASE_URL + 'search/projects/?category='
    search_projects_status: API_BASE_URL + 'search/projects/?status='
