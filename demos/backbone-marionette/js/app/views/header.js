define([
    'jquery',
    'underscore',
    'backbone',
    'collections/picset',
    'views/pic',
    'text!templates/stats.html',
    'common'
], function($, _, Backbone, PicSet, PicView, statsTemplate, Common) {
    /**
     * The top-level piece of UI for the App.
     */
    var Header = Backbone.View.extend({
            template: '#template-header',
            ui: {
                input: '#add-pic'
            },
            
        }                                      
    });
    return AppView;
});