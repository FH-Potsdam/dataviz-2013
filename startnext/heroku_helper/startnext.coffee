###
Startnext module used to store some API parameter.

@version   0.0.1
@author    Paul Vollmer <paul.vollmer@fh-potsdam.de>@author
###


# API version
API_VERSION = 'v1'

# API base url
API_BASE_URL = 'http://api.startnext.de/' + API_VERSION + '/'

# API object contains API version and url resources
api =
  version: API_VERSION
  url:
    base: API_BASE_URL
    categories: API_BASE_URL+'categories/'
    projects: API_BASE_URL+'projects/'
    search: API_BASE_URL+'search'
    search_projects: API_BASE_URL+'search/projects/'
    search_projects_category: API_BASE_URL+'search/projects/?category='


# Module export
exports.API_VERSION = API_VERSION
exports.API_BASE_URL = API_BASE_URL
exports.api = api
