export default superclass => {

    let keys;

    const interactionKeys = ["SPACE", "ENTER" ];
    const directionalKeys = [ ["W", "UP"], [ "A", "LEFT" ], [ "S", "DOWN" ], [ "D", "RIGHT"] ];
    
    return class UsesCommonKeyboardKeys extends superclass {

        constructor(params) {
            super(params);
        }

        init() {
            if(typeof super.init === "function") super.init();
            
            keys = this.input.keyboard.addKeys(directionalKeys.reduce((a,v) => [...a,...v], []).concat(interactionKeys).join(","));

            const state = "keyup"

            for( let key of interactionKeys ) {
                const event = state + "_" + key;
                if(typeof this[event] !== "function") continue;
                this.input.keyboard.on(event, this[event], this);
            }

            for( let keySet of directionalKeys ) {
                for( let key of keySet ) {
                    const event = state + "_" + key;
                    const genericDirectionFunctionName = state + "_" + keySet[1].toLowerCase();
                    this.input.keyboard.on(event, (...e) => {
                        if(typeof this[genericDirectionFunctionName] === "function") {
                            this[genericDirectionFunctionName](...e);
                        }
                        if(typeof this[event] === "function") {
                            this[event](...e)
                        }
                    }, this);
                }
            }
                
        }

        update() {
            if(typeof super.update === "function") super.update();
            
            const state = "keydown";

            for( let key of interactionKeys ) {
                const event = state + "_" + key;
                if(typeof this[event] !== "function") continue;
                if(keys[key].isDown) {
                    this[event]()
                }
            }

            for( let keySet of directionalKeys ) {
                const genericDirectionFunctionName = state + "_" + keySet[1].toLowerCase();

                if(keySet.find(k=>keys[k].isDown) && typeof this[genericDirectionFunctionName] === "function") {
                    this[genericDirectionFunctionName]();
                }

                for( let key of keySet ) {
                    const event = state + "_" + key;
                    if(keys[key].isDown) {
                        if(typeof this[event] === "function") {
                            this[event]()
                        }
                    }
                }
            }

        }

    }
}