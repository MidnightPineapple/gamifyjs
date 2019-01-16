import { compose } from 'ramda'
import { UsesCustomObjects, EmitsEvents, UsesPlayerFunctions } from '../mixins'
import Scene from "../Scene";
import keys from '../keys';
import objs from "./customObjects";

export default class Demo extends compose(UsesPlayerFunctions,EmitsEvents,UsesCustomObjects(objs))(Scene) {

    constructor(params) {
        super({ ...params, key: keys.DEMO })
    }

    create() {
        this.cameras.main.setBackgroundColor("#1d212d");        

        this.map = this.add.tilemap("demomap", 16, 16);
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

        // TODO: custom behavior functions

        this.emitCollide([ [this.player, this.robot] ])
        this.emitOverlapZone(this.player, "hackable-range", this.robot)

        this.player.on(EmitsEvents.events.OVERLAP_ZONE + "_hackable-range", function() {
            // console.log("an object is in hacking range")
            this.getFunc("demo-function").execute();
        }, this)

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

        if(onGround && this.cursors.up.isDown) {
            this.player.jump()
        }
    }

}