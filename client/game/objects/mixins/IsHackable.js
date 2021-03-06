export default superclass => class Ishackable extends superclass {

    bindHackFunctionToClick(playerFunction, player) {
        let clicked;

        this.setInteractive();
        this.on('pointerup', () => {
            if(!player.isOverlapping(player.ZONES.HACK, this)) return;
            clicked = true;
            playerFunction.messenger.send();
            playerFunction.messenger.setPermissionCheckCallback(() => {
                if(!player.isOverlapping(player.ZONES.HACK, this)) return {
                    allowed:false, error:"Must be within hack zone to edit this function."
                }
                return { allowed: true }
            })  
        })
        
        player.overlapZone(player.ZONES.HACK, this);
        
        player.on(player.constants.OverlapsZones.OVERLAP_START + "_" + player.ZONES.HACK, (foreignObj) => {
            if(foreignObj !== this) return;
            this.hackSign = this.scene.add.sprite(this.x, this.y-32, "attention", 0);
            if(clicked) playerFunction.messenger.send();
        })

        player.on(player.constants.OverlapsZones.OVERLAP_END + "_" + player.ZONES.HACK, (foreignObj) => {
            if(foreignObj !== this) return;
            this.hackSign.destroy();
        })
    }

    preUpdate(time, delta) {
        if(typeof super.preUpdate === "function") super.preUpdate(time, delta);

        if(!this.hackSign) return;

        this.hackSign.x = this.x;
        this.hackSign.y = this.y-32;
    }

}