import Phaser from 'phaser';

// Adding events emitted during setViewport and setPosition

const _setViewport = Phaser.Cameras.Scene2D.Camera.prototype.setViewport
const _setPosition = Phaser.Cameras.Scene2D.Camera.prototype.setPosition
Phaser.Cameras.Scene2D.Camera.prototype.setViewport = function(...args) {
    _setViewport.call(this, ...args);
    this.emit("setviewport", ...args);
    this.emit("setposition", args[0], args[1]);
}
Phaser.Cameras.Scene2D.Camera.prototype.setPosition = function(...args) {
    _setPosition.call(this, ...args);
    this.emit("setposition", ...args);
}

export default Phaser;