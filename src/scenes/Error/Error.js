import { compose } from 'ramda';
import Scene from "../Scene";
import keys from '../keys';
import { UsesCustomObjects, IsDraggable } from '../mixins';
import objs from "./customObjects";
import constants from "./constants";
import { gameConfig } from '../../config';

export default class ErrorScene extends compose(IsDraggable,UsesCustomObjects(objs))(Scene) {

    constructor(config) {
        super({ ...config, key:keys.ERROR });
        this.created = false;
    }

    defaultPositionY = gameConfig.height - constants.DEFAULT_PEEK_HEIGHT;
    minPositionY = gameConfig.height - constants.MAX_PEEK_HEIGHT;
    maxPositionY = gameConfig.height - constants.MIN_PEEK_HEIGHT;

    init(data) {
        if(typeof super.init === "function") super.init(data);
        this.onDismiss = data.onDismiss;
        this.onNext = data.onNext;
        this.onPrev = data.onPrev;
        this.events.on("setdata", this.refresh, this);
        this.events.on("changedata", this.refresh, this);
    }

    create(data) {
        if(typeof super.create === "function") super.create(data);

        const { width, height } = this.sys.game.canvas;

        this.cameras.main.setBackgroundColor("#b52015")
        .setViewport(0, this.defaultPositionY, width, height/2);
        
        this.next = this.add.eButton(width, 0, { text: "Next" })
        .on("pointerup", this.nextError, this)

        this.prev = this.add.eButton(this.next.left(), 0, { text: "Prev" })
        .on("pointerup", this.prevError, this)

        this.dismiss = this.add.eButton(this.prev.left(), 0, { text: "Dismiss" })
        .on("pointerup", this.dismissError, this)

        this.errorNum = this.add.eText(this.dismiss.left(), 0, { text: "0 of 0 Errors" })
        .setOrigin(1,0).setFontSize(10)

        this.message = this.add.eText(0,0, { 
            styles: { 
                wordWrap: { width: this.errorNum.left() }
            }
        }).setFontSize(20)

        this.map = this.add.eText(0, this.message.bottom())
        .setFont("Courier").setFontSize(10)
        
        this.trace = this.add.eText(0, this.map.bottom())
        .setFontSize(5)
        
        // TODO: implement scrolling: using scene.cameras.main.scrollY 

        this.created = true;
        this.events.emit("aftercreate")
    }

    nextError() {
        if(typeof this.onNext === "function") this.onNext();
        this.refresh();
    }

    prevError() {
        if(typeof this.onPrev === "function") this.onPrev();
        this.refresh();
    }

    dismissError() {
        if(typeof this.onDismiss === "function") this.onDismiss();
        this.refresh();
    }

    setCursor(cursor, total) {
        this.errorNum.setText(`${cursor+1} of ${total} Errors`)
    }

    setError(error) {
        this.message.setText(error.message);
        this.map.setText(error.code);
        this.trace.setText(error.stack);
        this.refreshErrorView();
    }

    refreshErrorView() {
        this.map.putBelow(this.message);
        this.trace.putBelow(this.map);
    }

    refresh() {
        // FIXME: refreshes everything even when some values are undefined
        // or when only one of the values in datamanager gets changed
        const { cursor, totalErrors, error } = this.data.values;
        this.setError(error); 
        this.setCursor(cursor, totalErrors);
    }

    stop() {
        this.created = false;
        this.scene.stop(keys.ERROR);
    }

    afterCreate(fun, ...args) {
        if(this.created) fun(...args);
        else this.events.on("aftercreate", () => fun(...args));
    }

}