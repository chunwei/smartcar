/**
 * Created by chunwei on 2016/2/13.
 */

$(document).ready(function () {

    var w = $('.tab-content').width() / 2 - 15;
    var h = w;
    var gauge = new Gauge({
        renderTo: 'gauge',
        width: w,
        height: h,
        glow: false,
        units: 'Km/h',
        title: '瞬时车速',
        minValue: 0,
        maxValue: 220,
        majorTicks: ['0', '20', '40', '60', '80', '100', '120', '140', '160', '180', '200', '220'],
        minorTicks: 10,
        strokeTicks: false,
        highlights: [
            {from: 0, to: 80, color: 'rgba(73, 141, 216, 0.49)'},
            {from: 80, to: 120, color: 'rgba(37, 204, 86, 0.49)'},
            {from: 120, to: 160, color: 'rgba(237, 215, 21,0.49)'},
            {from: 160, to: 220, color: 'rgba(244, 67, 54, 0.49)'}
        ],
        colors: {
            plate: '#111',
            majorTicks: '#f5f5f5',
            minorTicks: '#ddd',
            title: '#fff',
            units: '#ccc',
            numbers: '#eee',
            valueText: {
                foreground: '#fff',
                shadow: 'rgba(0, 0, 0, 0.3)'
            },
            needle: {start: 'rgba(240, 128, 128, .8)', end: 'rgba(255, 160, 122, 1)'}
        },
        circles: {
            outerVisible: false,
            middleVisible: false,
            innerVisible: true
        },
        needle: {
            circle: {
                size: 0,
                inner: false,
                outer: true
            }
        },
        valueBox: {
            visible: false
        },
        valueFormat: {
            int: 3,
            dec: 0
        },
        animation: {
            delay: 10,
            duration: 200,
            fn: 'linear'
        }
    });

    gauge.onready = function () {
        setInterval(function () {
            gauge.setValue(Math.random() * 220);
        }, 1000);
    };

    gauge.draw();

    var gauge1 = new Gauge({
        renderTo: 'gauge1',
        width: w,
        height: h,
        glow: false,
        units: '100r/min',
        title: '瞬时转速',
        minValue: 0,
        maxValue: 80,
        majorTicks: ['0', '10', '20', '30', '40', '50', '60', '70', '80'],
        minorTicks: 10,
        strokeTicks: true,
        highlights: [
            {from: 60, to: 80, color: 'rgba(244, 67, 54, 0.49)'}
        ],
        colors: {
            plate: '#111',
            majorTicks: '#f5f5f5',
            minorTicks: '#ddd',
            title: '#fff',
            units: '#ccc',
            numbers: '#eee',
            valueText: {
                foreground: '#fff',
                shadow: 'rgba(0, 0, 0, 0.3)'
            },
            needle: {
                start: 'rgba(240, 128, 128, 0.8)',
                end: 'rgba(255, 160, 122, 1)',
                circle: {
                    outerStart: '#ccc',
                    outerEnd: '#ccc',
                    innerStart: '#222',
                    innerEnd: '#222'
                }
            }
        },
        circles: {
            outerVisible: false,
            middleVisible: false,
            innerVisible: true
        },
        needle: {
            circle: {
                size: 0,
                inner: false,
                outer: true
            }
        },
        valueBox: {
            visible: false
        },
        valueFormat: {
            int: 3,
            dec: 0
        },
        animation: {
            delay: 10,
            duration: 200,
            fn: 'linear'
        }
    });

    gauge1.onready = function () {
        setInterval(function () {
            gauge1.setValue(Math.random() * 80);
        }, 1000);
    };

    gauge1.draw();


    var gauge2 = new Gauge({
        renderTo: 'gauge2',
        width: w / 1.5,
        height: h / 1.5,
        glow: false,
        units: '%',
        title: '剩余电量',
        minValue: 0,
        maxValue: 100,
        majorTicks: ['0', '25', '50', '75', '100'],
        minorTicks: 10,
        strokeTicks: false,
        highlights: [
            {from: 0, to: 25, color: 'rgba(73, 141, 216, 0.1)'},
            {from: 25, to: 50, color: 'rgba(73, 141, 216, 0.25)'},
            {from: 50, to: 75, color: 'rgba(73, 141, 216,0.5)'},
            {from: 75, to: 100, color: 'rgba(73, 141, 216, 1)'}
        ],
        colors: {
            plate: '#222',
            majorTicks: '#f5f5f5',
            minorTicks: '#ddd',
            title: '#fff',
            units: '#ccc',
            numbers: '#eee',
            valueText: {
                foreground: '#fff',
                shadow: 'rgba(0, 0, 0, 0.3)'
            },
            needle: {
                start: 'rgba(255, 255, 255, .1)',
                end: 'rgba(255, 255, 255, 1)',
                circle: {
                    outerStart: '#ccc',
                    outerEnd: '#ccc',
                    innerStart: '#222',
                    innerEnd: '#222'
                },
                shadowUp: true,
                shadowDown: true
            },
        },
        circles: {
            outerVisible: false,
            middleVisible: false,
            innerVisible: false
        },
        needle: {
            //type: 'line',
            end: 75,
            start: 30,
            width: 3,
            circle: {
                size: 0,
                inner: false,
                outer: true
            }
        },
        valueBox: {
            visible: false
        },
        valueFormat: {
            int: 3,
            dec: 0
        },
        animation: {
            delay: 10,
            duration: 200,
            fn: 'linear'
        }
    });

    gauge2.onready = function () {
        setInterval(function () {
            gauge2.setValue(Math.random() * 100);
        }, 1000);
    };

    gauge2.draw();


    window.onresize = function () {
        var w = $('.tab-content').width() / 2 - 15;
        var h = w;
        gauge.updateConfig({
            width: w,
            height: h
        });
        gauge1.updateConfig({
            width: w,
            height: h
        });
        gauge2.updateConfig({
            width: w / 1.5,
            height: h / 1.5
        });
    };
});