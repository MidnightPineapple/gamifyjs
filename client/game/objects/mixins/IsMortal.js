export default superclass => {

    let onDie;
    
    return class IsMortal extends superclass {

        constructor(...args) {
            super(...args);
            Object.assign(this.constants, { IsMortal: CONSTANTS });
            this.alive = true;
        }

        isMortal = true;

        die(killedBy){
            if(!this.alive) return false;

            this.alive = false;
            if(typeof onDie === "function") onDie(killedBy);
            if(typeof this.onDie === "function") this.onDie(killedBy);
            this.emit(CONSTANTS.DIED, killedBy);

            return true;
        }

        setOnDieCallback(fn) {
            onDie = fn;
        }

    }
}

const CONSTANTS = {
    DIED:"died"
}