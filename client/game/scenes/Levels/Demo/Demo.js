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

        this.player = this.add.player(spawnPoint.x, spawnPoint.y - 20)
        this.physics.add.collider(this.player, platforms)
        
        this.robot = this.add.robot(actionZone.x, actionZone.y)
        this.robot2 = this.add.robot2(actionZone.x-50, actionZone.y);
        this.physics.add.collider(this.robot, platforms)
        this.physics.add.collider(this.robot2, platforms)
        this.robot.idle()

        this.input.keyboard.on("keydown_H", () => this.robot.run("left"))
        this.input.keyboard.on("keydown_U", () => this.robot.jump())
        this.input.keyboard.on("keyup_H", () => this.robot.idle())
        this.input.keyboard.on("keydown_K", () => this.player.jump())

        this.emitCollide([ [this.player, this.robot], [ this.robot2, this.robot ], [ this.player, this.robot2 ] ])
        this.player.overlapZone(this.player.ZONES.HACK, this.robot2);

        const demoFunction = this.makeFunc("demo-function", "demolevel1")
        this.demoFunction2 = this.makeFunc("demo-function", "demolevel2")

        // ! FOR DEBUG


        this.player.setOnDieCallback( ()=> {
            this.modal.jumbotron("You Died!", "Try Again! (space)")
            .setOnDismiss( () => this.scene.restart() )
        });
        this.player.on([this.player.constants.OverlapsZones.OVERLAP_START,this.player.ZONES.HACK].join("_"), function() {
            this.robot2.die();
            demoFunction.messenger.send();
        }, this)
        this.player.on([this.player.constants.OverlapsZones.OVERLAP_END,this.player.ZONES.HACK].join("_"), function() {
            demoFunction.messenger.revoke();
            // TODO: also add a way to check if we're in hackable range before executing. 
            // I could add a class pF.context that holds all gameobjects player must be near to hack it?
        }, this)
        // this.player.on(this.player.constants.OverlapsZones.OVERLAP_EVENT + "_hackable-range", function() {
        //     // demoFunction.execute();
        //     console.log("overlapping")
        // }, this)

        // how to run a function right after it finishes being edited
        // demoFunction.messenger.send();
        demoFunction.lines.setOnEditFinishedCallback( () => {
            demoFunction.execute();
        })

        this.cursor = this.input.keyboard.createCursorKeys()
    }
    
    update(...args) {
        if(typeof super.update === "function") super.update(...args)

        if(this.robot2.isAlive) this.robot2.moveToward(this.player);
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