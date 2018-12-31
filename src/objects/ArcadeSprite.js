import Phaser from 'phaser';

export default class ArcadeSprite extends Phaser.Physics.Arcade.Sprite {
    
    constructor(...params) {
        super(...params)
        this.scene.physics.world.enable(this)
    }

    isPlayer = false;

}