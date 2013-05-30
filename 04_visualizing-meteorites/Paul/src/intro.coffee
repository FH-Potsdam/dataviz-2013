##                                                                           ##
#                                                                             #
# Intro                                                                       #
#                                                                             #
# Paul Vollmer <paul.vollmer@fh-potsdam.de>                                   #
#                                                                             #
##                                                                           ##


intro = ->
	##
	# Fade in the intro div
	##
	$(ID_INTRO).hide(0).delay(timer).fadeIn(1500)
	timer += 3000

	##
	# scroll to the viz
	##
	window.setTimeout ( ->
	  #console.log 'scroll To...'

	  $(ID_CONTENT).show()
	  $("html,body").animate
	    scrollTop: $(ID_CONTENT).offset().top
	  , "slow"
	  
	), timer
	timer += 5000
