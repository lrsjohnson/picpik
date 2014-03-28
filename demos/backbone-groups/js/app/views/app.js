define([
    'jquery',
    'underscore',
    'backbone',
    'collections/picset',
    'collections/group-collection',    
    'views/pic',
    'views/group',
    'text!templates/stats.html',
    'common'
], function($, _, Backbone, PicSet, GroupCollection, 
            PicView, 
            GroupView,
            statsTemplate, Common) {
    /**
     * The top-level piece of UI for the App.
     */
    var AppView = Backbone.View.extend({
        el: "#picpikapp",
        
        statsTemplate: _.template(statsTemplate),
        
        events: {
            "click #add-pic": "createPic",
            "click #add-group": "createGroup",
            "click #destroy-deleted": "destroyDeleted",
        },
        
        initialize: function() {   
            Common.PicSet = new PicSet();
            Common.GroupCollection = new GroupCollection();
            
            this.listenTo(Common.PicSet, 'add', this.addOne);
            this.listenTo(Common.PicSet, 'reset', this.addAll);
            this.listenTo(Common.PicSet, 'all', this.render);
            this.listenTo(Common.PicSet, 'change:completed', this.filterOne);
            this.listenTo(Common.PicSet, 'filter', this.filterAll);
            
            this.listenTo(Common.GroupCollection, 'add', this.addOneGroup);
            this.listenTo(Common.GroupCollection, 'reset', this.addAllGroups);
            this.listenTo(Common.GroupCollection, 'all', this.render);
            
            
            this.$main = $('#main');
            
            
            
            this.$footer = $('#footer-stats');
            
            
            Common.GroupCollection.fetch();
            Common.PicSet.fetch();
        },
        
        render: function() {
            var deleted = Common.PicSet.deleted().length;
            var favorited = Common.PicSet.favorited().length;
                        
            this.$footer.html(this.statsTemplate({
                num_favorited: favorited,
                num_deleted: deleted
            }));
            
            this.$('#filters a').removeClass('selected')
            .filter('[href="#/' + (Common.picFilter || '') + '"]')
            .addClass('selected');            
                        
        },
                              
                              
        addOneGroup: function(group) {
            var view = new GroupView({model: group});
            this.$main.append(view.render().el);
        },
        
        addAllGroups: function() {
            Common.GroupCollection.each(this.addOneGroup, this);
        },
                              
        
        addOne: function(pic) {
            var view = new PicView({model: pic});
            this.$('#pic-grid').append(view.render().el);
        },
        
        addAll: function() {
            Common.PicSet.each(this.addOne, this);
        },
        
        filterOne: function (pic) {
            pic.trigger('visible');
        },
        
        filterAll: function() {
            Common.PicSet.each(this.filterOne, this);
        },
        
        createPic: function(e) {
            console.log('create pic!');
            Common.PicSet.create({title: "New Pic"});
        },
        
        createGroup: function(e) {
            console.log('create group!');
            Common.GroupCollection.create({groupName: "Another group"});
        },
        
        destroyDeleted: function(e) {
            Common.PicSet.destroyDeleted();
        }
        
    });
    return AppView;
});