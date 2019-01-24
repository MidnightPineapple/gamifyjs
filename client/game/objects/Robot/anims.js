import constants from './constants'

export default anims => [
    {
        key:constants.ANIMS.IDLE, 
        frames: anims.generateFrameNumbers(constants.SPRITESHEET_KEY, { start:0, end:5 }),
        frameRate:6,
        repeat: -1,
    }, {
        key:constants.ANIMS.RUNNING,
        frames: anims.generateFrameNumbers(constants.SPRITESHEET_KEY, { start:7, end:12 }),
        frameRate: 12,
        repeat: -1,
    }
]