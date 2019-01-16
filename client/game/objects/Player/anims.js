import constants from './constants'

export default anims => [
    {
        key:constants.anims.IDLE, 
        frames: anims.generateFrameNumbers(constants.SPRITESHEET_KEY, { start:0, end:7 }),
        frameRate:3,
        repeat: -1,
    }, {
        key:constants.anims.RUNNING,
        frames: anims.generateFrameNumbers(constants.SPRITESHEET_KEY, { start:8, end:15 }),
        frameRate: 12,
        repeat: -1,
    }
]