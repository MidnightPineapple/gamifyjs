import LineList from '../LineList';

describe("Instantiate LineList", () => {
    it("should be able instantiate empty LineList", () => {
        const lines = LineList();
        expect(lines.isLineList).toBe(true);
    })

    it("should throw an error if instantiated with a non-array lineConfig", () => {
        expect(() => LineList("foobar")).toThrow(TypeError);
        expect(() => LineList({})).toThrow(TypeError);
    })

    it("should be able to instantiate LineList with lines from lineConfig[]", () => {
        const lines = LineList([
            { text:"Primis ante mattis consectetuer tristique eu sem m", config: { restricted: true } },
            { text:"Faucibus habitasse dolor vehicula accumsan potenti", config: { restricted: true } },
            { text:"Phasellus. Sollicitudin feugiat bibendum, lorem ph", config: { restricted: false } },
            { text:"sociis lacinia, hendrerit platea adipiscing auctor", config: { restricted: true } },
            { text:"tempus consectetuer enim leo nascetur volutpat pha", config: { restricted: false } },
            { text:"Libero conubia penatibus pulvinar. Tortor. Sapien ", config: { restricted: true } },
            { text:"neque dis lobortis orci. Tellus. Inceptos leo vita", config: { restricted: [[0,9]] } },
        ])
        expect(lines.isLineList).toBe(true);
    })

    it("shouldn't allow instantiation with lineConfigs of the wrong shape", () => {
        expect(() => LineList([[]])).toThrow();
        expect(() => LineList([{}])).toThrow();
    })

})

describe("Empty LineList", () => {
    let lines;

    beforeEach(() => lines = LineList());
    
    it("should return its empty text with toString and the .text property", () => {
        expect(lines.text).toBe("");
        expect(lines.toString()).toBe("");
        expect(""+lines).toBe("");
    })

    it("should allow adding single lines of text", () => {
        lines.addText(0,0,"Hello World!")
        expect(lines.text).toBe("Hello World!");
    })

    it("should allow several single lines of text", () => {
        lines.addText(0,0,"Hello")
        lines.addText(1,0,"World")
        lines.addText(2,0,"Foo")
        lines.addText(3,0,"Bar")
        expect(lines.text).toBe("Hello\nWorld\nFoo\nBar")
    })

    it("should allow editing of newly added single lines of text", () => {
        lines.addText(0,0,"Integer parturient potenti laoreet. Maecenas. Dictum, per. Varius, nec arcu.")
        lines.removeText(0,8,0,26);
        expect(lines.text).toBe("Integer  laoreet. Maecenas. Dictum, per. Varius, nec arcu.");
        lines.removeText(0,0,0,9);
        expect(lines.text).toBe("laoreet. Maecenas. Dictum, per. Varius, nec arcu.");
        lines.addText(0,19,"Nulla, nostra consectetuer nisi. ")
        expect(lines.text).toBe("laoreet. Maecenas. Nulla, nostra consectetuer nisi. Dictum, per. Varius, nec arcu.");
        lines.addText(0,82, " Nulla")
        expect(lines.text).toBe("laoreet. Maecenas. Nulla, nostra consectetuer nisi. Dictum, per. Varius, nec arcu. Nulla");
    })

    it("should allow adding of a multiline string of text", () => {
        lines.addText(0,0,"Foo\nBar\nBaz");
        expect(lines.text).toBe("Foo\nBar\nBaz");
    })

    it("should allow adding a line in the middle of existing", () => {
        lines.addText(0,0,"Hello World");
        lines.addText(1,0,"Hello World");
        lines.newLine(1,"Foo Bar");
        expect(lines.text).toBe("Hello World\nFoo Bar\nHello World")
    })
        
    it("should allow adding multiline strings in the middle of a line", () => {
        lines.addText(0,0,"Hello World");
        lines.addText(0,5,"Foo \nBar");
        expect(lines.text).toBe("HelloFoo \nBar World");
        lines.addText(0,0,"\n");
        expect(lines.text).toBe("\nHelloFoo \nBar World");
        lines.addText(3,0,"\nWahaha");
        expect(lines.text).toBe("\nHelloFoo \nBar World\nWahaha");
    })

    it("should allow multiline delete in the middle of a line", () => {
        lines.addText(0,0,"Hello World\nFoo\nBar");
        lines.removeText(0,5,2,1);
        expect(lines.text).toBe("Helloar");
    })

    it("should forbid adding out of bounds", () => {
        expect(() => lines.addText(1,1,"Hai")).toThrow(RangeError);
        expect(() => lines.addText(-1,1,"Hai")).toThrow(RangeError);
    })

    it("should forbid removing out of bounds", () => {
        expect(() => lines.removeLine(0)).toThrow(RangeError)
        expect(() => lines.removeLine(-1)).toThrow(RangeError)
        expect(() => lines.removeLine(1)).toThrow(RangeError)
    })

    it("should forbid removing the last line", () => {
        lines.newLine(0);
        expect(() => lines.removeLine(0)).toThrow()
    })

    it("should return a config object that can be used to instantiate a new line", () => {
        lines.addText(0,0,"Hello World\nFoo\nBar");
        const lines2 = LineList(lines.config);
        expect(lines.text).toBe(lines2.text);
    })

})

