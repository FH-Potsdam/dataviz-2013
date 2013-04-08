var chart = chart || {};

// these variables need to be declared so we can use them thoughout the entire code … i think.

chart.immigrationValuesCurrent = []; // people that move into germany, per country
chart.immigrationValuesTotal = []; // all people that moved into germany, per country
chart.emigrattionValuesCurrent = []; // people that moved out of germany, per country 
chart.emigrattionValuesTotal = []; // all people that moved out of germany, per country

chart.countries = [{// country-metadata
        name: "",
        direction: "",
        stepSize: 0.0 // the part of the radius that is 
    }];

chart.yearIndex = 0;

$(document).ready(function() {

    chart.w = $("#chartWrapper").width();
    chart.h = 1000;
	
	/*

    chart.rawMigrationData_men = [
        ["Daenemark", "m", "an", "n", 1610, 1426, 1500, 1483, 1431, 1514, 1710, 1761, 1792, 1942],
        ["Schweden", "m", "an", "n", 1786, 1799, 1846, 1711, 1729, 1745, 1638, 1821, 1832, 2016],
        ["Finnland", "m", "an", "n", 925, 938, 1001, 260, 225, 1021, 879, 976, 1008, 1102],
        ["Estland", "m", "an", "o", 0, 0, 0, 0, 0, 232, 237, 429, 622, 759],
        ["Lettland", "m", "an", "o", 0, 0, 0, 0, 0, 744, 1077, 3032, 5095, 6531],
        ["Litauen", "m", "an", "o", 0, 0, 0, 0, 0, 1526, 1442, 2162, 3261, 5588],
        ["Polen", "m", "an", "o", 0, 0, 0, 0, 0, 104035, 86302, 81392, 83065, 114832],
        ["Tschechische_Republik", "m", "an", "o", 0, 0, 0, 0, 0, 3556, 3751, 3702, 3821, 5324],
        ["Slowakei", "m", "an", "o", 0, 0, 0, 0, 0, 6034, 5674, 5264, 5396, 7590],
        ["Ungarn", "m", "an", "o", 0, 0, 0, 0, 0, 17714, 19722, 19591, 22681, 31059],
        ["Rumaenien", "m", "an", "o", 0, 0, 0, 0, 0, 26270, 29661, 33993, 45625, 59032],
        ["Bulgarien", "m", "an", "o", 0, 0, 0, 0, 0, 11359, 14480, 17786, 25091, 33709],
        ["Zypern", "m", "an", "o", 0, 0, 0, 0, 0, 165, 152, 212, 221, 278],
        ["Griechenland", "m", "an", "s", 9959, 7904, 6585, 5915, 5458, 5396, 5448, 5805, 8187, 14896],
        ["Slowenien", "m", "an", "s", 0, 0, 0, 0, 0, 792, 852, 1069, 1350, 2498],
        ["Oesterreich", "m", "an", "s", 8193, 7593, 7695, 7622, 8159, 8776, 9197, 9671, 9964, 10171],
        ["Italien", "m", "an", "s", 16499, 14166, 12693, 12031, 11886, 12248, 13362, 14901, 16718, 20001],
        ["Malta", "m", "an", "s", 0, 0, 0, 0, 0, 91, 87, 81, 151, 168],
        ["Spanien", "m", "an", "w", 8089, 7830, 7605, 7536, 7491, 8287, 9330, 10871, 11676, 15813],
        ["Portugal", "m", "an", "w", 6042, 5182, 3941, 3577, 3612, 4056, 4359, 5173, 4990, 6088],
        ["Frankreich", "m", "an", "w", 9826, 9477, 9701, 971, 855, 10339, 10490, 10604, 10635, 10994],
        ["Luxemburg", "m", "an", "w", 957, 974, 1122, 1276, 1435, 1721, 1812, 1642, 1543, 1584],
        ["Belgien", "m", "an", "w", 2477, 2447, 2493, 2385, 2257, 2344, 2431, 2516, 2794, 2983],
        ["Niederlande", "m", "an", "w", 8053, 7447, 7589, 8096, 8151, 8184, 8398, 7491, 7307, 7525],
        ["Vereinigtes_Koenigreich", "m", "an", "w", 8372, 7536, 7278, 7226, 7336, 7486, 8606, 8925, 9329, 9993],
        ["Irland", "m", "an", "w", 1174, 1060, 853, 806, 960, 1060, 1191, 1308, 1313, 1580]
    ];
    
    */
    
    chart.rawMigrationData_all_out = [
        ["Daenemark","ges","ab","n",2974,2712,3062,2694,3115,4014,4549,4270,3322,3075],
        ["Schweden","ges","ab","n",3876,3786,4168,3568,3934,4509,4979,4858,4053,4088],
        ["Finnland","ges","ab","n",2658,2380,2696,2172,2146,2172,2485,2663,2191,2025],
        ["Estland","ges","ab","o",0,0,0,0,0,526,774,692,779,832],
        ["Lettland","ges","ab","o",0,0,0,0,0,1439,1769,2302,4165,5170],
        ["Litauen","ges","ab","o",0,0,0,0,0,2917,3097,3246,3713,4786],
        ["Polen","ges","ab","o",0,0,0,0,0,120791,132438,122629,103237,106495],
        ["Tschechische_Republik","ges","ab","o",0,0,0,0,0,6636,8082,7586,6067,5889],
        ["Slowakei","ges","ab","o",0,0,0,0,0,8472,9483,8151,7328,7782],
        ["Ungarn","ges","ab","o",0,0,0,0,0,17732,22497,23074,21330,25000],
        ["Rumaenien","ges","ab","o",0,0,0,0,0,24054,38030,44150,48868,59330],
        ["Bulgarien","ges","ab","o",0,0,0,0,0,8382,15864,19940,23785,29422],
        ["Zypern","ges","ab","o",0,0,0,0,0,278,356,340,335,315],
        ["Griechenland","ges","ab","s",19998,18106,20517,16884,15653,15599,17537,17928,12641,11259],
        ["Slowenien","ges","ab","s",0,0,0,0,0,1457,1900,2044,1764,2048],
        ["Oesterreich","ges","ab","s",15929,15976,18528,17535,18604,20152,24049,22574,19889,19776],
        ["Italien","ges","ab","s",36535,33802,36273,28579,26807,25413,28319,28426,24268,23164],
        ["Malta","ges","ab","s",0,0,0,0,0,120,194,172,159,207],
        ["Spanien","ges","ab","w",16681,16236,18010,16059,16734,17124,19613,18618,16071,16007],
        ["Portugal","ges","ab","w",11315,8880,9098,7249,7014,6988,7666,8640,7266,6137],
        ["Frankreich","ges","ab","w",19815,19060,20846,17957,17790,17911,21546,22158,18691,17281],
        ["Luxemburg","ges","ab","w",1327,1510,1670,1740,1864,2002,2336,2433,2226,2598],
        ["Belgien","ges","ab","w",4565,4623,4936,4402,4540,4716,5081,5070,4523,4405],
        ["Niederlande","ges","ab","w",9336,8616,9781,8762,9189,10071,11785,11800,10602,10375],
        ["Vereinigtes_Koenigreich","ges","ab","w",16662,15550,18529,17396,17319,17942,20299,19236,17259,16191],
        ["Irland","ges","ab","w",2634,2415,2489,2041,2330,2538,2729,2535,2011,1872]
    ];
    
    /*
    
    chart.rawMigrationData_all_in = [
  		["Daenemark","ges","an","n",2889,2693,2678,2669,2563,2631,3031,3157,3265,3440],
		["Schweden","ges","an","n",3481,3397,3484,3287,3181,3256,3124,3512,3600,3829],
		["Finnland","ges","an","n",2203,2204,2229,1458,1354,2250,2046,2160,2185,2430],
		["Estland","ges","an","o",0,0,0,0,0,726,647,908,1209,1515],
		["Lettland","ges","an","o",0,0,0,0,0,1757,2062,4930,7689,10177],
		["Litauen","ges","an","o",0,0,0,0,0,4024,3454,4577,6143,9975],
		["Polen","ges","an","o",0,0,0,0,0,153589,131308,122797,125861,172676],
		["Tschechische_Republik","ges","an","o",0,0,0,0,0,7455,7272,7225,7190,9728],
		["Slowakei","ges","an","o",0,0,0,0,0,9583,8828,8558,8613,12040],
		["Ungarn","ges","an","o",0,0,0,0,0,22880,25872,26032,30015,41982],
		["Rumaenien","ges","an","o",0,0,0,0,0,43456,47642,56427,74585,95479],
		["Bulgarien","ges","an","o",0,0,0,0,0,20702,23834,28890,39387,51612],
		["Zypern","ges","an","o",0,0,0,0,0,328,300,390,395,562],
		["Griechenland","ges","an","s",15913,12959,10883,9692,8957,8908,9162,9709,13717,25264],
		["Slowenien","ges","an","s",0,0,0,0,0,1276,1298,1531,1886,3305],
		["Oesterreich","ges","an","s",14401,13456,13466,13758,14719,15743,16828,17538,17859,18590],
		["Italien","ges","an","s",26882,23702,21422,20268,20130,20771,22449,24926,27188,32870],
		["Malta","ges","an","s",0,0,0,0,0,151,133,138,220,330],
		["Spanien","ges","an","w",15426,14647,14406,14004,14219,15515,17388,19959,21543,28140],
		["Portugal","ges","an","w",8806,7699,6225,5608,5640,6128,6500,7351,7257,9038],
		["Frankreich","ges","an","w",18619,18133,18369,9873,9975,19627,19772,20065,20266,20911],
		["Luxemburg","ges","an","w",1739,1728,1987,2405,2611,3224,3458,3052,2897,3039],
		["Belgien","ges","an","w",4439,4291,4349,4267,4115,4198,4428,4504,4934,5219],
		["Niederlande","ges","an","w",13976,13015,13026,13905,14054,14107,14393,12766,12460,12810],
		["Vereinigtes_Koenigreich","ges","an","w",14703,13197,12719,12611,12903,13443,15244,15750,16565,17735"],
		["Irland","ges","an","w",2230,2046,1655,1551,1724,1862,2169,2366,2319,2794"]
    ];
    	
    */

    // interaction-stuff
    $("#lastYear").click(function() {
        if (chart.yearIndex-1 >= 0) {
        chart.yearIndex--;
        chart.update();
        }
        return false;
    });

    $("#nextYear").click(function() {
        if (chart.yearIndex+1 <= 9) {
        chart.yearIndex++;
        chart.update();
        }
        return false;
    });

    chart.setup();
});


