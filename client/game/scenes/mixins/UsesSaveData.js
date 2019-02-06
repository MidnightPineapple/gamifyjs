export default superclass => class UsesSaveData extends superclass {

    constructor(...params) {
        super(...params);
        this.checkpoint = 0;
    }

    usesSaveData = true;

    init(data) {

        
        if(typeof super.init === "function") super.init(data);

        this.levelId = this.scene.key;

        if(!this.usesPlayerFunctions) throw new Error("Player functions must be enabled to load save data")

        const saveData = this.registry.get(this.levelId);

        if(saveData) {
            this.checkpoint = saveData.lastCheckpoint
            for( const funcId in saveData.functions ) {
                this.loadFunc(funcId, saveData.functions[funcId]);
            }
        }

    }

}