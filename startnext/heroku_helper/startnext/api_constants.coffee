###
Startnext API version and url routes.

@author Paul Vollmer <paul.vollmer@fh-potsdam.de>
###

# API version
exports.version = version = 'v1'

# API base url
API_BASE_URL = API_BASE_URL = 'http://api.startnext.de/' + version + '/'

# url object to store Startnext API routes
exports.url = url =
  base: API_BASE_URL
  categories: API_BASE_URL + 'categories/'
  cities: API_BASE_URL + 'cities/'
  projects: API_BASE_URL + 'projects/'
  search: API_BASE_URL + 'search'
  search_projects: API_BASE_URL + 'search/projects/'
  search_projects_category: API_BASE_URL + 'search/projects/?category='
  search_projects_city: API_BASE_URL + 'search/projects/?city='
  search_projects_status: API_BASE_URL + 'search/projects/?status='
  search_projects_criterion: API_BASE_URL + 'search/projects/?criterion='
