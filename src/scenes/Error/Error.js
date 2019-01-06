import { compose } from 'ramda';
import Scene from "../Scene";
import keys from '../keys';
import mockError from './mockError';
import { UsesCustomObjects } from '../mixins';
import objs from "./customObjects"

const mockErrors = [
    new Error("err 2"),
    mockError,
    new Error("err 3"),
]

export default class ErrorScene extends compose(UsesCustomObjects(objs))(Scene) {

    constructor(config) {
        super({ ...config, key:keys.ERROR });
    }

    errors = [];
    cursor = 0;

    create() {

        this.cameras.main.setBackgroundColor("#b52015")

        const { width } = this.sys.game.canvas;
        
        this.next = this.add.eButton(width, 0, { text: "Next" })
        .on("pointerup", this.nextError, this)

        this.prev = this.add.eButton(this.next.left(), 0, { text: "Prev" })
        .on("pointerup", this.prevError, this)

        this.dismiss = this.add.eButton(this.prev.left(), 0, { text: "Dismiss" })
        .on("pointerup", this.dismiss, this)

        this.errorNum = this.add.eText(this.dismiss.left(), 0)
        .setOrigin(1,0).setFontSize(10)

        this.message = this.add.eText(0,0)
        .setFontSize(20) // TODO: wrap text at edge of errorNum text
        
        this.map = this.add.eText(0, this.message.bottom())
        .setFont("Courier").setFontSize(10)
        
        this.trace = this.add.eText(0, this.map.bottom())
        .setFontSize(5)
        
       
        mockErrors.forEach(this.append, this) // ! For Debug
        
        // IDEA: to implement scrolling, put every text object that's supposed to scroll into a 
        // group and then ondrag for that group, make it move up and down.
        // the error message shouldn't be scrollable and also should be opague box
    
        this.refreshView();
    }

    nextError() {
        if(this.cursor + 1 > this.errors.length - 1) return;
        this.cursor++;
        this.refreshView();
    }

    prevError() {
        if(this.cursor - 1 < 0) return;
        this.cursor--;
        this.refreshView();
    }

    dismiss() {
        this.errors.splice(this.cursor, 1);
        if(this.cursor !== 0) this.cursor--;
        this.refreshView();
    }

    append(error) {
        this.errors.push(ErrorDataFactory(error))
        this.refreshView();
    }

    refreshView() {
        if(this.errors.length === 0) return this.stop();
        const error = this.errors[this.cursor]
        this.errorNum.setText(`${this.cursor+1} of ${this.errors.length} Errors`)
        this.message.setText(error.message);
        this.map.setText(error.code);
        this.trace.setText(error.trace);
        this.map.putBelow(this.message);
        this.trace.putBelow(this.map);
    }

    stop() {
        this.scene.stop(keys.ERROR)
    }

}

const ErrorDataFactory = err => ({
    message: err.message,
    code: err.code,
    trace: err.stack,
    pos: err.pos,
})