import constants from './constants';

export default anims => [
    {
        key:constants.ANIMS.IDLE, 
        frames: anims.generateFrameNumbers(constants.SPRITESHEET_KEY, { start:0, end:3 }),
        frameRate: 3,
        repeat: -1,
    }
]