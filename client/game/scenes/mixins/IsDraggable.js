export default superclass => {

    let defaultY, maxY, minY;

    const positionDragZone = ({ centerX, centerY, height, width }, zone, dragX, dragY) => {
        const cameraY = centerY - height / 2
        const cameraX = centerX - width / 2
        zone.setSize(width, height)
        zone.setX(dragX || cameraX);
        zone.setY(dragY || cameraY);
    }

    const setPeekHeight = (scene,y) => {
        if( y < minY ) return false;
        if( y > maxY ) return false;
        scene.cameras.main.setPosition(0, y);
        scene.scene.bringToTop();
        return true;
    }

    return class IsDraggable extends superclass {
        init(args) {
            if(typeof super.init === "function") super.init(args)

            const { height } = this.sys.game.canvas;

            defaultY = this.defaultPositionY || 0;
            maxY = this.maxPositionY || height; 
            minY = this.minPositionY || 0;

            if(!args.parent) return;
            const { parent } = args;

            const dragZone = parent.add.zone(0, 0, 10, 10)
            .setInteractive()
            .setOrigin(0,0);
            parent.input.setDraggable(dragZone);  
            dragZone.on("drag", function(pointer, dragX, dragY) {
                if(setPeekHeight(this, dragY)) {
                    positionDragZone(this.cameras.main, dragZone, null, dragY)
                }
            }, this)

            // * This sets Y of scene only, doesn't support dragX
            setPeekHeight(this, defaultY);
            positionDragZone(this.cameras.main, dragZone);

            this.cameras.main.on("setviewport", () => {
                positionDragZone(this.cameras.main, dragZone);
            })
            this.events.on("shutdown", () => dragZone.destroy())
        }

    }

}