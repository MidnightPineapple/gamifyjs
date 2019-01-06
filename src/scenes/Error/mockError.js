export default {
    message: "SyntaxError: unknown: Unexpected token (2:24)",
    stack:`    at Parser.raise (D:/Programming/gamifyjs/node_modules/@babel/parser/lib/index.js:4028:15)
    at Parser.unexpected (D:/Programming/gamifyjs/node_modules/@babel/parser/lib/index.js:5359:16)
    at Parser.parseExprAtom (D:/Programming/gamifyjs/node_modules/@babel/parser/lib/index.js:6518:20)
    at Parser.parseExprSubscripts (D:/Programming/gamifyjs/node_modules/@babel/parser/lib/index.js:6081:21)
    at Parser.parseMaybeUnary (D:/Programming/gamifyjs/node_modules/@babel/parser/lib/index.js:6060:21)
    at Parser.parseExprOpBaseRightExpr (D:/Programming/gamifyjs/node_modules/@babel/parser/lib/index.js:6021:34)
    at Parser.parseExprOpRightExpr (D:/Programming/gamifyjs/node_modules/@babel/parser/lib/index.js:6014:21)
    at Parser.parseExprOp (D:/Programming/gamifyjs/node_modules/@babel/parser/lib/index.js:5991:29)
    at Parser.parseExprOp (D:/Programming/gamifyjs/node_modules/@babel/parser/lib/index.js:5993:21)
    at Parser.parseExprOps (D:/Programming/gamifyjs/node_modules/@babel/parser/lib/index.js:5955:17)`,
    code: `      1 | function say(num) {
    > 2 |     console.log(num + 3|)
        |                         ^`
}