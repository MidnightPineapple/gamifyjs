import Level from '../Level';
import keys from '../../keys';
import customObjects from "./customObjects";

const playerFunctionMetas = [ 
    { functionId:"demo-function", template:"demo-function" }, 
    { functionId:"demo-function2", template:"demo-function" } 
]

export default class Demo extends Level({customObjects, playerFunctionMetas, tilemapData: {
    tilemapKey: 'demomap',
    layerKeys: [ "behind-player", "platforms", "above-player" ]
}}) {

    constructor(params) {
        super({ ...params, key: keys.DEMO })
    }

    create() {

        // BUG: i won't be able to put the above player layer above as it is right now

        const spawnPoint = this.checkpoint === 0 ? this.getMapObjectByName("objects", "spawn") : {x:500,y:500}
        const actionZone = this.getMapObjectByName("objects", "action")

        this.player = this.add.player(spawnPoint.x, spawnPoint.y - 20)
        this.savePoint = this.add.torch(spawnPoint.x + 300, spawnPoint.y - 20, { player: this.player })
        this.savePoint.setCheckpointCallback(() => {
            this.stateManager.sendCheckpointReached(this.scene.key, 1)
        })
        
        this.robot = this.add.robot(actionZone.x, actionZone.y)
        // this.robot2 = this.add.robot2(actionZone.x-50, actionZone.y);
        this.box = this.add.box(500,550, { player:this.player })
        
        this.robot.idle()
        
        this.allEmitCollideOne(this.getMapLayer("platforms"), [ this.player, this.robot, this.box /*, this.robot2 */]);
        
        this.input.keyboard.on("keydown_H", () => this.robot.run("left"))
        this.input.keyboard.on("keydown_U", () => this.robot.jump())
        this.input.keyboard.on("keyup_H", () => this.robot.idle())
        this.input.keyboard.on("keydown_K", () => this.robot.run("right"))
        
        
        this.emitCollideAll([ this.player, this.robot, this.box /*, this.robot2 */ ])
        // this.player.overlapZone(this.player.ZONES.HACK, this.robot2);
        // this.player.overlapZone(this.player.ZONES.HACK, this.robot);
        
        this.box.blue();
        const demoFunction = this.getFunc("demo-function")

        // this.robot.bindHackFunctionToClick(demoFunction, this.player)

        this.box.bindHackFunctionToClick(demoFunction, this.player)
        
        demoFunction.attachOnEditFinishedListener( () => {
            const funcRes = demoFunction.execute();
            this.box.changeColor(funcRes)
        })


        // this.demoFunction2 = this.makeFunc("demo-function", "demolevel2")

        this.add.keyA(100, 100)


        // ! FOR DEBUG
        
        this.player.setOnDieCallback( ()=> {
            this.modal.jumbotron("You Died!", "Try Again! (space)")
            .setOnDismiss( () => this.scene.restart() )
        });
        // this.player.on([this.player.constants.OverlapsZones.OVERLAP_START,this.player.ZONES.HACK].join("_"), function(foreignObj) {
        //     demoFunction.messenger.send(); // TODO: object mixin that binds a function to an object by setting onclick to sending the function... but only if its overlapping? which can be checked by player.isOverlapping
        //     demoFunction.messenger.setPermissionCheckCallback(() => {
        //         if(this.player.isOverlapping(this.player.ZONES.HACK, foreignObj)) {
        //             return { allowed: true }
        //         } else {
        //             return { allowed: false, error: "You must be in hacking range to hack an object!"}
        //         }
        //     })
        //     this.robot2.die();
        // }, this)
        // this.player.on([this.player.constants.OverlapsZones.OVERLAP_END,this.player.ZONES.HACK].join("_"), function() {
        //     demoFunction.messenger.revoke();
        // }, this)
        // this.player.on(this.player.constants.OverlapsZones.OVERLAP_EVENT + "_hackable-range", function() {
        //     // demoFunction.execute();
        //     console.log("overlapping")
        // }, this)

        // how to run a function right after it finishes being edited
        // demoFunction.messenger.send();

        this.cursor = this.input.keyboard.createCursorKeys()
    }
    
    update(...args) {
        if(typeof super.update === "function") super.update(...args)

        // if(this.robot2.isAlive) this.robot2.moveToward(this.player);
        //this.robot.patrol();
    }

    keydown_left() {
        this.player.run("left")
    }

    keyup_left() {
        this.player.idle();
    }

    keydown_right() {
        this.player.run("right");
    }

    keyup_right() {
        this.player.idle();
    }

    keydown_up() {
        this.player.jump()
    }
    
    keyup_SPACE() {
        const overlapping = this.player.getOverlappingObjects(this.player.ZONES.HACK)

        for( const obj of overlapping ) {
            if(obj === this.robot) {
                this.demoFunction2.messenger.send();
            }
        }
    }
}