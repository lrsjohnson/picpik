require.config({
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
    baseUrl: 'js/app',
    
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        backboneLocalstorage: {
            deps: ['backbone'],
            exports: 'Store'
        },
        backboneMarionette: {
            deps: ['jquery', 'underscore', 'backbone'],
            exports: 'Marionette'
        },
    },
    paths: {
        jquery: '../lib/jquery',
        underscore: '../lib/underscore',
        backbone: '../lib/backbone',
        backboneLocalstorage: '../lib/backbone.localStorage',
        text: '../lib/requirejs-text'
        backboneLocalstorage: '../lib/backbone.marionette',
        
    }
});

require([
    'app',
    'backbone',
    'routers/index',
    'controllers/index'
], function(picpikApp, Backbone, Router, Controller) {
    picpikApp.init();
    new Router({
        controller: Controller
    });
    Backbone.history.start();
});