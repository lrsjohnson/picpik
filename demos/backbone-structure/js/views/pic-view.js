var picpik = picpik || {};

(function ($) { 
    /**
     * The View object for a Picture in the grid.
     * The view object is a div
     */
    picpik.PicView = Backbone.View.extend({
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
                (!isFavorited && picpik.picFilter === "favorited") ||
                (isDeleted && picpik.picFilter != "deleted") ||
                (!isDeleted && picpik.picFilter === "deleted")
            );
        },
    });
})(jQuery);