define([
    'underscore',
    'backbone',
    'backboneRelational',    
    'require',
    'common'
], function (_, Backbone, BackboneRelational, require, Common) {
    'use strict';
    /**
     * The basic Pic Model represents an image that can be
     * favorited or deleted as needed.
     */
    var Pic = Backbone.RelationalModel.extend({
        /*
         * Default attribtues for the pic. Ensures it has the deleted
         * and favorited attributes.
         */
        defaults: function() {
            return {
                title: "Untitled Photo",
                deleted: false,
                favorited: false,
                picId: Common.PicSet.nextPicId(),
            };
        },
        
        toggleFavorited: function() {
            this.save({favorited: !this.get("favorited")});
        },
        
        toggleDeleted: function() {
            this.save({deleted: !this.get("deleted")});
        },        
    });
    return Pic;
});