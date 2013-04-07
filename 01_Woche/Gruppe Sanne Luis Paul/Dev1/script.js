$(function () {
	var mySeries = new Array ();
	var mySeries2 = new Array ();
	/*var mySeriesJanuar = [];
	var mySeriesFebruar = [];
	var mySeriesMaerz = [];
	var mySeries2012 = [];
	var mySeries2011 = [];
		*/
	anfangsdatum = 1985;

	
	
	$.getJSON('data/1950-2012monat-maennlich-weiblich-gesamt.rows.json', function(data) {
	  //console.log(data);	  
	  var aktYear = "";
	  var aktSeries = [];
	  $.each(data, function(key, val) {
		if (val[0]>=anfangsdatum) {
			if (aktYear == "") aktYear = val[0];
			if (aktYear != val[0]) {
				var obj = {};
				obj["type"] = 'column';
				obj["name"] = aktYear;
				obj["data"] = aktSeries;
				mySeries2.push(obj);
				
				mySeries[aktYear] = aktSeries;
				//mySeries.splice(aktYear,0,aktSeries);
				aktSeries = [];
				aktYear = val[0];
			}
			aktSeries.push(val[4]/10000);
		}
		//console.log(val);
		//if (val[0] > anfangsdatum) mySeries.push(val[4]);
		
		/*if (val[0] == 2012) mySeries2012.push(val[4]);
		if (val[0] == 2011) mySeries2011.push(val[4]);
		
		if (val[0] > anfangsdatum && val[1] == "Januar") mySeriesJanuar.push(val[4]);
		if (val[0] > anfangsdatum && val[1] == "Februar") mySeriesFebruar.push(val[4]);
		if (val[0] > anfangsdatum && val[1] == "M‰rz") mySeriesMaerz.push(val[4]);*/
	  });
	  
	  console.log(mySeries2);
	  doHighchart();
	});
		
	function doHighchart() {
		$('#container').highcharts({
			chart: {
				type: 'column' //bar
			},
			title: {
				text: 'Zeugungen 1985 bis 2011'
			},
			subtitle: {
				text: 'Untertitel'
			},
			xAxis: {
				//type: 'datetime',
				/*labels: {
					formatter: function() {
						return this.value; // clean, unformatted number for year
					}
				}*/
				categories: ['Jan', 'Feb', 'Mar', "Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"]
				/*pointInterval: 32 * 24 * 3600000, 
				pointStart: Date.UTC(2012, 0, 1, 0, 0, 0),*/

			},
			yAxis: {
	
				title: {
					text: 'Temperatur'
				},
				labels: {
					formatter: function() {
						return this.value +' Grad';
					}
				}
			},
			tooltip: {
				pointFormat: 'Anzahl der Zeugungen im Jahr {series.name}: <b>{point.y}</b>'
			},
			plotOptions: {
				area: {
					
					marker: {
						enabled: false,
						symbol: 'circle',
						radius: 2,
						states: {
							hover: {
								enabled: true
							}
						}
					}
				}
			},
			series: mySeries2/*[
			
				{
					type: 'column',
					name: '1960',
					data: mySeries[1959]
				},
				{
					type: 'column',
					name: '2007',
					data: mySeries[2006 ]
				},
				{
					type: 'column',
					name: '2008',
					data: mySeries[2007]
				},
				{
					type: 'column',
					name: '2009',
					data: mySeries[2008]
				},
				{
					type: 'column',
					name: '2010',
					data: mySeries[2009]
				},
				{
					type: 'column',
					name: '2011',
					data: mySeries[2010]
				},
				{
					type: 'column',
					name: '2011',
					data: mySeries[2011]
				}
			]*/
		});
	}
});

