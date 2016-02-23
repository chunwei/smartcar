/**
 * Created by chunwei on 2016/2/14.
 */
var Gauge=Gauge||{};
$(function () {

    Gauge.speedmeter = new Highcharts.Chart({
            chart: {
                renderTo : "gauge",  // 注意这里一定是 ID 选择器
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false
            },

            title: {
                text: 'GPS速度'
            },

            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: {
                        linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
            },

            // the value axis
            yAxis: {
                min: 0,
                max: 140,

                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#666',

                tickPixelInterval: 60,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#666',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: 'km/h'
                },
                plotBands: [{
                    from: 0,
                    to: 80,
                    color: '#55BF3B' // green
                }, {
                    from: 80,
                    to: 100,
                    color: '#DDDF0D' // yellow
                }, {
                    from: 100,
                    to: 140,
                    color: '#DF5353' // red
                }]
            },

            series: [{
                name: 'Speed',
                data: [80],
                tooltip: {
                    valueSuffix: ' km/h'
                }
            }]

        }/*,
        // Add some life
        function (chart) {
            if (!chart.renderer.forExport) {
                setInterval(function () {
                    var point = chart.series[0].points[0],
                        newVal,
                        inc = Math.round((Math.random() - 0.5) * 20);

                    newVal = point.y + inc;
                    if (newVal < 0 || newVal > 140) {
                        newVal = point.y - inc;
                    }

                    point.update(newVal);

                }, 3000);
            }
        }*/);

    Gauge.tachometer = new Highcharts.Chart({
            chart: {
                renderTo : "gauge1",// 注意这里一定是 ID 选择器
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false
            },

            title: {
                text: '车辆转速'
            },

            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: {
                        linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
            },

            // the value axis
            yAxis: {
                min: 0,
                max: 60,

                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#666',

                tickPixelInterval: 30,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#666',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: '100r/min'
                },
                plotBands: [{
                    from: 0,
                    to: 40,
                    color: '#55BF3B' // green
                }, {
                    from: 40,
                    to: 50,
                    color: '#DDDF0D' // yellow
                }, {
                    from: 50,
                    to: 60,
                    color: '#DF5353' // red
                }]
            },

            series: [{
                name: 'Speed',
                data: [10],
                tooltip: {
                    valueSuffix: '00r/min'
                }
            }]

        }/*,
        // Add some life
        function (chart) {
            if (!chart.renderer.forExport) {
                setInterval(function () {
                    var point = chart.series[0].points[0],
                        newVal,
                        inc = Math.round((Math.random() - 0.5) * 20);

                    newVal = point.y + inc;
                    if (newVal < 0 || newVal > 60) {
                        newVal = point.y - inc;
                    }

                    point.update(newVal);

                }, 3000);
            }
        }*/);
    Gauge.socmeter = new Highcharts.Chart({
            chart: {
                renderTo:"gauge2",
                type: 'column'
            },
            title: {
                text: 'soc (剩余 电量 百分比)'
            },
            legend: {
                enabled: false
            },
            xAxis: {
                categories: ['soc']
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                shared: true
            },
            plotOptions: {
                column: {
                    stacking: 'percent'
                }
            },
            series: [{
                name: '已用电量',
                data: [4]
            }, {
                name: '未用电量',
                data: [6]
            }]
        }/*,
        function (chart) {
            if (!chart.renderer.forExport) {
                setInterval(function () {
                    var point = chart.series[0].points[0],
                        newVal,
                        inc = Math.round((Math.random() - 0.5) * 6);

                    newVal = point.y + inc;
                    if (newVal < 0 || newVal > 6) {
                        newVal = point.y - inc;
                    }

                    point.update(newVal);

                }, 3000);
            }
        }*/);

    Gauge.updateAll= function (values) {
        Gauge.speedmeter.series[0].points[0].update(values[0]);
        Gauge.tachometer.series[0].points[0].update(values[1]);
        Gauge.socmeter.series[0].points[0].update(values[2]);
    }
});