import { curry } from 'ramda';

export default curry((animFactory, superclass) => class IsAnimated extends superclass {

    constructor(...args) {
        super(...args)

        const anims = animFactory(this.scene.anims)
        for( const anim of anims ) {
            if(this.scene.anims.get(anim.key)) continue;
            this.scene.anims.create(anim)
        }
    }

})