import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Grocery } from './grocery.model';
import { GroceryService } from './grocery.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  private groceryListenerSubscription: Subscription;

  public grocery: string;
  public groceries: Array<Grocery>;

  constructor(private groceryService: GroceryService) {
    this.grocery = '';
    this.groceries = [];
    this.groceryListenerSubscription = this.groceryService.getAllGroceriesListener().subscribe(res => {
      console.log('res: ', res)
      this.groceries = res;
    });
    this.groceryService.getAllGroceries();
  }

  ngOnDestroy(): void {
    this.groceryListenerSubscription.unsubscribe();
  }

  public addGrocery() {
    const newGrocery: Grocery = new Grocery({
      groceryName: this.grocery,
      checked: false
    })
    this.groceryService.addGrocery(newGrocery);
    this.grocery = '';
  }

  public userCheckedGrocery(checked: boolean, grocery: Grocery) {
    const ajdustedGrocery = {...grocery};
    ajdustedGrocery.checked = checked;
    this.groceryService.editGrocery(ajdustedGrocery);
  }

  public deleteGrocery(grocery: Grocery) {
    const groceryId = grocery._id ? grocery._id : '';
    this.groceryService.removeGrocery(groceryId);
  }
}
