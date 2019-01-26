import { compose } from 'ramda';
import { UsesCustomObjects, EmitsEvents, UsesPlayerFunctions, DisplaysModals, UsesCommonKeyboardKeys } from '../mixins'
import Scene from '../Scene';

const LevelFactory = ({ customObjects }) => {

    const traits = [
        DisplaysModals, 
        UsesPlayerFunctions,
        EmitsEvents,
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

        }

    }
}

LevelFactory.UsesCustomObjects = UsesCustomObjects;
LevelFactory.EmitsEvents = EmitsEvents;
LevelFactory.UsesPlayerFunctions = UsesPlayerFunctions;


export default LevelFactory;