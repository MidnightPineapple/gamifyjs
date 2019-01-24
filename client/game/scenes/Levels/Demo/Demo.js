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
        this.robot2 = this.add.robot2(actionZone.x-50, actionZone.y);
        this.physics.add.collider(this.robot, platforms)
        this.physics.add.collider(this.robot2, platforms)
        this.robot.idle()

        this.input.keyboard.on("keydown_H", () => this.robot.run("left"))
        this.input.keyboard.on("keydown_U", () => this.robot.jump())
        this.input.keyboard.on("keyup_H", () => this.robot.idle())
        this.input.keyboard.on("keyup_K", () => this.robot.die())

        this.emitCollide([ [this.player, this.robot], [ this.robot2, this.robot ], [ this.player, this.robot2 ] ])
        this.player.overlapZone(this.player.ZONES.HACK, this.robot);

        const demoFunction = this.makeFunc("demo-function")
        const demoFunction2 = this.makeFunc("demo-function")


        // ! FOR DEBUG
        this.player.setOnDieCallback( ()=> {
            this.modal.jumbotron("You Died!", "Try Again! (space)")
            .setOnDismiss( () => this.scene.restart() )
        });
        // this.player.on(this.player.constants.OverlapsZones.OVERLAP_START + "_hackable-range", function() {
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

        this.robot2.moveToward(this.player)
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
    
}