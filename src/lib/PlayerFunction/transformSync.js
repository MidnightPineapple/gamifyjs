import * as Babel from '@babel/standalone';

const babelOptions = {
    sourceMaps: true,
    plugins: [ 
        "proposal-class-properties",
        "proposal-object-rest-spread",
        "transform-for-of",
    ],
    presets: [
        "es2016"
    ],
}

export default code => Babel.transform(code, babelOptions)