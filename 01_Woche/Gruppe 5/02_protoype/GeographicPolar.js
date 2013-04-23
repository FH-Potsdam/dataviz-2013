var chart = chart || {};

// these variables need to be declared so we can use them thoughout the entire code … i think.

chart.immigrationValuesCurrent = []; // people that move into germany, per country
chart.immigrationValuesTotal = []; // all people that moved into germany, per country
chart.emigrationValuesCurrent = []; // people that moved out of germany, per country 
chart.emigrationValuesTotal = []; // all people that moved out of germany, per country

chart.countries = [{// country-metadata
        name: "",
        direction: "",
        stepSize: 0.0 // the part of the radius that is 
    }];

chart.yearIndex = 0;

$(document).ready(function() {

    chart.w = $("#chartWrapper").width();
    chart.h = 1000;

    chart.immigrationValues_raw = [
        ["Dänemark", "ges", "an", "n", 2889, 2693, 2678, 2669, 2563, 2631, 3031, 3157, 3265, 3440],
        ["Schweden", "ges", "an", "n", 3481, 3397, 3484, 3287, 3181, 3256, 3124, 3512, 3600, 3829],
        ["Finnland", "ges", "an", "n", 2203, 2204, 2229, 1458, 1354, 2250, 2046, 2160, 2185, 2430],
        ["Estland", "ges", "an", "o", 0, 0, 0, 0, 0, 726, 647, 908, 1209, 1515],
        ["Lettland", "ges", "an", "o", 0, 0, 0, 0, 0, 1757, 2062, 4930, 7689, 10177],
        ["Litauen", "ges", "an", "o", 0, 0, 0, 0, 0, 4024, 3454, 4577, 6143, 9975],
        ["Polen", "ges", "an", "o", 0, 0, 0, 0, 0, 153589, 131308, 122797, 125861, 172676],
        ["Tschechische Republik", "ges", "an", "o", 0, 0, 0, 0, 0, 7455, 7272, 7225, 7190, 9728],
        ["Slowakei", "ges", "an", "o", 0, 0, 0, 0, 0, 9583, 8828, 8558, 8613, 12040],
        ["Ungarn", "ges", "an", "o", 0, 0, 0, 0, 0, 22880, 25872, 26032, 30015, 41982],
        ["Rumaenien", "ges", "an", "o", 0, 0, 0, 0, 0, 43456, 47642, 56427, 74585, 95479],
        ["Bulgarien", "ges", "an", "o", 0, 0, 0, 0, 0, 20702, 23834, 28890, 39387, 51612],
        ["Zypern", "ges", "an", "o", 0, 0, 0, 0, 0, 328, 300, 390, 395, 562],
        ["Griechenland", "ges", "an", "s", 15913, 12959, 10883, 9692, 8957, 8908, 9162, 9709, 13717, 25264],
        ["Slowenien", "ges", "an", "s", 0, 0, 0, 0, 0, 1276, 1298, 1531, 1886, 3305],
        ["Österreich", "ges", "an", "s", 14401, 13456, 13466, 13758, 14719, 15743, 16828, 17538, 17859, 18590],
        ["Italien", "ges", "an", "s", 26882, 23702, 21422, 20268, 20130, 20771, 22449, 24926, 27188, 32870],
        ["Malta", "ges", "an", "s", 0, 0, 0, 0, 0, 151, 133, 138, 220, 330],
        ["Spanien", "ges", "an", "w", 15426, 14647, 14406, 14004, 14219, 15515, 17388, 19959, 21543, 28140],
        ["Portugal", "ges", "an", "w", 8806, 7699, 6225, 5608, 5640, 6128, 6500, 7351, 7257, 9038],
        ["Frankreich", "ges", "an", "w", 18619, 18133, 18369, 9873, 9975, 19627, 19772, 20065, 20266, 20911],
        ["Luxemburg", "ges", "an", "w", 1739, 1728, 1987, 2405, 2611, 3224, 3458, 3052, 2897, 3039],
        ["Belgien", "ges", "an", "w", 4439, 4291, 4349, 4267, 4115, 4198, 4428, 4504, 4934, 5219],
        ["Niederlande", "ges", "an", "w", 13976, 13015, 13026, 13905, 14054, 14107, 14393, 12766, 12460, 12810],
        ["Vereinigtes Königreich", "ges", "an", "w", 14703, 13197, 12719, 12611, 12903, 13443, 15244, 15750, 16565, 17735],
        ["Irland", "ges", "an", "w", 2230, 2046, 1655, 1551, 1724, 1862, 2169, 2366, 2319, 2794]
    ];

    chart.emigrationValues_raw = [
        ["Dänemark", "ges", "ab", "n", 2974, 2712, 3062, 2694, 3115, 4014, 4549, 4270, 3322, 3075],
        ["Schweden", "ges", "ab", "n", 3876, 3786, 4168, 3568, 3934, 4509, 4979, 4858, 4053, 4088],
        ["Finnland", "ges", "ab", "n", 2658, 2380, 2696, 2172, 2146, 2172, 2485, 2663, 2191, 2025],
        ["Estland", "ges", "ab", "o", 0, 0, 0, 0, 0, 526, 774, 692, 779, 832],
        ["Lettland", "ges", "ab", "o", 0, 0, 0, 0, 0, 1439, 1769, 2302, 4165, 5170],
        ["Litauen", "ges", "ab", "o", 0, 0, 0, 0, 0, 2917, 3097, 3246, 3713, 4786],
        ["Polen", "ges", "ab", "o", 0, 0, 0, 0, 0, 120791, 132438, 122629, 103237, 106495],
        ["Tschechische Republik", "ges", "ab", "o", 0, 0, 0, 0, 0, 6636, 8082, 7586, 6067, 5889],
        ["Slowakei", "ges", "ab", "o", 0, 0, 0, 0, 0, 8472, 9483, 8151, 7328, 7782],
        ["Ungarn", "ges", "ab", "o", 0, 0, 0, 0, 0, 17732, 22497, 23074, 21330, 25000],
        ["Rumaenien", "ges", "ab", "o", 0, 0, 0, 0, 0, 24054, 38030, 44150, 48868, 59330],
        ["Bulgarien", "ges", "ab", "o", 0, 0, 0, 0, 0, 8382, 15864, 19940, 23785, 29422],
        ["Zypern", "ges", "ab", "o", 0, 0, 0, 0, 0, 278, 356, 340, 335, 315],
        ["Griechenland", "ges", "ab", "s", 19998, 18106, 20517, 16884, 15653, 15599, 17537, 17928, 12641, 11259],
        ["Slowenien", "ges", "ab", "s", 0, 0, 0, 0, 0, 1457, 1900, 2044, 1764, 2048],
        ["Österreich", "ges", "ab", "s", 15929, 15976, 18528, 17535, 18604, 20152, 24049, 22574, 19889, 19776],
        ["Italien", "ges", "ab", "s", 36535, 33802, 36273, 28579, 26807, 25413, 28319, 28426, 24268, 23164],
        ["Malta", "ges", "ab", "s", 0, 0, 0, 0, 0, 120, 194, 172, 159, 207],
        ["Spanien", "ges", "ab", "w", 16681, 16236, 18010, 16059, 16734, 17124, 19613, 18618, 16071, 16007],
        ["Portugal", "ges", "ab", "w", 11315, 8880, 9098, 7249, 7014, 6988, 7666, 8640, 7266, 6137],
        ["Frankreich", "ges", "ab", "w", 19815, 19060, 20846, 17957, 17790, 17911, 21546, 22158, 18691, 17281],
        ["Luxemburg", "ges", "ab", "w", 1327, 1510, 1670, 1740, 1864, 2002, 2336, 2433, 2226, 2598],
        ["Belgien", "ges", "ab", "w", 4565, 4623, 4936, 4402, 4540, 4716, 5081, 5070, 4523, 4405],
        ["Niederlande", "ges", "ab", "w", 9336, 8616, 9781, 8762, 9189, 10071, 11785, 11800, 10602, 10375],
        ["Vereinigtes_Königreich", "ges", "ab", "w", 16662, 15550, 18529, 17396, 17319, 17942, 20299, 19236, 17259, 16191],
        ["Irland", "ges", "ab", "w", 2634, 2415, 2489, 2041, 2330, 2538, 2729, 2535, 2011, 1872]
    ];

    // interaction-stuff
    $("#lastYear").click(function() {
        if (chart.yearIndex - 1 >= 0) {
            chart.yearIndex--;
            chart.update();
        }
        return false;
    });

    $("#nextYear").click(function() {
        if (chart.yearIndex + 1 <= 9) {
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
    for (i = 0; i < chart.immigrationValues_raw.length; i++) {
        var country = {
            name: chart.immigrationValues_raw[i][0],
            direction: chart.immigrationValues_raw[i][3],
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


    // circular axis steps
    chart.axisTicks = [50, 100, 150, 200, 250, 300, 350];
    chart.circularAxisGroup = chart.svg.append("g").attr("class", "axis").attr("transform", "translate(" + chart.w / 2 + "," + chart.h / 2 + ")");
    chart.axisCircles = chart.circularAxisGroup.selectAll("circle.axis").data(chart.axisTicks);
    chart.axisCircles.enter().append("circle").attr("r", function(d) {
        return d
    } ).attr("class", "axis").attr("x", "0").attr("y", "0").attr("fill-opacity", "0.0").attr("stroke", "#cecece");

    // reference & create shape-group which enables us to move the whole chart
    chart.group = chart.svg.append("g").attr("class", "chart").attr("transform", "translate(" + chart.w / 2 + "," + chart.h / 2 + ")");

    // this is the shit!
    chart.innerArcGenerator =
            d3.svg.arc().
            innerRadius(0).
            outerRadius(function(d) {
        return (d / 100);
    }).
            startAngle(function(d, i) {
        return (i * chart.stepSize);
    }).
            endAngle(function(d, i) {
        return ((i + 1) * chart.stepSize);
    });





    // this is the shit!
    chart.outerArcGenerator =
            d3.svg.arc().
            innerRadius(function(d, i) {
        return (chart.immigrationValuesCurrent[i] / 100)
    }).
            outerRadius(function(d, i) {
        return (d / 100 + (chart.immigrationValuesCurrent[i] / 100));
    }).
            startAngle(function(d, i) {
        return (i * chart.stepSize);
    }).
            endAngle(function(d, i) {
        return ((i + 1) * chart.stepSize);
    });



    //bind the data to the groups    
   chart.innerRing = chart.group.selectAll("path.innerRing").data(chart.immigrationValuesCurrent);
   chart.innerRing.enter().append("path").attr("class", function(d, i) {
       return("innerRing " + chart.countries[i].direction)
   }).attr("d", chart.innerArcGenerator);

   chart.outerRing = chart.group.selectAll("path.outerRing").data(chart.emigrationValuesCurrent);
   chart.outerRing.enter().append("path").attr("class", function(d, i) {
       return("outerRing " + chart.countries[i].direction)
   }).attr("d", chart.outerArcGenerator).attr("fill-opacity", "0.5");

/*

    chart.migrationBars = chart.group.selectAll("rect.migrationBar");
    chart.migrationBars.data(chart.migrationValuesCurrent);
    chart.migrationBars.enter().
            append("rect").
            attr("class", "migrationBar").
            attr("transform", function(d, i) { return ( "rotate(" + i * chart.stepSize * (360 / Math.PI*2)) + ")"}).
            attr("h", function(d) { return d/100}).
            attr("width", "10").
            attr("w", "200");


*/

    // the labels for sizes
    chart.circularLabelGroup = chart.svg.append("g").attr("class", "labell").attr("transform", "translate(" + chart.w / 2 + "," + chart.h / 2 + ")");
    chart.axisLabels = chart.circularLabelGroup.selectAll("text").data(chart.axisTicks);
    chart.axisLabels.enter().append("text").attr("y", function(d) {
        return d + 5
    } ).text(function(d) {
        return d * 100
    });


    // the labels for countries
    chart.countryLabelGroup = chart.svg.append("g").attr("class", "country").attr("transform", "translate(" + chart.w / 2 + "," + chart.h / 2 + ")");
    chart.countryLabels = chart.countryLabelGroup.selectAll("text").data(chart.immigrationValuesCurrent);
    chart.countryLabels.enter().append("text").
            attr("x", function(d, i) {
        return (Math.cos(-Math.PI / 2 + i * chart.stepSize + chart.stepSize / 2) * 400)
    } ).
            attr("y", function(d, i) {
        return (Math.sin(-Math.PI / 2 + i * chart.stepSize + chart.stepSize / 2) * 400)
    } ).
            text(function(d, i) {
        return chart.countries[i].name
    });

//    chart.countryLabels.enter().append("g").attr("transform", function(d, i) { return ( "rotate(" + (chart.stepSize * (360 / Math.PI*2)) + ")")}).append("text").attr("dx", "500").text(function(d, i) { return chart.countries[i].name });
}


// this function updates the whole chart!
chart.update = function(index) {
    $("#yearIndex").text("Year " + (2002 + parseInt(chart.yearIndex)));
    chart.updateDataset();
    chart.innerRing.data(chart.immigrationValuesCurrent).transition().duration(300).attr("d", chart.innerArcGenerator);
    chart.outerRing.data(chart.emigrationValuesCurrent).transition().duration(300).attr("d", chart.outerArcGenerator);
}


// this function loads the data from the corresponding year into the data-array
chart.updateDataset = function() {
    chart.immigrationValuesCurrent = [];
    chart.emigrationValuesCurrent = [];
    for (i = 0; i < chart.immigrationValues_raw.length; i++) {
        chart.immigrationValuesCurrent[i] = chart.emigrationValues_raw[i][4 + chart.yearIndex];
    }

    for (i = 0; i < chart.emigrationValues_raw.length; i++) {
        chart.emigrationValuesCurrent[i] = chart.emigrationValues_raw[i][4 + chart.yearIndex];
    }
}