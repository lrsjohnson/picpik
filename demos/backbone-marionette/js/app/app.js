define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
], function($, _, Backbone, Marionette) {
    /**
     * The top-level piece of UI for the App.
     */
    var PicPikApp = new Backbone.Marionette.Application();
    PicPikApp.addRegions({
        header: '#header',
        main: '#main',
        footer: '#footer',
    });
    
    PicPikApp.on('initalize:after', function() {
        Backbone.history.start();
    });
});