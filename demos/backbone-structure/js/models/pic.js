var picpik = picpik || {};

(function () {
    'use strict';
    
    /**
     * The basic Pic Model represents an image that can be
     * favorited or deleted as needed.
     */
    picpik.Pic = Backbone.Model.extend({
        
        /*
         * Default attribtues for the pic. Ensures it has the deleted
         * and favorited attributes.
         */
        defaults: function() {
            return {
                title: "Untitled Photo",
                deleted: false,
                favorited: false,
                picId: picpik.picSet.nextPicId(),
            };
        },
        
        toggleFavorited: function() {
            this.save({favorited: !this.get("favorited")});
        },
        
        toggleDeleted: function() {
            this.save({deleted: !this.get("deleted")});
        },        
    });
})();