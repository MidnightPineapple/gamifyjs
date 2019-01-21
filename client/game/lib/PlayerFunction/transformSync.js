import * as Babel from '@babel/standalone';

const babelOptions = {
    sourceMaps: true,
    plugins: [ 
        "proposal-class-properties",
        "proposal-object-rest-spread",
        "transform-for-of",
        "transform-runtime",
    ],
    presets: [
        "es2015", "es2016", "es2017"
    ],
}

export default code => Babel.transform(code, babelOptions)