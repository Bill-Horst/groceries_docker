import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Constants } from './constants';
import { Grocery } from './grocery.model';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {

  public allGroceries: Array<Grocery>;
  public allGroceriesListener: Subject<Array<Grocery>>;

  constructor(private http: HttpClient) {
    this.allGroceries = [];
    this.allGroceriesListener = new Subject();
  }

  public getAllGroceries() {
    this.http.get<{ message: string, groceries: Array<Grocery>}>(`${Constants.API_URL}/groceries`).subscribe(res => {
      this.allGroceries = res.groceries;
      this.allGroceriesListener.next([...this.allGroceries]);
    });
  }

  public addGrocery(grocery: Grocery) {
    console.log('GROC: ', grocery)
    this.http.post<{ message: string, grocery: Grocery }>(`${Constants.API_URL}/groceries`, { grocery }).subscribe(res => {
      this.allGroceries.push(res.grocery);
      this.allGroceriesListener.next([...this.allGroceries]);
    });
  }

  public editGrocery(grocery: Grocery) {
    this.http.put<{ message: string, oldGrocery: Grocery }>(`${Constants.API_URL}/groceries`, { grocery } ).subscribe(res => {
      const groceryIndex = this.allGroceries.findIndex(groc => groc._id === grocery._id);
      this.allGroceries.splice(groceryIndex, 1, grocery);
      this.allGroceriesListener.next([...this.allGroceries]);
    });
  }

  public removeGrocery(groceryId: string) {
    if (!groceryId) { return; }
    this.http.delete<{ message: string }>(`${Constants.API_URL}/groceries/${groceryId}`).subscribe(res => {
      const groceryIndex = this.allGroceries.findIndex(groc => groc._id === groceryId);
      this.allGroceries.splice(groceryIndex, 1);
      this.allGroceriesListener.next([...this.allGroceries]);
    })
  }

  public getAllGroceriesListener(): Subject<Array<Grocery>> {
    return this.allGroceriesListener;
  }
}
