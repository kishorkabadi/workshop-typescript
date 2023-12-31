import { expect } from 'chai';

describe('Types - introduction', () => {

    it('Intersection types', () => {

        function extend<T, U>(first: T, second: U): T & U {
            return {...first, ...second};
        }

        class Person {
            name = 'PersonName';
        }


        class User {
            login = 'UserLogin';
        }

        expect(extend(new Person(), new User()).name).to.equal('PersonName');
        expect(extend(new Person(), new User()).login).to.equal('UserLogin');
    });

    it('Union types', () => {

        function displayPersonAge(name: string | undefined, age: number | string) : string | boolean {
            if(!name) return false;
            return name + ": " + age;
        }

        expect(displayPersonAge('Tom', 30)).to.equal('Tom: 30');
        expect(displayPersonAge('Angela', "28")).to.equal('Angela: 28');
        expect(displayPersonAge(undefined, "28")).to.equal(false);

    });


    it('Custom Type guards with as', () => {

        function isNumber(x: unknown): x is string {
            return (<number>x).toPrecision !== undefined;
        }

        let x = 2;
        if(isNumber(x)) {
            expect(x.toPrecision).not.to.equal(undefined);
        } else {
            expect(x['toPrecision']).to.equal(undefined);
        }
    });

    // it('Type guards with typeof', () => {
    //     let x = 10;
    //     if(typeof x === "number") {
    //         expect(x.toPrecision).not.to.equal(undefined);
    //     } else {
    //         expect(x['toPrecision']).to.equal(undefined);
    //     }
    // });

    // it('Type guards with instanceof', () => {
    //     class Cat {
    //         move() {

    //         }
    //     }

    //     let cat = new Cat();

    //     if(cat instanceof Cat) {
    //         expect(cat.move).not.to.equal(undefined);
    //     } else {
    //         expect(cat['move']).to.equal(undefined);
    //     }
    // });

    it('Nullable type - string', () => {
        let sn: string | null = "bar";
        sn = undefined;
        sn = null;

        expect(sn).to.equal(null);
    });

    
    it('Nullable return type', () => {
        function valueOfDefault(value: string | null | undefined) {
            return value || "default";
        }

        expect(valueOfDefault('Test')).to.equal('Test');
        expect(valueOfDefault(null)).to.equal('default');
        expect(valueOfDefault(undefined)).to.equal('default');
    });

    // //--------------------------------------------------Exercise 1------------------------------------------------------

    it('Type Aliases', () => {
        type Tree<T> = T & {parent: Tree<T>}

        class Node {
            name: string;
        }

        var node: Tree<Node> = {name: "Test", parent: {name: "ParentTest", parent: null}};

        expect(node.name).to.equal("Test");
        expect(node.parent.name).to.equal("ParentTest");
    })

    it('Literal type', () => {
        type Choise = 'A' | 'B' | 'C' | 'D'

        function getChoise(choise: Choise) {
            return choise;
        }

        expect(getChoise("A")).to.equal("A");
        //expect(getChoise("E")).to.equal("E");  // this should throw error
    })

    // it('Polymorphic this types', () => {
    //     class BasicCalculator {
    //         public constructor(protected value: number = 0) { }
    //         public currentValue(): number {
    //             return this.value;
    //         }
    //         public add(operand: number): this {
    //             this.value += operand;
    //             return this;
    //         }
    //     }

    //     class ScientificCalculator extends BasicCalculator {
    //         /*Exercise - implement ScientificCalculator*/
    //     }
        
        
    //     let value = new ScientificCalculator(2)
    //                 .add(1)
    //                 .sin()
    //                 .currentValue();

    //     expect(value.toPrecision(2)).to.equal('0.14');
    // })


    it('Index types', () => {

        /* Exercise - Implement pluck funciton, which takes an array of property names and object, and returns an array containing the property value of object.
        
        For example:
        pluck(person, ['name', 'age']) // -> ['Jarid', 35]

        Important - disallow type unexisting property for object for example pluck(person, ['name', '123dfsa']). Declare return type
        */
        
        interface Person {
            name: string;
            age: number;
        }
        let person: Person = {
            name: 'Jarid',
            age: 35
        };

        function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
            return names.map(n => o[n]);
        }

        let result1: string[] = pluck(person, ['name']); // change name to name2 should throw error
        let result2: (string | number)[] = pluck(person, ['name', 'age']); 

        expect(result1[0]).to.equal('Jarid');
        expect(result2[0]).to.equal('Jarid');
        expect(result2[1]).to.equal(35);
    })


    // --------------------------------------------------Exercise 2------------------------------------------------------


    it('Conditional Types', () => {
        type NonNullable<T> = T extends null | undefined ? never : T;  


        let value: NonNullable<string>;
        value = "Test";

        let value2 : NonNullable<undefined>;
        // value2 = undefined; - should throw error

        expect(value).to.equal("Test");
        expect(typeof value2).to.equal('undefined');
    })

    // it('Conditional Types - advanced sample', () => {
    //     /* Exercise - create Key type */


    //     interface Part {
    //         id: number;
    //         name: string;
    //         subparts: Part[];
    //         updatePart(newName: string): void;
    //         anotherMethod(newName: string): void;
    //     }
        
    //     let allNames: Key<Part>;
    //     allNames = "name" // here should allow only id, name, subparts, updatePart or anotherMethod

    //     expect(allNames).to.equal("name");
    // })

    // it('Conditional Types - advanced sample', () => {

    //     interface Part {
    //         id: number;
    //         name: string;
    //         subparts: Part[];
    //         updatePart(newName: string): void;
    //         anotherMethod(newName: string): void;
    //     }
        
    //     let functionNames: FunctionPropertyNames<Part>;
    //     functionNames = "updatePart";

    //     expect(functionNames).to.equal("updatePart");
    // })

    // it('Predefined conditional types', () => {

    //     type T00 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"

    //     let value : T00;
    //     value = "b";

    //     expect(value).to.equal('b');
    // })


        
    
});

