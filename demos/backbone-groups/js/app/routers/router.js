define([
    'jquery',
    'backbone',
    'collections/picset',
    'common'
], function ($, Backbone, PicSet, Common) {
    var PicsRouter = Backbone.Router.extend({
        routes: {
            '*filter': 'setFilter'
        },
        
        setFilter: function (param) {
            Common.picFilter = param || '';
            
            if (Common.PicSet) {
                Common.PicSet.trigger('filter');
            }
        }
    });
    
    return PicsRouter;
});