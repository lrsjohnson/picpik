 var picpik = picpik || {};

(function () { 
    /**
     * The top-level piece of UI for the App.
     */
    picpik.AppView = Backbone.View.extend({
        el: $("#picpikapp"),
        
        statsTemplate: _.template($('#stats-template').html()), 
        
        events: {
            "click #add-pic": "createPic"
        },
        
        initialize: function() {            
            this.listenTo(picpik.picSet, 'add', this.addOne);
            this.listenTo(picpik.picSet, 'reset', this.addAll);
            this.listenTo(picpik.picSet, 'all', this.render);
            this.listenTo(picpik.picSet, 'change:completed', this.filterOne);
            this.listenTo(picpik.picSet, 'filter', this.filterAll);
            
            this.$main = $('#main');
            
            this.$footer = $('#footer-stats');
            
            picpik.picSet.fetch();
        },
        
        render: function() {
            var deleted = picpik.picSet.deleted().length;
            var favorited = picpik.picSet.favorited().length;
                        
            this.$footer.html(this.statsTemplate({
                num_favorited: favorited,
                num_deleted: deleted
            }));
            
            this.$('#filters a').removeClass('selected')
            .filter('[href="#/' + (picpik.picFilter || '') + '"]')
            .addClass('selected');
            
        },
        
        addOne: function(pic) {
            var view = new picpik.PicView({model: pic});
            this.$('#pic-grid').append(view.render().el);
        },
        
        addAll: function() {
            picpik.picSet.each(this.addOne, this);
        },
        
        filterOne: function (pic) {
            pic.trigger('visible');
        },
        
        filterAll: function() {
            picpik.picSet.each(this.filterOne, this);
        },
        
        createPic: function(e) {
            console.log('create pic!');
            picpik.picSet.create({title: "New Pic"});
        },
        
    });
})();