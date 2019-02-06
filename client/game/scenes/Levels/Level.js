import { compose } from 'ramda';
import { UsesCustomObjects, ChecksForCollisions, UsesPlayerFunctions, DisplaysModals, UsesCommonKeyboardKeys, UsesSaveData, UsesTiledMap } from '../mixins'
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
        UsesCommonKeyboardKeys,
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
                    this.stateManager.sendFunctionChanged(this.levelId, functionId, JSON.stringify(funcsConfigs))
                })
            }

            this.input.keyboard.on("keyup_ESC", () => {
                this.scene.run(keys.PAUSE_MENU, { parent: this })
            })
            this.input.keyboard.on("keyup_P", () => {
                this.scene.run(keys.PAUSE_MENU, { parent: this })
            })

        }

        registerPlayer(player) {
            this.keydown_left = function () { player.run("left") }
            this.keyup_left = function () { player.idle(); }
            this.keydown_right = function () { player.run("right"); }
            this.keyup_right = function () { player.idle(); }
            this.keydown_up = function () { player.jump(); }
        }

    }
}

LevelFactory.UsesCustomObjects = UsesCustomObjects;
LevelFactory.EmitsEvents = ChecksForCollisions;
LevelFactory.ChecksForCollisions = ChecksForCollisions;
LevelFactory.UsesPlayerFunctions = UsesPlayerFunctions;


export default LevelFactory;