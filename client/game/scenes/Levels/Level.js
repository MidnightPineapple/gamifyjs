import { compose } from 'ramda';
import { UsesCustomObjects, ChecksForCollisions, UsesPlayerFunctions, DisplaysModals, UsesCommonKeyboardKeys } from '../mixins'
import keys from '../keys';
import Scene from '../Scene';

const LevelFactory = ({ customObjects }) => {

    const traits = [
        DisplaysModals, 
        UsesPlayerFunctions,
        ChecksForCollisions,
        UsesCustomObjects(customObjects),
        UsesCommonKeyboardKeys,
    ]

    return class Level extends compose(...traits)(Scene) {

        constructor(...args) {
            super(...args);
            this.checkpoint = 0;
        }

        playerFunctionMetas = [];

        init(data) {
            if(typeof super.init === "function") super.init(data);
            const saveData = this.registry.get(this.scene.key);

            if(saveData) {
                this.checkpoint = saveData.lastCheckpoint
                for( const funcId in saveData.functions ) {
                    this.loadFunc(funcId, saveData.functions[funcId]);
                }
            } else {
                this.checkpoint = 0;
                for( const funcMeta of this.playerFunctionMetas ) {
                    this.makeFunc(funcMeta.template, funcMeta.functionId);
                }
            }

            for( const funcMeta of this.playerFunctionMetas ) {
                let func = this.getFunc(funcMeta.functionId)
                if(!func) {
                    func = this.makeFunc(funcMeta.template, funcMeta.functionId);
                }

                func.attachOnEditFinishedListener(() => {
                    const funcsConfigs = this.playerFunctionMetas.map( fm => {
                        let func = this.getFunc(fm.functionId);
                        return {
                            ...fm,
                            ...func.getData(),
                        }
                    })
                    this.stateManager.sendFunctionChanged(this.scene.key, funcMeta.functionId, JSON.stringify(funcsConfigs))
                })

            }

            this.input.keyboard.on("keyup_ESC", () => {
                this.scene.run(keys.PAUSE_MENU, { parent: this })
            })
            this.input.keyboard.on("keyup_P", () => {
                this.scene.run(keys.PAUSE_MENU, { parent: this })
            })

        }

    }
}

LevelFactory.UsesCustomObjects = UsesCustomObjects;
LevelFactory.EmitsEvents = ChecksForCollisions;
LevelFactory.ChecksForCollisions = ChecksForCollisions;
LevelFactory.UsesPlayerFunctions = UsesPlayerFunctions;


export default LevelFactory;