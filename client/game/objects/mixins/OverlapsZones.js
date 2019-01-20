export default superclass => {

    const zones = {};

    class OverlapsZones extends superclass {

        addZone(key, width, height) {
            const zone = this.scene.add.zone(this.x,this.y, width, height);
            this.scene.physics.world.enable(zone);
            zone.body.setAllowGravity(false);
            zone.body.moves = false;
            zone.overlapping = new Map() // < Key: GameObj, Value: number >
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
            zone.overlapping.set(foreignObj, 0); // 0 for not overlapping, 1 or 2 for overlapping
            this.scene.physics.add.overlap(foreignObj, zone, function(foreignObj){
                cb(thisObj, foreignObj);

                const overlapping = zone.overlapping.get(foreignObj);
                if(overlapping === 0 || overlapping === 1) {
                    zone.overlapping.set(foreignObj, 2);
                }
            }, null, ctx)
        }

        isOverlapping(key, foreignObj) {
            const zone = zones[key];
            return zone.overlapping.get(foreignObj) > 0;
        }

        preUpdate(...args) {
            if(typeof super.preUpdate === "function") super.preUpdate(...args);
            for( const zone of Object.values(zones) ) {
                zone.x = this.x;
                zone.y = this.y;
                
                for( let obj of zone.overlapping.keys() ) {
                    const overlapping = zone.overlapping.get(obj);
                    if(overlapping > 0) {
                        zone.overlapping.set(obj, overlapping - 1);
                    }
                }
            }
        }
        
    }

    return OverlapsZones;
}