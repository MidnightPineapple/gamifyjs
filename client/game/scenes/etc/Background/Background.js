import Etc from '../Etc';
import keys from '../../keys';
export default class Background extends Etc {
    constructor(...params) {
        super({ key: keys.BACKGROUND, ...params })
    }

    create({ color }) {
        this.cameras.main.setBackgroundColor(color)
    }
}