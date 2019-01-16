import Line from "../../client/game/lib/Line";

describe("Line instantiation", () => {

    it("should be able to be instantiated with only string", () => {
        const line = Line("Hello World");
        expect(line).toBeDefined();
        expect(line.isLine).toBe(true);
    })

    it("should be able to instantiate without string", () => {
        const line = Line()
        expect(line).toBeDefined();
        expect(line.isLine).toBe(true);
        expect(line.editable).toBe(true);
    })

    it("should be able to be instantiated with boolean config.editable", () => {
        const line1 = Line("Hello World", {
            restricted: true
        });
        expect(line1).toBeDefined();
        expect(line1.editable).toBe(false);
        expect(line1.isLine).toBe(true);
        const line2 = Line("Hello World", {
            restricted: false
        });
        expect(line2).toBeDefined();
        expect(line2.editable).toBe(true);
        expect(line2.isLine).toBe(true);
    })

    it("should be able to be instantiated with tuple array of ranges config.editable", () => {
        const line1 = Line("Hello World", {
            restricted: [
                [1,3],
            ]
        })
        expect(line1).toBeDefined();
        expect(line1.restrictedRanges).toBeInstanceOf(Array);
        expect(line1.editable).toBe(false);
        expect(line1.isLine).toBe(true);

        const line2 = Line("Hello World", {
            restricted: [
                [4,5],
                [9,10]
            ]
        })
        expect(line2).toBeDefined();
        expect(line2.restrictedRanges).toBeInstanceOf(Array);
        expect(line2.editable).toBe(false);
        expect(line2.isLine).toBe(true);
    })

    it("should test integrity of tuple array of ranges", () => {
        expect( () => Line("Hello World", {
            restricted: [
                [4,9],
                [5,10]
            ]
        })).toThrow(Error)
        expect( () => Line("Hello World", {
            restricted: [
                [4,9],
                [9,10]
            ]
        })).toThrow(Error)
        expect(() => Line("Hello World", {
            restricted: {}
        })).toThrow(Error)
        expect(() => Line("Hello World", {
            restricted: [ [1,2,3], [4,5,6,7] ]
        })).toThrow(Error)
        expect(() => Line("Hello World", {
            restricted: [ "asdf", ["awe"] ]
        })).toThrow(Error)
        expect(() => Line("Hello World", {
            restricted: [ [ 1 ] ]
        })).toThrow(Error)
    })

    it("should recognize when restricted ranges are out of bounds of string", () => {
        expect(() => Line("", {
            restricted: [
                [1,2]
            ]
        })).toThrow(Error)
        expect(() => Line("Foobar", {
            restricted: [
                [0,6]
            ]
        })).toThrow(Error)
        expect(() => Line("Foobar", {
            restricted: [
                [-1,5]
            ]
        })).toThrow(/negative/)
        expect(() => Line("Foobar", {
            restricted: [
                [1,-5]
            ]
        })).toThrow(/smaller/)
    })
})

