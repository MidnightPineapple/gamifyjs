import { compose } from 'ramda'
import Level from '../Level';
import keys from '../../keys';
import customObjects from "./customObjects";

export default class Demo extends Level({customObjects}) {

    constructor(params) {
        super({ ...params, key: keys.DEMO })
    }

    create() {
        this.cameras.main.setBackgroundColor("#1d212d");        

        this.map = this.add.tilemap("demomap", 32, 32);
        const tileset = this.map.addTilesetImage("Industrial", "industrial-tileset")

        this.map.createStaticLayer("behind-player", tileset, 0, 0)
        const platforms = this.map.createStaticLayer("platforms", tileset, 0, 0)
        .setCollisionByProperty({ collides: true })
        this.map.createStaticLayer("above-player", tileset, 0, 0)
        .setDepth(10)
        
        const spawnPoint = this.map.findObject("objects", o => o.name === "spawn")
        const actionZone = this.map.findObject("objects", o => o.name === "action")

        this.player = this.add.player(spawnPoint.x, spawnPoint.y)
        this.physics.add.collider(this.player, platforms)
        
        this.robot = this.add.robot(actionZone.x, actionZone.y)
        this.physics.add.collider(this.robot, platforms)
        this.robot.idle()

        this.cursors = this.input.keyboard.createCursorKeys();

        this.input.keyboard.on("keydown_A", () => this.robot.move("left"))
        this.input.keyboard.on("keyup_A", () => this.robot.idle())

        this.emitCollide([ [this.player, this.robot] ])
        this.player.overlapZone("hackable-range", this.robot)

        const demoFunction = this.makeFunc("demo-function")
        const demoFunction2 = this.makeFunc("demo-function")


        // ! FOR DEBUG
        // this.player.on(this.player.constants.OverlapsZones.OVERLAP_START + "_hackable-range", function() {
        //     demoFunction.execute();
        // }, this)
        // this.player.on(this.player.constants.OverlapsZones.OVERLAP_EVENT + "_hackable-range", function() {
        //     // demoFunction.execute();
        //     console.log("overlapping")
        // }, this)
        // this.player.on(this.player.constants.OverlapsZones.OVERLAP_END + "_hackable-range", function() {
        //     // demoFunction.execute();
        //     console.log("end")
        // }, this)

        // how to run a function right after it finishes being edited
        demoFunction.messenger.send();
        demoFunction.lines.setOnEditFinishedCallback( () => {
            demoFunction.execute();
        })

        // demoFunction2.messenger.send();
        
        

    }
    
    update(...args) {
        if(typeof super.update === "function") super.update(...args)
        const onGround = this.player.onGround()
        
        // TODO: abstract the cursor & keyboard logic into a mixin
        // TODO: add in support for a lot more keys if necessary
        if(this.cursors.right.isDown) {
            this.player.run("right")
        } else if(this.cursors.left.isDown) {
            this.player.run("left")
        } else {
            this.player.idle()
        }
        
        if(this.cursors.up.isDown) {
            this.player.jump()
        }
    }
    
}