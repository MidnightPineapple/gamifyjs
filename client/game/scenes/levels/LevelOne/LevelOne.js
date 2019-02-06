import Level from '../Level';
import customObjects from './customObjects';
import keys from '../../keys';
import playerFunctionMetas from './playerFunctionMetas'

export default class LevelOne extends Level({ customObjects, playerFunctionMetas, tilemapData: {
    tilemapKey: "LevelOne",
    layerKeys: [ "behind-player", "platforms" ]
} }) {
    
    constructor(params) {
        super({ key: keys.LEVEL_ONE, ...params})
    }

    create() {

        const checkpoints = this.getMapObjectLayer("savepoints").objects.sort((a,b) => a.name - b.name);

        const spawnPoints = [
            this.getMapObjectByName("spawn-player", "player"),
            ...checkpoints
        ]

        this.player = this.add.player(spawnPoints[this.checkpoint].cx, spawnPoints[this.checkpoint].cy);
        this.registerPlayer(this.player)
        this.cameras.main.startFollow(this.player);


        // ! BUG: for some reason, we keep sending checkpoint reached messages. not just once
        const checkpointTorches = spawnPoints.filter((c,k) => k>0).map( (c,k) => this.add.torch(c.cx, c.cy, { player: this.player })
            .setCheckpointCallback(() => {
                this.stateManager.sendCheckpointReached(this.scene.key, k+1)
            })
        )
        
        const boxData = this.getMapObjectLayer("spawn-box").objects
        const boxes = boxData.map( o => {
            const box = this.add.box(o.cx, o.cy, { player: this.player })
            box.setData("info", o);
            return box
        })

        this.allEmitCollideOne(this.getMapLayer("platforms"), [ this.player, ...checkpointTorches, ...boxes ]);
        this.emitCollideAll( [ this.player, ...boxes ] )

        boxes.forEach( (o,k)=>{
            const { type } = o.data.values.info;
            const func = this.getFunc("box"+k)
            o.bindHackFunctionToClick(func, this.player)
            o.setData("playerFunction", func)
            func.attachOnEditFinishedListener(() => {
                const res = func.execute();
                switch(typeof res) {
                    case "string":
                        o.red();
                        break;
                    case "number":
                        o.green();
                        break;
                    case "boolean":
                        o.blue();
                        break;
                }
            })

            switch(type) {
                case "mobile": 
                    o.green();
                    break;
                case "solid":
                    o.blue();
                    break;
                case "ghost":
                    o.red();
                    break;
            }
        })

        const teleportZoneData = this.getMapObjectLayer("teleport-zone").objects[0]
        this.add.interactionZone(teleportZoneData.x, teleportZoneData.y, {
            width: teleportZoneData.width, 
            height: teleportZoneData.height,
            player: this.player,
            onOverlap: () => this.modal.jumbotron("You Win!", "Back to main menu (space)", () => this.scene.start(keys.MAIN_MENU))
        });

        this.getMapObjectLayer("dialogue-zones").objects.map( zoneData => {

            const dialogue = zoneData.properties[0].value.split(";;")

            const zone = this.add.interactionZone(zoneData.x, zoneData.y, {
                width: zoneData.width, 
                height: zoneData.height,
                player: this.player,
                onOverlap: () => {
                    this.modal.alert(dialogue)
                } 
            })
            return zone;
        }) 
    }

}