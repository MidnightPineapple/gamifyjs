export default anims => [
    {
        key:"player-idle", 
        frames: anims.generateFrameNumbers('player', { start:0, end:7 }),
        frameRate:3,
        repeat: -1,
    }, {
        key:"player-running",
        frames: anims.generateFrameNumbers('player', { start:8, end:15 }),
        frameRate: 12,
        repeat: -1,
    }
]