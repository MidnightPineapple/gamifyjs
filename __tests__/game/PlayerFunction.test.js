import PlayerFunction from '../../client/game/lib/PlayerFunction';

describe("PlayerFunction instantiation with undefined errorhandler", () => {

    it("should be able to be instantiated empty", () => {
        const fun = new PlayerFunction();
        expect(fun).toBeInstanceOf(PlayerFunction)
        expect(fun.isPlayerFunction).toBe(true);
        expect(fun.toString()).toBe("function fun() {\n\n}")
    })

    it("should be able to be instantiated with a name, description, parameters, and line config", () => {
        const fun = new PlayerFunction(undefined, {
            displayName: "testFunc",
            description: "a demo function",
            parameters:[
                { displayName: "arg1", description: "a test parameter" },
                { displayName: "arg2", description: "a second test parameter" }
            ],
            lines: [
                { text: "console.log('Yatta!')", config: { restricted: true } }
            ]
        })

        expect(fun).toBeInstanceOf(PlayerFunction);
        expect(fun.isPlayerFunction).toBe(true);
        expect(""+fun).toBe("function testFunc(arg1,arg2) {\nconsole.log('Yatta!')\n}")
    })

    it("should make an empty line at row 1 even if instantiated with empty array", () => {
        const fun = new PlayerFunction(undefined, {
            lines: []
        })
        expect(fun).toBeInstanceOf(PlayerFunction);
        expect(fun.isPlayerFunction).toBe(true);
        expect(""+fun).toBe("function fun() {\n\n}")
    })

    it("should be able to be instantiated with a json config string via static factory function", () => {
        const fun = PlayerFunction.fromJson(undefined, '{"displayName":"testFunc","description":"a demo function","parameters":[{"displayName":"arg1","description":"a test parameter"},{"displayName":"arg2","description":"a second test parameter"}],"lines":[{"text":"console.log(\\"Yatta!\\")","config":{"restricted":true}}]}')
        expect(fun).toBeInstanceOf(PlayerFunction)
        expect(""+fun).toBe("function testFunc(arg1,arg2) {\nconsole.log(\"Yatta!\")\n}")
    })

})

describe("PlayerFunction with bound errorHandler", () => {

    it("should be able to make a class bound to an errorHandler", done => {
        
        const handler = function(err) {
            expect(err.message).toMatch(/asdf/)
            done();
        }

        const PFun = PlayerFunction.withHandler(handler);

        const fun = new PFun({
            displayName: "testFunc",
            description: "a demo function",
            parameters:[
                { displayName: "arg1", description: "a test parameter" },
                { displayName: "arg2", description: "a second test parameter" }
            ],
            lines: [
                { text: "console.log(asdf)", config: { restricted: true } }
            ]
        })

        fun.execute();
    })

    it("should be able to make a PlayerFunction withJson factory that is bound to an errorhandler", done => {
        const handler = function(err) {
            expect(err.message).toMatch(/asdf/)
            done();
        }

        const withJson = PlayerFunction.fromJsonWithHandler(handler);

        const fun = withJson('{"displayName":"testFunc","description":"a demo function","parameters":[{"displayName":"arg1","description":"a test parameter"},{"displayName":"arg2","description":"a second test parameter"}],"lines":[{"text":"console.log(asdf)","config":{"restricted":true}}]}')
        fun.execute()
    })

})

describe("PlayerFunction instantiated with config", () => {
    let var1, var2, fun;

    const addMultiline = str => str.split("\n").reverse().forEach( l => fun.lines.newLine(1,l) )

    beforeEach(() => {
        var1 = "Foobar",
        var2 = {
            a:1,
            b:2,
        }
        fun = new PlayerFunction(undefined, {
            displayName: "testFunc",
            description: "a demo function",
            parameters:[
                { displayName: "arg1", description: "a test parameter" },
                { displayName: "arg2", description: "a second test parameter" }
            ]
        })
    })

    it("should expose the function to add to lines", () => {
        fun.lines.addText(1,0,"console.log(arg1)");
        expect(fun.toString()).toBe("function testFunc(arg1,arg2) {\nconsole.log(arg1)\n}")
    })

    it("should be able to eval submitted es6 code", done => {
        expect.assertions(1);
        fun.errorHandler = function(error) {
            expect(error.message).toMatch(/It Worked/);
            done();
        }
        fun.lines.addText(1,0,"throw new EvalError('It Worked')");
        fun.execute()
    })

    it("should have access to parameters passed into the .execute function", () => {
        fun.lines.addText(1,0,"arg1.a = arg2 + 5");
        fun.execute(var2,var1)
        expect(var2.a).toBe("Foobar5");
    })

    it("should return the value that the player function returns on execute", () => {
        fun.lines.addText(1,0,"return 'Hello World'");
        expect(fun.execute()).toBe("Hello World");
    })

    it("should not have access to the local scope of the function executing it", done => {
        let foo = "bar"
        fun.errorHandler = function(error) {
            expect(error.message).toMatch(/foo/);
            done();
        }
        fun.lines.addText(1,0,"console.log(foo)");
        fun.execute()
    })

    it("should stale the cache and reevaluate the code each time lines are modified", done => {
        fun.lines.addText(1,0,"return arg1.a + arg1.b + 265 + localScopedVal;");
        fun.errorHandler = function(error) {
            expect(error.message).toMatch(/localScopedVal/);
            done();
        }
        fun.execute(var2);
        fun.lines.addText(1,0,"    const localScopedVal = 12;\n    ");
        expect(fun.execute(var2)).toBe(280)
    })

    it("should map runtime errors to source", done => {
        addMultiline("    let fun1 = function() {\n        BOOM\n    }\n    let fun2 = () => fun1()\n    fun2()")

        fun.errorHandler = function(err) {
            expect(err.message).toMatch(/BOOM/);
            expect(err.loc.line).toBe(3);
            expect(err.loc.column).toBe(8);
            expect(err.code).toBeDefined();
            done()
        }

        fun.execute();
    })

    it("should map syntax errors to source", done => {
        addMultiline("    let fun1 = funtion() {\n        }\n    let fun2 = () => fun1()\n    fun2()")
        fun.errorHandler = function(err) {
            expect(err.message).toMatch(/Unexpected token/);
            expect(err.loc.line).toBe(2);
            expect(err.loc.column).toBe(25);
            expect(err.code).toBeDefined();
            done();
        }

        fun.execute();
    })
})