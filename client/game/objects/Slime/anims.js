import constants from './constants';

export default anims => [
    {
        key:constants.ANIMS.IDLE, 
        frames: anims.generateFrameNumbers(constants.SPRITESHEET_KEY, { start:2, end:4 }),
        frameRate: 3,
        repeat: -1,
    },
    {
        key:constants.ANIMS.RUNNING, 
        frames: anims.generateFrameNumbers(constants.SPRITESHEET_KEY, { start:0, end:6 }),
        frameRate: 3,
        repeat: -1,
    }
]