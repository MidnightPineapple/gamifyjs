export default superclass => {

    const zones = {};

    class OverlapsZones extends superclass {

        addZone(key, width, height) {
            const zone = this.scene.add.zone(this.x,this.y, width, height);
            this.scene.physics.world.enable(zone);
            zone.body.setAllowGravity(false);
            zone.body.moves = false;
            zones[key] = zone;
            return zone;
        }

        destroyZone(key) {
            zones[key].destroy();
            delete zones[key];
        }

        overlapZone(key, foreignObj, cb, ctx) {
            const zone = zones[key];
            const thisObj = this;
            this.scene.physics.add.overlap(foreignObj, zone, function(foreignObj){
                cb(thisObj, foreignObj);
            }, null, ctx)
        }

        preUpdate(...args) {
            if(typeof super.preUpdate === "function") super.preUpdate(...args);
            for( const zone of Object.values(zones) ) {
                zone.x = this.x;
                zone.y = this.y;
            }
        }
        
    }

    return OverlapsZones;
}