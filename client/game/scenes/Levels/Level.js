import { compose } from 'ramda';
import { UsesCustomObjects, ChecksForCollisions, UsesPlayerFunctions, DisplaysModals, UsesSaveData, UsesTiledMap } from '../mixins'
import keys from '../keys';
import Scene from '../Scene';

const LevelFactory = ({ customObjects, playerFunctionMetas, tilemapData }) => {

    const traits = [
        DisplaysModals, 
        UsesSaveData,
        UsesPlayerFunctions(playerFunctionMetas),
        ChecksForCollisions,
        UsesTiledMap(tilemapData),
        UsesCustomObjects(customObjects),
    ]

    return class Level extends compose(...traits)(Scene) {

        constructor(...args) {
            super(...args);
        }

        isLevel = true;

        init(data) {
            this.cameras.main.setBackgroundColor("#1d212d");        

            if(typeof super.init === "function") super.init(data);


            for( const functionId of this.getFuncIds() ) {
                let func = this.getFunc(functionId)

                func.attachOnEditFinishedListener(() => {
                    const funcsConfigs = this.getFuncIds().reduce( (ag,id) => {
                        let func = this.getFunc(id);
                        return {
                            ...ag,
                            [id]: func.getData(),
                        }
                    }, {})
                    this.stateManager.sendFunctionChanged(this.levelId, functionId, funcsConfigs[functionId], funcsConfigs)
                })
            }

            this.input.keyboard.on("keyup_ESC", () => {
                this.scene.run(keys.PAUSE_MENU, { parent: this })
            })
            this.input.keyboard.on("keyup_P", () => {
                this.scene.run(keys.PAUSE_MENU, { parent: this })
            })

            this.cursorKeys = this.input.keyboard.addKeys("W,A,D,UP,LEFT,RIGHT")

        }

        update(time, delta) {
            if(typeof super.update === "function") super.update(time, delta);

            if(this.player) {
                const { W, A, D, UP, LEFT, RIGHT } = this.cursorKeys;
                if(W.isDown || UP.isDown) this.player.jump();
                if(A.isDown || LEFT.isDown) this.player.run("left");
                if(D.isDown || RIGHT.isDown) this.player.run("right");
                if(![W,A,D,UP,LEFT,RIGHT].find(x=>x.isDown === true)) this.player.idle();
            }
        }

        registerPlayer(player) {
            this.player = player
        }

    }
}

LevelFactory.UsesCustomObjects = UsesCustomObjects;
LevelFactory.EmitsEvents = ChecksForCollisions;
LevelFactory.ChecksForCollisions = ChecksForCollisions;
LevelFactory.UsesPlayerFunctions = UsesPlayerFunctions;


export default LevelFactory;