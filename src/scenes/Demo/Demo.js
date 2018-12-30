import { compose } from 'ramda'
import { UsesCustomObjects } from '../mixins'
import { Player } from '../../objects';
import Scene from "../Scene";
import keys from '../keys';


const objs = {
    player: Player
}

export default class Menu extends compose(UsesCustomObjects(objs))(Scene) {

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

        this.cursors = this.input.keyboard.createCursorKeys();

        // TODO: custom behavior functions
    }

    update() {
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