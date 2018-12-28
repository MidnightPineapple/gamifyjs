import Scene from "../Scene";
import keys from '../keys';

export default class Menu extends Scene {

    constructor(params) {
        super({ ...params, key: keys.DEMO })
    }

    create() {
        this.cameras.main.setBackgroundColor("#1d212d");        

        // * set tilemap & tileset
        this.map = this.add.tilemap("demomap", 16, 16);
        // * add player tilesprite with physics enabled
        const tileset = this.map.addTilesetImage("Industrial", "industrial-tileset")
        this.map.createStaticLayer("behind-player", tileset, 0, 0)
        const platforms = this.map.createStaticLayer("platforms", tileset, 0, 0)
        .setCollisionByProperty({ collides: true })
        this.map.createStaticLayer("above-player", tileset, 0, 0)
        .setDepth(10)
        
        const spawnPoint = this.map.findObject("objects", o => o.name === "spawn")
        const actionZone = this.map.findObject("objects", o => o.name === "action")

        const player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y,"player", 4)
        this.physics.add.collider(player, platforms)
    }


    update() {
        
    }

}