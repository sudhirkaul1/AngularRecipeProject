import { NgForOf } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ArgumentOutOfRangeError, Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { shoppinglistService } from '../shoppinglist.service';

import * as ShoppingListActions from '../store/shopping-list.action';
import * as fromShoppingList from '../store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy {

@ViewChild('slForm') slForm: NgForm;

editSubscription = new Subscription;
editMode = false;

editedIngredient: Ingredient;

  constructor(private shoppinglistService: shoppinglistService,
              private store: Store<fromShoppingList.AppState>) { }

  ngOnInit(): void {

    this.editSubscription = this.store.select('shoppingList').subscribe(stateData => {
      if(stateData.editedIngredientIndex > -1 ){
        this.editMode = true;
        this.editedIngredient = stateData.editedIngredient;

        this.slForm.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount
        });
      }else {
        this.editMode = false;
      }
    });
  }

  onAddUpdateItem(form: NgForm){
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    // const ingredient = new Ingredient(ingName,ingAmount);
    // this.shoppinglistService.AddIngredient(ingredient);

    const value = form.value;
    const ingredient = new Ingredient(value.name,value.amount);
    if(!this.editMode){
     // this.shoppinglistService.AddIngredient(ingredient);
     this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient))
    }else{
      //this.shoppinglistService.updateIngredient(this.SelectedEditItem,ingredient);
      this.store.dispatch(
          new ShoppingListActions.UpdateIngredient(ingredient));

    }
    form.reset();
    this.editMode = false;

  }

  onClear(){
    this.slForm.reset();
    this.editMode= false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete(){
   // this.shoppinglistService.deleteIngredient(this.SelectedEditItem);
   this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
}

}
