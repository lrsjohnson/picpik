define([
    'underscore',
    'backbone',
    'backboneRelational',
    'require',
    'models/pic',
    'collections/picset',
    'common'
], function (_, Backbone, BackboneRelational, require,
             Pic,
             PicSet,
             Common) {
    'use strict';
    /**
     * The basic Group model represents a group of photos. A group has many photos.
     */
    var Group = Backbone.RelationalModel.extend({
        /*
         * Relations for the group: 
         *
         * A group has many photos. Each photo is in one group
         * A group has many subgroups. Each group is in at most one parent
         */
        
        relations: [{
            type: Backbone.HasMany,
            key: 'pics',
            relatedModel: Pic,
            collectionType: PicSet,
            reverseRelation: {
                key: 'group',
                includeInJSON: true
            },
            autoFetch: true,
            includeInJSON: false
        }],
        
        /*
         * Default attribtues for the group. Ensures it has the deleted
         * and favorited attributes.
         */
        defaults: function() {
            return {
                groupName: "Untitled Group",
                order: 1
            };
        },
        
        addSubpic: function() {
            var pic = Common.PicSet.create({title: "New Pic",
                                     group: this});
        }
    });
    return Group;
});