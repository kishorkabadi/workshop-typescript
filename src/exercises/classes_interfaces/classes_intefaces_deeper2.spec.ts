import { expect } from 'chai';



describe('Interfaces and classes - deeper', () => {

    it('Exercise 2', () => {
        let list = new MyList();
        expect(list.length).to.equal(0);

        list.add("Element1");
        list.add("Element2");
        list.add("Element3");

        expect(list.length).to.equal(3);
        expect(list.first()).to.equal("Element1");
        expect(list.first()).to.equal(list.getAll()[0]);

        list.remove("Element2");
        expect(list.length).to.equal(2);

        let listNextInstance = new MyList(list);
        expect(listNextInstance.length).to.equal(2);

        expect(list.add('NewElement').getAll().length).to.equal(3);

    });
})


interface IMyList {
    add(value: string): IMyList,
    remove(value: string): IMyList,
    first(): string,
    getAll(): string[]
}

class MyList implements IMyList {

    private list: string[];
    constructor (newList: MyList = null) {
        if (newList) 
            this.list = newList.getAll(); 
        else 
            this.list = [];
    }

    get length() {
        return this.list.length;
    }

    add(value: string): IMyList {
        this.list.push(value);
        return this;
    }
    
    remove(value: string): IMyList {
        const index = this.list.findIndex(item => item === value);
        this.list.splice(index, 1);
        return this;
    }

    first(): string {
        return this.list[0];
    }
    getAll(): string[] {
        return this.list;
    }
}