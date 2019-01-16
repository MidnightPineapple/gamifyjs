import keys from '../keys'

export default superclass => {
    
    const errors = []
    let cursor = 0;
    let afterLaunch;

    const errorSceneIsActive = function(scene) {
        return scene.scene.isActive(keys.ERROR);
    }

    let errorScene = function() {
        if(!errorSceneIsActive(this) && afterLaunch !== false) {
            this.scene.launch(keys.ERROR, { 
                parent: this,
                onNext: nextError,
                onPrev: prevError,
                onDismiss: dismissError, 
            })
            afterLaunch = false;
            setTimeout(() => afterLaunch = true, 300);
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
        errScene.afterCreate(function() {
            errScene.data.set("error", error);
            errScene.data.set("cursor", cursor);
            errScene.data.set("totalErrors", errors.length);
        })
    }

    return class HandlesErrors extends superclass {
    
        init(args) {
            if(typeof super.init === "function") super.init(args);
            errorScene = errorScene.bind(this);
            this.events.on("error", appendError);
            this.events.on("shutdown", () => errorSceneIsActive(this) && errorScene().stop())
        }

        emitError(error) {
            this.events.emit("error", error);
            // TODO: play sound on error
        }

    }
} 
