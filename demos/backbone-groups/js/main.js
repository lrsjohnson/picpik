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
        backboneRelational: {
            deps: [
                'backbone'
            ]
        }
    },
    paths: {
        jquery: '../lib/jquery',
        underscore: '../lib/underscore',
        backbone: '../lib/backbone',
        backboneLocalstorage: '../lib/backbone.localStorage',
        text: '../lib/requirejs-text',
        backboneRelational: '../lib/backbone-relational'
    }
});

require([
    'backbone',
    'views/app',
    'routers/router'
], function(Backbone, AppView, Workspace) {
    // Start routing and Backbone.history()
    new Workspace();
    Backbone.history.start();
    
    // Initialize the application view
    new AppView();
});