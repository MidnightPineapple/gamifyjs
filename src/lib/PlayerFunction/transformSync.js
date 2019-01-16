import { transformSync } from '@babel/core';
import BabelPluginClassProperties from "@babel/plugin-proposal-class-properties"
import BabelPluginObjectRestSpread from "@babel/plugin-proposal-object-rest-spread"
import BabelPluginTransformForOf from "@babel/plugin-transform-for-of"
// import BabelPresetEnv from "@babel/preset-env"

// ! BUG: Can't import without an error ^^

const babelOptions = {
    sourceMaps: true,
    plugins: [ 
        BabelPluginClassProperties,
        BabelPluginObjectRestSpread,
        BabelPluginTransformForOf,
    ],
    presets: [
        // BabelPresetEnv
    ],
}

export default code => transformSync(code, babelOptions)