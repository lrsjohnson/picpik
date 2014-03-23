var app = {};
$(function() {
    app.picFilter = "";
    
    /**
     * The basic Pic Model represents an image that can be
     * favorited or deleted as needed.
     */
    var Pic = Backbone.Model.extend({
        defaults: function() {
            return {
                title: "Untitled Photo",
                deleted: false,
                favorited: false,
                order: 0,
            };
        },
        
        toggleFavorited: function() {
            this.save({favorited: !this.get("favorited")});
        },
        
        toggleDeleted: function() {
            this.save({deleted: !this.get("deleted")});
        },        
    });
    
    
    /**
     * A Collection of pictures:
     */ 
    var PicSet = Backbone.Collection.extend({
        model: Pic,
        
        localStorage: new Backbone.LocalStorage("picpik-backbone"),
        
        deleted: function() {
            return this.where({deleted: true});
        },
        
        favorited: function() {
            return this.where({favorited: true});
        },
        
        nextOrder: function() {
            if (!this.length) return 1;
            return this.last().get('order') + 1;
        },
        
        comparator: 'order'
    });
    
    var Pics = new PicSet;
    
    /**
     * The View object for a Picture in the grid.
     * The view object is a div
     */
    var PicView = Backbone.View.extend({
        tagName: "div",
        
        template: _.template($("#pic-template").html()),
        
        events: {
            "click  .favorite" : "toggleFavorited",
            "click  .delete" : "toggleDeleted",
        },
        
        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'visible', this.toggleVisible);
        },
        
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.toggleClass('favorited', this.model.get('favorited'));
            this.toggleVisible();
            return this;
        },
        
        toggleFavorited: function() {
            this.model.toggleFavorited();
        },
        
        toggleDeleted: function() {
            this.$el.fadeOut(400, (function() {
                this.model.toggleDeleted();
            }).bind(this));
        },
        
        toggleVisible: function() {
            if (this.isHidden()) {
                this.$el.hide();
            } else {
                this.$el.show();
            }
        },
        
        isHidden: function() {
            console.log('Check isHidden');
            var isDeleted = this.model.get('deleted');
            var isFavorited = this.model.get('favorited');
            console.log(isFavorited);
            return (
                (!isFavorited && app.picFilter === "favorited") ||
                (isDeleted && app.picFilter != "deleted") ||
                (!isDeleted && app.picFilter === "deleted")
            );
        },
    });
    
    /**
     * The top-level piece of UI for the App.
     */
    var AppView = Backbone.View.extend({
        el: $("#picpikapp"),
        
        statsTemplate: _.template($('#stats-template').html()), 
        
        events: {
            "click #add-pic": "createPic"
        },
        
        initialize: function() {            
            this.listenTo(Pics, 'add', this.addOne);
            this.listenTo(Pics, 'reset', this.addAll);
            this.listenTo(Pics, 'all', this.render);
            this.listenTo(Pics, 'change:completed', this.filterOne);
            this.listenTo(Pics, 'filter', this.filterAll);
            
            this.$main = $('#main');
            
            this.$footer = $('#footer-stats');
            
            Pics.fetch();
        },
        
        render: function() {
            var deleted = Pics.deleted().length;
            var favorited = Pics.favorited().length;
                        
            this.$footer.html(this.statsTemplate({
                num_favorited: favorited,
                num_deleted: deleted
            }));
            
            this.$('#filters a').removeClass('selected')
            .filter('[href="#/' + (app.picFilter || '') + '"]')
            .addClass('selected');
            
        },
        
        addOne: function(pic) {
            var view = new PicView({model: pic});
            this.$('#pic-grid').append(view.render().el);
        },
        
        addAll: function() {
            Pics.each(this.addOne, this);
        },
        
        filterOne: function (pic) {
            pic.trigger('visible');
        },
        
        filterAll: function() {
            Pics.each(this.filterOne, this);
        },
        
        createPic: function(e) {
            console.log('create pic!');
            Pics.create({title: "New Pic"});
        },
        
    });
    
    var App = new AppView;
    
    var PicsRouter = Backbone.Router.extend({
        routes: {
            '*filter': 'setFilter'
        },
        
        setFilter: function (param) {
            app.picFilter = param || '';
            
            Pics.trigger('filter');
        }
    });
    
    var PicPikRouter = new PicsRouter();
    Backbone.history.start();

});