describe("LineList with preconfigured lines with some uneditable lines", () => {
    let lines; 

    beforeEach(() => lines = LineList(([
        { text:"Ultrices tellus. Nulla", config: { restricted: true } },
        { text:"Sodales nonummy felis tellus mi", config: { restricted: true } },
        { text:"Odio varius. Malesuada praesent varius pharetra qu", config: { restricted: false } },
        { text:"Euismod amet cubilia facilisi", config: { restricted: false } },
        { text:"Mi Quisque tellus aenean torquent", config: { restricted: true } },
        { text:"Nonummy tempor taciti consequat", config: { restricted: true } },
        { text:"Dapibus tincidunt, ultricies", config: { restricted: false } },
        { text:"Morbi pretium ut congue nonummy facilisis", config: { restricted: true } },
        { text:"Laoreet suspendisse interdum amet mauris lacinia j", config: { restricted: true } },
    ])))

    it("should forbid deleting or adding to restricted line", () => {
        expect(() => lines.addText(0,0,"")).toThrow();
        expect(() => lines.addText(5,0,"")).toThrow();
        expect(() => lines.removeText(1,0,1,9)).toThrow();
    })

    it("should allow adding new lines at and below editable lines", () => {
        lines.newLine(2)
        lines.newLine(4, "Foobar")
        expect(lines.text.split("\n")[2]).toBe("")
        expect(lines.text.split("\n")[4]).toBe("Foobar")
        lines.newLine(9, "Maybe this'll work idk")
        expect(lines.text.split("\n")[9]).toBe("Maybe this'll work idk")
    })

    it("should not allow adding before first line or after last line if those lines are restricted", () => {
        const originalText = lines.text;
        expect(() => lines.newLine(0)).toThrow();
        expect(() => lines.newLine(9)).toThrow();
        expect(lines.text).toBe(originalText);
    })

    it("should not allow removing line between two restricted lines", () => {
        const originalText = lines.text;
        expect(() => lines.removeLine(7)).toThrow();
        expect(lines.text).toBe(originalText);        
    })

})

describe("LineList instantiated with explicit restricted ranges", () => {

    let lines;

    beforeEach(() => lines = LineList([ { text:"neque dis lobortis orci. Tellus. Inceptos leo vita", config: { restricted: [[0,9],[30,40]] } } ])) 

    it("should allow editing of chars outside restricted range", () => {
        lines.addText(0,10,"Wahaha")
        expect(lines.text).toBe("neque dis Wahahalobortis orci. Tellus. Inceptos leo vita")
    })

})