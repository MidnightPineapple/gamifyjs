export default superclass => class UsesCommonKeyboardKeys extends superclass {

    constructor(params) {
        super(params);
    }

    init() {
        if(typeof super.init === "function") super.init();
        
        const upDown = ["keyup", "keydown"];
        const interactionKeys = ["SPACE", "ENTER" ];
        const directionalKeys = [ ["W", "UP"], [ "A", "LEFT" ], [ "S", "DOWN" ], [ "D", "RIGHT"] ];

        for( let state of upDown ) {
            for( let key of interactionKeys ) {
                const event = state + "_" + key;
                if(typeof this[event] !== "function") continue;
                this.input.keyboard.on(event, this[event], this);
            }
        }

        for( let state of upDown ) {
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
            
    }

}