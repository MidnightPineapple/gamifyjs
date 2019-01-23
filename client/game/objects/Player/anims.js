import constants from './constants'

export default anims => [
    {
        key:constants.ANIMS.IDLE, 
        frames: anims.generateFrameNumbers(constants.SPRITESHEET_KEY, { start:0, end:3 }),
        frameRate:3,
        repeat: -1,
    }, 
    {
        key:constants.ANIMS.RUNNING,
        frames: anims.generateFrameNumbers(constants.SPRITESHEET_KEY, { start:8, end:15 }),
        frameRate: 12,
        repeat: -1,
    },
    {
        key:constants.ANIMS.HITTING,
        frames: anims.generateFrameNumbers(constants.SPRITESHEET_KEY, { start:24, end:27 }),
        frameRate: 12,
        repeat: -1,
    },
    {
        key:constants.ANIMS.DYING,
        frames: anims.generateFrameNumbers(constants.SPRITESHEET_KEY, { start:16, end:19 }),
        frameRate: 3,
        repeat: 0,
    },
    {
        key:constants.ANIMS.JUMPING,
        frames: anims.generateFrameNumbers(constants.SPRITESHEET_KEY, { start:4, end:7 }),
        frameRate: 3,
        repeat: 0,
    },
]