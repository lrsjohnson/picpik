var picpik = picpik || {};

(function () {
    /**
     * A Collection of pictures:
     */ 
    picpik.PicSet = Backbone.Collection.extend({
        model: picpik.Pic,
        
        localStorage: new Backbone.LocalStorage("picpik-backbone"),
        
        deleted: function() {
            return this.where({deleted: true});
        },
        
        favorited: function() {
            return this.where({favorited: true});
        },
        
        nextPicId: function() {
            if (!this.length) return 1;
            return (this.last().get('picId') % 4) + 1;
        },
        
        comparator: 'order'
    });
    
    picpik.picSet = new picpik.PicSet();
})();