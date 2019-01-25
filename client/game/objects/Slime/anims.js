import constants from './constants';

export default anims => [
    {
        key:constants.ANIMS.IDLE, 
        frames: anims.generateFrameNumbers(constants.SPRITESHEET_KEY, { start:0, end:3 }),
        frameRate: 3,
        repeat: -1,
    },
    {
        key:constants.ANIMS.RUNNING, 
        frames: anims.generateFrameNumbers(constants.SPRITESHEET_KEY, { start:4, end:7 }),
        frameRate: 3,
        repeat: -1,
    },
    {
        key:constants.ANIMS.DYING, 
        frames: anims.generateFrameNumbers(constants.SPRITESHEET_KEY, { start:17, end:20 }),
        frameRate: 3,
        repeat: 0,
    }
]

// idle: 0-3
// move: 4-7
// attack: 8-12
// hurt: 13-16
// die: 17-20