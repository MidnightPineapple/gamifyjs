export default superclass => {

    let onDie;
    
    return class IsMortal extends superclass {

        constructor(...args) {
            super(...args);
            Object.assign(this.constants, { IsMortal: CONSTANTS })
        }

        isMortal = true;

        die(killedBy){
            if(typeof onDie === "function") onDie(killedBy);
            this.emit(CONSTANTS.DIED, killedBy);
        }

        setOnDieCallback(fn) {
            onDie = fn;
        }

    }
}

const CONSTANTS = {
    DIED:"died"
}