import Phaser from 'phaser';
import { compose } from 'ramda';
import { UsesCustomObjects } from '../../mixins';
import keys from "../../keys";
import Etc from '../Etc';
import Row from './Row';
import ConsoleTextStream from './ConsoleTextStream';

const traits = [ UsesCustomObjects({ row: Row }) ]

const rotateArray = arr => arr.unshift(arr.pop()) 
const refreshRowPosition = rows => {
    for( const row of rows ) {
        row.setPosition(0,0);
    }        
    for(let i = 1 ; i < rows.length; i++) {
        rows[i].positionBelowRow(rows[i-1]);
    }
}

export default class TextConsole extends compose(...traits)(Etc) {

    constructor(params) {
        super({ key: keys.TEXT_CONSOLE, ...params });

        this.rows = new Array(10).fill(null);
    }

    init(data) {
        if(typeof super.init === "function") super.init(data);

        const { inputLines, outputLines = [], config = {} } = data

        const delay = config.delay || 80;
        const random = config.random || false;
        this.stream = ConsoleTextStream.delayed(delay, inputLines, outputLines, { random });
        this.instance = Phaser.Math.RND.uuid();

    }

    create() {
        const { width, height } = this.sys.game.canvas;
        const shape = this.add.graphics()
        shape.fillStyle(0x000000,0).fillRect(0,0, width, height - 100);
        const mask = new Phaser.Display.Masks.GeometryMask(this, shape);
        this.rows = this.rows.map(() => this.add.row(0,0, { text: "" }).setMask(mask));
        this.getLines();
    }

    async getLines() {
        let prevLine = "";
        let newLineIndex = -1;
        const empty = "> \u25ae";
        const instance = this.instance

        for await ( const line of this.stream ) {
            if(!this.scene.isActive() || this.instance !== instance) break;
            if(line === empty && prevLine !== "") {
                rotateArray(this.rows);
                newLineIndex = -1;
            }
            this.rows[0].setText(line);
            prevLine = line;
            
            newLineIndex = line.indexOf("\n", newLineIndex + 1);
            if(newLineIndex !== -1 || line === empty) refreshRowPosition(this.rows);
        }
    }

}