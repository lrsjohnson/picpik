var picpik = picpik || {};

(function () { 
    picpik.PicsRouter = Backbone.Router.extend({
        routes: {
            '*filter': 'setFilter'
        },
        
        setFilter: function (param) {
            picpik.picFilter = param || '';
            
            picpik.picSet.trigger('filter');
        }
    });
    
    picpik.router = new picpik.PicsRouter();
    Backbone.history.start();
})();