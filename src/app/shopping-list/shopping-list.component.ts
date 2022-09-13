import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredients.model';
import { shoppinglistService } from './shoppinglist.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],

})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private ingSubscription: Subscription;
  ingredients: Ingredient[];



   constructor(private shoppingListService: shoppinglistService , private loggingService: LoggingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingSubscription = this.shoppingListService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      )
        this.loggingService.printlog("Hello from Shopping-list Component ngOnInit")
  }

ngOnDestroy(): void {
    this.ingSubscription.unsubscribe();
}

onEditItem(index: number){
 this.shoppingListService.selectedShoppingListItem.next(index);
}


}
