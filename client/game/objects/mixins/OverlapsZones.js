const OverlapsZonesFactory = superclass => {

    const zones = {};

    class OverlapsZones extends superclass {

        constructor(...args) {
            super(...args);
            Object.assign(this.constants, { OverlapsZones: CONSTANTS });
        }

        addZone(key, width, height) {
            const zone = this.scene.add.zone(this.x,this.y, width, height);
            this.scene.physics.world.enable(zone);
            zone.body.setAllowGravity(false);
            zone.body.moves = false;
            zone.overlapping = new Map() // < Key:GameObj, Value: number >
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
            const eventSuffix = "_"+key;

            zone.overlapping.set(foreignObj, { state: 0, eventSuffix }); // 0 for not overlapping, 1 or 2 for overlapping
            this.scene.physics.add.overlap(foreignObj, zone, function(foreignObj){
                const overlapping = zone.overlapping.get(foreignObj);
                if(overlapping.state === 0) {
                    thisObj.emit(OverlapsZonesFactory.CONSTANTS.OVERLAP_START + eventSuffix, foreignObj);
                }
                if(overlapping.state === 0 || overlapping.state === 1) {
                    zone.overlapping.set(foreignObj, { state: 2, eventSuffix });
                }
                if(typeof cb ==="function") cb(thisObj, foreignObj);
                thisObj.emit(OverlapsZonesFactory.CONSTANTS.OVERLAP_EVENT + eventSuffix, foreignObj);
            }, null, ctx)
        }

        isOverlapping(key, foreignObj) {
            const zone = zones[key];
            return zone.overlapping.get(foreignObj).state > 0;
        }

        preUpdate(...args) {
            if(typeof super.preUpdate === "function") super.preUpdate(...args);
            for( const zone of Object.values(zones) ) {
                zone.x = this.x;
                zone.y = this.y;
                
                for( let obj of zone.overlapping.keys() ) {
                    const { state: overlapping, eventSuffix } = zone.overlapping.get(obj);
                    if(overlapping === 1) {
                        this.emit(OverlapsZonesFactory.CONSTANTS.OVERLAP_END + eventSuffix, this, obj)
                    }
                    if(overlapping > 0) {
                        zone.overlapping.set(obj, { state: overlapping - 1, eventSuffix });
                    }
                }
            }
        }

        getOverlappingObjects(key) {
            const zone = zones[key];
            const result = [];
            for( const obj of zone.overlapping.keys() )  {
                if(this.isOverlapping(key, obj)) {
                    result.push(obj);
                }
            }
            return result;   
        }
        
    }

    return OverlapsZones;
}

const CONSTANTS = {
    OVERLAP_EVENT: "overlap_zone_overlapping", 
    OVERLAP_START: "overlap_zone_start",
    OVERLAP_END: "overlap_zone_end"
}

Object.assign(OverlapsZonesFactory, { CONSTANTS })

export default OverlapsZonesFactory;