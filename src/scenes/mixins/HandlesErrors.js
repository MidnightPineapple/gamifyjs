import keys from '../keys'

export default superclass => {
    
    const errors = []
    let cursor = 0;

    let errorScene = function() {
        if(!this.scene.isActive(keys.ERROR)) {
            this.scene.launch(keys.ERROR, { 
                parent: this,
                onNext: nextError,
                onPrev: prevError,
                onDismiss: dismissError, 
            })
        }
        return this.scene.get(keys.ERROR);
    }

    const appendError = function(error) {
        errors.unshift(error);
        cursor = 0;
        sendErrorToScene(error);
    }

    const nextError = function() {
        if(cursor + 1 > errors.length - 1) return;
        cursor++;
        sendErrorToScene(errors[cursor]);
    }

    const prevError = function() {
        if(cursor - 1 < 0) return;
        cursor--;
        sendErrorToScene(errors[cursor]);
    }

    const dismissError = function() {
        errors.splice(cursor, 1);
        if(errors.length === 0) return errorScene().stop();
        if(cursor > 0) cursor--;
        sendErrorToScene(errors[cursor]);
    }

    const sendErrorToScene = function(error) {
        const errScene = errorScene();
        errScene.data.merge({
            error,
            cursor,
            totalErrors: errors.length
        }) 
    }

    return class HandlesErrors extends superclass {
    
        init(args) {
            if(typeof super.init === "function") super.init(args);
            errorScene = errorScene.bind(this);
            this.events.on("error", appendError);
        }

        emitError(error) {
            this.events.emit("error", error);
        }

    }
} 
