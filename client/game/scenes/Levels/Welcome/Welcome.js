import Level from '../Level';
import customObjects from './customObjects';
import keys from '../../keys';

export default class WelcomeLevel extends Level({ customObjects }) {

    constructor(params) {
        super({ key: keys.WELCOME, ...params });
    }

    create() {
        const cam = this.cameras.main.setBackgroundColor("#1d212d")
        .setZoom(2).setScroll(0,20).setOrigin(0,0);

        this.map = this.add.tilemap("WelcomeLevel", 32, 32);
        const tileset = this.map.addTilesetImage("industrial", "industrial-tileset")

        this.map.createStaticLayer("behind_player", tileset, 0, 0)
        const platforms = this.map.createStaticLayer("platforms", tileset, 0, 0)
        .setCollisionByProperty({ collides: true })

        this.map.createStaticLayer("hacking", tileset, 0, 0)
        this.map.createStaticLayer("danger", tileset, 0, 0)

        const playerSpawnpoint = this.map.findObject("zones", o => o.name === "spawn-player");
        const robotSpawnpoint = this.map.findObject("zones", o => o.name === "spawn-robot");
        const teleportZone = this.map.findObject("zones", o => o.name === "teleport");

        setTimeout(() => cam.shake(), 1000)
    }

}