export class Grocery {
    _id?: string;
    groceryName: string;
    checked: boolean;

    constructor(grocery: Grocery) {
        this.groceryName = grocery.groceryName;
        this.checked = grocery.checked;
    }
}