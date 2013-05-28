    // sound variables
	var music = new Howl({ urls: ['files/sound/opener.mp3'], volume: 0.5 , loop : true});

	var shoot = new Howl({
	  urls: ['files/sound/shoot.mp3'], volume: 0.3 });

	var explosions = [
	new Howl({urls: ['files/sound/expl0.mp3'], volume: 0.5}), 
	new Howl({urls: ['files/sound/expl1.mp3'], volume: 0.5}),
	new Howl({urls: ['files/sound/expl2.mp3'], volume: 0.5}),
	new Howl({urls: ['files/sound/expl3.mp3'], volume: 0.5})
	];

	var hits = [
	new Howl({ urls: ['files/sound/hit0.mp3']}),
	new Howl({ urls: ['files/sound/hit1.mp3'] }),
	new Howl({ urls: ['files/sound/hit2.mp3']})
	];


	var manager = manager || {};

	function loadData() {

		manager.pjs = Processing.getInstanceById("THEYCAMEFROMOUTERSPACE");

		// get the processing-instance
        console.log(manager.pjs);

        $.getJSON('/JSON.js', function(d) {
			//console.log("ok!");
			//console.log(data);
			manager.data = d.rows;


			// 
			for (var i = 0; i < manager.data.length; i++) {
				var value = manager.data[i];
				var progress = (1 + i) / manager.data.length;
				manager.pjs.parseRow(value, progress);
				manager.pjs.drawProgessBar("Parsing Entries", progress);
			}

			manager.pjs.goToScene(1);


		});
	}


	function goToScene(index) {
		manager.pjs = Processing.getInstanceById("THEYCAMEFROMOUTERSPACE");
        manager.pjs.goToScene(index);
	}


$(document).ready(
	function() {
		$("button#start").click(function() {
			loadData();
		});
		$("button#select").click(function() {
			goToScene(1);
		});

});

