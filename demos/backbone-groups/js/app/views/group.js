define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/group.html',
    'common'
], function($, _, Backbone, groupTemplate, Common) {
    /**
     * The View object for a Picture in the grid.
     * The view object is a div
     */
    var GroupView = Backbone.View.extend({
        tagName: "div",
        
        template: _.template(groupTemplate),
        
        events: {
            "click .add-pic": "addPic",
            "click .delete": "deleteGroup"
        },
        
        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },
        
        render: function() {
            var attrs = this.model.toJSON();
            attrs['id'] = this.model.id;
            this.$el.html(this.template(attrs));
            return this;
        },
        
        addPic: function() {
            console.log(this.model);
            this.model.addSubpic();
        },
        
        deleteGroup: function() {
            this.model.destroy();
        }
        
    });
    return GroupView;
});