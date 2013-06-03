##                                                                           ##
#                                                                             #
# Intro                                                                       #
#                                                                             #
# Paul Vollmer <paul.vollmer@fh-potsdam.de>                                   #
#                                                                             #
##                                                                           ##


intro = ->
	$(ID_CONTENT).hide(0)
	$(ID_FOOTER).hide(0)


	##
	# Fade in the intro div
	##
	$(ID_INTRO).hide(0).delay(timer).fadeIn(1500)
	timer += 6000

	##
	# scroll to the viz
	##
	window.setTimeout ( ->
	  #console.log 'scroll To...'

	  $(ID_CONTENT).show()
	  $("html,body").animate
	    scrollTop: $(ID_CONTENT).offset().top
	  , "slow"

	  $(ID_FOOTER).show()
	  
	), timer
	timer += 5000