describe("Line instantiated with string and no config", () => {

    let line;

    beforeEach(() => line = Line("Hello World"));
    afterEach(() => line = undefined);

    it("should toString properly", () => {
        expect(line.toString()).toBe("Hello World")
        expect(""+line).toBe("Hello World")
        expect(line.text).toBe("Hello World")
    })

    it("should allow access to length of string in .length", () => {
        expect(line.length).toBe("Hello World".length)
    })

    it("should be editable", () => {
        expect(line.isEditable()).toBe(true);
        expect(line.isEditable(4)).toBe(true);
        expect(line.editable).toBe(true);
    })

    it("should allow adding strings", () => {
        line.add(0,"Foobar")
        expect(line.text).toBe("FoobarHello World")
        line.add(line.length, "A test string")
        expect(line.text).toBe("FoobarHello WorldA test string");
    })

    it("should test to make sure added value is string", () => {
        expect(() => line.add(1, 423)).toThrow(TypeError)
    })

    it("should allow removing segments of text", () => {
        line.remove(0)
        expect(line.text).toBe("ello World")
        line.remove(4,3)
        expect(line.text).toBe("ellorld")
        line.remove(6)
        expect(line.text).toBe("ellorl")
    })

    it("should allow line to be cleared", () => {
        expect(line.text).toBe("Hello World");
        line.clear();
        expect(line.text).toBe("");
    })

    it("should prevent removing out of bounds", () => {
        expect(() => line.remove(-1)).toThrow(RangeError);
        expect(() => line.remove(1, -1)).toThrow(RangeError);
        expect(() => line.remove(0,20)).toThrow(RangeError);
    })

    it("should prevent adding out of bounds", () => {
        expect(() => line.add(-1, "wa")).toThrow(RangeError);
        expect(() => line.add(1000, "wa")).toThrow(RangeError);
    })

    it("should prevent adding of newline into a line", () => {
        expect(() => line.add(0,"Foo\nBar")).toThrow();
        expect(line.text).toBe("Hello World");
    })

    it("should return info that can be used to make a new Line", () => {
        const data = line.data
        const newLine = Line(data.text, data.config);
        expect(newLine.text).toBe(line.text);
        expect(newLine.restrictedRanges).toEqual(newLine.restrictedRanges);
        expect(newLine.editable).toBe(line.editable);
    })
})

describe("Line with editable ranges", () => {

    let line;
    beforeEach(() => line = new Line("Hello World", {
        restricted: [
            [0,1],
            [2,5],
            [9,10]
        ]
    }))

    afterEach(() => line = undefined )

    it("should say pos within restricted range isn't editable", () => {
        expect(line.isEditable(0)).toBe(false);
        expect(line.isEditable(1)).toBe(false);
        expect(line.isEditable(5)).toBe(false);
        expect(line.isEditable(6)).toBe(true);
        expect(line.isEditable(7)).toBe(true)
        expect(line.isEditable(10)).toBe(false);
    })

    it("should not allow line to be cleared", () => {
        expect(() => line.clear()).toThrow();
    })

    it("should return a copy of the restricted ranges unable to mutate original", () => {
        line.restrictedRanges[0] = [5,6];
        expect(line.isEditable(0)).toBe(false); 
        expect(line.restrictedRanges[0][0] === 0).toBe(true)
    })

    it("should allow adding outside protected range and update range", () => {
        line.add(2,"FooBar");
        expect(line.isEditable(2)).toBe(true);
        expect(line.isEditable(7)).toBe(true);
        expect(line.isEditable(9)).toBe(false);
        expect(line.restrictedRanges).toEqual([[0,1],[8,11],[15,16]])
        line.add(0,"FooBar")
        expect(line.text).toBe("FooBarHeFooBarllo World")
    })

    it("should allow adding next to a 1 char range", () => {
        const line = new Line("Bar", { restricted: [[0,0],[2,2]] })
        line.add(0,"Foo")
        line.add(6,"Baz")
        expect(line.text).toBe("FooBarBaz")
    })

    it("should allow deleting one char outside restricted range and update range", () => {
        line.remove(6);
        expect(line.isEditable(0)).toBe(false);
        expect(line.isEditable(6)).toBe(true);
        expect(line.isEditable(8)).toBe(false);
        line.remove(7);
        expect(line.text).toBe("Hello old");
        expect(line.restrictedRanges).toEqual([[0,1],[2,5],[7,8]])
    })
    
    it("should allow deleting more than one char outside restricted range and update range", () => {
        line.remove(6,3);
        expect(line.text).toBe("Hello ld");
        expect(line.restrictedRanges).toEqual([[0,1],[2,5],[6,7]])
    })

    it("should forbid editing outside editable range", () => {
        expect(() => line.remove(0)).toThrow();
        expect(line.text).toBe("Hello World");
        expect(() => line.add(1, "hiya")).toThrow();
        expect(line.text).toBe("Hello World");
    })

})