// setup function, only once called
chart.setup = function(options) {
    chart.countries = [];

    // this loop extracts the country-metadata
    for (i = 0; i < chart.rawMigrationData_all_out.length; i++) {
//        var s;
//        if (chart.rawMigrationData_men[i][3] == "n") { s = (PI/2) / 3;}
//        if (chart.rawMigrationData_men[i][3] == "o") { s = (PI/2) / 10;}
//        if (chart.rawMigrationData_men[i][3] == "s") { s = (PI/2) / 5;}
//        if (chart.rawMigrationData_men[i][3] == "w") { s = (PI/2) / 8;}

        var country = {
            name: chart.rawMigrationData_all_out[i][0],
            direction: chart.rawMigrationData_all_out[i][3],
            stepSize: 0.0
        };

        chart.countries.push(country);
    }

    // the stepsize defines the size of one bar in the polarchart
    chart.stepSize = (Math.PI * 2) / chart.countries.length;


    // convert the data into usable arrays
    chart.updateDataset();

    // create the SVG element
    chart.svg = d3.select("#chartWrapper").append("svg").attr('width', chart.w).attr('height', chart.h);

    // reference & create shape-group which enables us to move the whole chart
    chart.group = chart.svg.append("g").attr("class", "chart").attr("transform", "translate(" + chart.w / 2 + "," + chart.h / 2 + ")");

    // this is the shit!
    chart.arcGenerator =
            d3.svg.arc().
            innerRadius(100).
            outerRadius(function(d) {
        return d / 100 + 100;
    }).
            startAngle(function(d, i) {
        return (i * chart.stepSize);
    }).
            endAngle(function(d, i) {
        return ((i + 1) * chart.stepSize);
    });


    // bind the data to the groups    
    chart.arcs = chart.group.selectAll("path.arc").data(chart.immigrationValuesCurrent);
    chart.arcs.enter().append("path").attr("class", function(d, i) {
        return("arc " + chart.countries[i].direction)
    }).attr("d", chart.arcGenerator).attr("fill", "black");
    //chart.arcs.exit();
}


// this function updates the whole chart!
chart.update = function(index) {
    $("#yearIndex").text("Year " + (2002 + parseInt(chart.yearIndex)));
    chart.updateDataset();
    chart.arcs.data(chart.immigrationValuesCurrent).transition().duration(500).attr("d", chart.arcGenerator);
}

chart.step = function() {


}

// this function loads the data from the corresponding year into the data-array
chart.updateDataset = function() {
    chart.immigrationValuesCurrent = [];
    for (i = 0; i < chart.rawMigrationData_all_out.length; i++) {
        chart.immigrationValuesCurrent[i] = chart.rawMigrationData_all_out[i][4 + chart.yearIndex];
    }
}