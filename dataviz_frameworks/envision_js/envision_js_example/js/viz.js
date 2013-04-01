(function() {
    var intClientHeight = -1,
        intDetailHeight, intSummaryHeight, container = document.getElementById('container'),
        i, strTitle = "Real-time Pressure and Flow";

    if (window.innerHeight) {
        intClientHeight = window.innerHeight;
    } else if (document.body.clientHeight) {
        intClientHeight = document.body.clientHeight;
    } else if (document.body.offsetHeight) {
        intClientHeight = document.body.offsetHeight - 1;
    }
    if (intClientHeight == -1) {
        alert("Cannot determine size of client area!");
        return;
    }
    // Work out the size of the charts, 15% for the summary the rest for the detail         
    intSummaryHeight = ((intClientHeight / 100) * 15);
    intDetailHeight = (intClientHeight - intSummaryHeight) - 40;

    var aryYAxisTitles = ['Pressure', 'Flow'];
    var aryYAxisUnits = ['kg'];
    var aryData = [],
        x = [];
    var aryTrace = [];
    x.push(934321453000.00);
    aryTrace.push(5);
    x.push(1034321454000.00);
    aryTrace.push(10);
    x.push(1134321455000.00);
    aryTrace.push(5);
    x.push(1234321456000.00);
    aryTrace.push(8);
    x.push(1334321457000.00);
    aryTrace.push(9.5);
    x.push(1434321458000.00);
    aryTrace.push(7);
    x.push(1534321459000.00);
    aryTrace.push(2);
    x.push(1634321460000.00);
    aryTrace.push(8);
    x.push(1734321461000.00);
    aryTrace.push(10);
    x.push(1834321462000.00);
    aryTrace.push(14);
    x.push(1934321463000.00);
    aryTrace.push(5);

    aryData.push({
        data: [x, aryTrace],
        lines: {
            show: true
        },
        points: {
            show: false
        }
    });
    /* // second data set
    aryTrace = [];
    aryTrace.push(0.0000000);
    aryTrace.push(-0.0499792);
    aryTrace.push(-0.0998334);
    aryData.push({
        data: [x, aryTrace],
        label: "TW:S0001:Flow",
        lines: {
            show: true
        },
        points: {
            show: true
        },
        yaxis: 1 //2
    });
    */
    var objLiteLines = {
        lineWidth: 1,
        show: true,
        fillOpacity: 0.2
    };
    
    var cbXAxisTickFormatter = function(n) {
        var objDate = new Date(Number(n)),
            value = objDate.getDate() + " " + Flotr.Date.monthNames[objDate.getMonth()] + " " + objDate.getFullYear() + " " + objDate.getHours() + " " + objDate.getMinutes() + " " + objDate.getSeconds() + "." + objDate.getMilliseconds();
        return value;
    };
    var cbYAxisTicks = function(o) {
        var aryTicks = [],
            fltTick, fltInc;
        fltInc = (o.max - o.min) / 10;
        for (fltTick = o.min; fltTick < o.max; fltTick += fltInc) {
            aryTicks.push(fltTick);
        }
        return aryTicks;
    };
    
    var cbYAxisTickFormatter = function(n) {
        return Number(n).toPrecision(3);
    };
    // TimeSeries Template Options
    objChartOptions = {
        container: container,
        data: {
            detail: aryData,
            summary: aryData
        },
        defaults: {
            detail: {
                config: {
                    title: null,
                    subtitle: null,
                    shadowSize: 2,
                    fontColor: '#00ff00',
                    fontSize: 17.5,
                    legend: {
                        position: "nw"
                    },
                    HtmlText: false,
                    parseFloat: true,
                    xaxis: {
                        autoscale: true,
                        base: Math.E,
                        margin: true,
                        min: null,
                        minorTicks: null,
                        max: null,
                        mode: 'time',
                        showLabels: false,
                        ticks: null,
                        tickFormatter: cbXAxisTickFormatter,
                        tickUnit: "day",
                        timeMode: "local",
                        title: " "
                    },
                    yaxis: {
                        autoscale: true,
                        autoscaleMargin: 1.0,
                        base: Math.E,
                        color: '#bbb',
                        margin: true,
                        min: null,
                        max: null,
                        scaling: 'linear',
                        showLabels: true,
                        showMinorLabels: false,
                        title: aryYAxisTitles[0],
                        tickFormatter: cbYAxisTickFormatter,
                        ticks: cbYAxisTicks
                    },
                    grid: {
                        show: true,
                        circular: false,
                        color: '#eee',
                        horizontalLines: true,
                        labelMargin: 12,
                        outline: 'nsew',
                        outlineWidth: 1,
                        tickColor: '#545454',
                        verticalLines: true
                    },
                    mouse: {
                        track: true,
                        trackY: false,
                        trackAll: true,
                        sensibility: 1,
                        trackDecimals: 4,
                        position: 'ne',
                        trackFormatter: function(o) { // formats the values in the value box
                            var objDate = new Date(Number(o.x));
                            //var strTip = objDate.toLocaleString() + "<br />" + aryYAxisTitles[0] + ": " + Number(o.y);
                            var date = objDate.getDate();
                            var month = objDate.getMonth() + 1; //Months are zero based
                            var year = objDate.getFullYear();
                            var strTip = date + "/" + month + "/" + year + "<br />" + Number(o.y) + aryYAxisUnits[0];
                            return strTip;
                        }
                    }
                }
            },
            summary: {
                config: {
                    'lite-lines': objLiteLines,
                    legend: {
                        show: false
                    },
                    y2axis: {
                        autoscale: true,
                        autoscaleMargin: 1.0,
                        color: '#000000',
                        margin: true,
                        min: null,
                        max: null,
                        scaling: 'linear',
                        showLabels: true,
                        showMinorLabels: false,
                        title: aryYAxisTitles[1],
                        tickFormatter: cbYAxisTickFormatter,
                        ticks: cbYAxisTicks
                    },
                    // Enable selection in the x-axis
                    selection: {
                        mode: 'x'
                    },
                    handles: {
                        show: true
                    }
                }
            }
        }
    };
    objChart = new envision.templates.TimeSeries(objChartOptions);
})();