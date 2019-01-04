import Line from "./Line";

export default PlayerFunction => ({
    fromJson(json) {
        // TODO: 1. Parse JSON
        // TODO: 2. use line factory to make line objects and populate lines array 
        return new PlayerFunction(/* config obj*/)
    },
    fromString(displayName, parameters, description, str) {
        const lines = str.split("\n").map( x => new Line(x, true) )
        return new PlayerFunction({ displayName, parameters, description, lines });
    }
})