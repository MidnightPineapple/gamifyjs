import { curry } from 'ramda';

export default curry((animFactory, superclass) => class IsAnimated extends superclass {

    constructor(...args) {
        super(...args)

        const anims = animFactory(this.scene.anims)
        for( const anim of anims ) {
            this.scene.anims.create(anim)
        }
    }

})