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
            this.setAccelerationX(0);
            if(typeof this.onDie === "function") {
                this.onDie(killedBy);
            }
            
            if(this.ANIMS.DYING) {
                const animCompleteCallback =  anim => {
                    if(anim.key !== this.ANIMS.DYING) return
                    if(typeof onDie === "function") onDie(killedBy);
                    this.emit(CONSTANTS.DIED, killedBy);
                    this.off("animationcomplete", animCompleteCallback);
                }

                this.on("animationcomplete", animCompleteCallback);
                this.anims.play(this.ANIMS.DYING,true); 
            } else {
                if(typeof onDie === "function") onDie(killedBy);
                this.emit(CONSTANTS.DIED, killedBy);
            }

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