define([
    'underscore',
    'backbone',
    'backboneLocalstorage',
    'models/group'
], function(_, Backbone, Store, Group) {
    /**
     * A Collection of groups:
     */ 
    var GroupCollection = Backbone.Collection.extend({
        model: Group,
        localStorage: new Backbone.LocalStorage("picpik-groups-groups"),
    });
    
    // PicSet is a "singleton" picture set
    return GroupCollection;
});