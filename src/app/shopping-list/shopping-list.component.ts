import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredients.model';
import * as fromShoppingList from './store/shopping-list.reducers';
import * as ShoppingListActions from './store/shopping-list.action';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],

})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private ingSubscription: Subscription;
  ingredients: Observable<{ingredients: Ingredient[]}> ;



   constructor(private loggingService: LoggingService,
               private store: Store<fromShoppingList.AppState>
               ) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');

    // this.ingredients = this.shoppingListService.getIngredients();
    // this.ingSubscription = this.shoppingListService.ingredientsChanged
    //   .subscribe(
    //     (ingredients: Ingredient[]) => {
    //       this.ingredients = ingredients;
    //     }
    //   )
        this.loggingService.printlog("Hello from Shopping-list Component ngOnInit")
  }

ngOnDestroy(): void {
   // this.ingSubscription.unsubscribe();
}

onEditItem(index: number){
 //this.shoppingListService.selectedShoppingListItem.next(index);
 this.store.dispatch(new ShoppingListActions.StartEdit(index));
}


}
