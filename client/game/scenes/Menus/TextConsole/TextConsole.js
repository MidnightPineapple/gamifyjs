import { compose } from 'ramda';
import Scene from '../../Scene';
import { UsesCustomObjects } from '../../mixins';
import keys from "../../keys";
import ConsoleTextStream from './ConsoleTextStream';
import Row from './Row';

const traits = [ UsesCustomObjects({ row: Row }) ]

export default class TextConsole extends compose(...traits)(Scene) {

    constructor(params) {
        super({ key: keys.TEXT_CONSOLE, ...params });

        this.rows = new Array(20).fill(null);
    }

    init(data) {
        if(typeof super.init === "function") super.init(data);

        const { inputLines, outputLines = [], config = {} } = data

        const delay = config.delay || 80;
        this.stream = ConsoleTextStream.delayed(delay, inputLines, outputLines);
    }

    create() {
        this.rows = this.rows.map(() => this.add.row(10,10, { text: "" }));

        this.getLines();
    }

    async getLines() {
        let prevLine = "";

        for await ( const line of this.stream ) {
            this.rows[0].setText(line)
        }
    }
}