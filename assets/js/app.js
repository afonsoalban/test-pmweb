requirejs.config({
	urlArgs: "bust=v2"+ new Date().getTime(),
    baseUrl: 'assets/js/lib',
    paths: {
        modules: '../modules',
        TweenMax: 'TweenMax',
        TimelineMax: 'TweenMax'
    }
});

requirejs(['modules/main']);

var _APP = {};