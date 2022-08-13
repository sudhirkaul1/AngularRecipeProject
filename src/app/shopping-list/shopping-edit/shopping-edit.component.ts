import { NgForOf } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ArgumentOutOfRangeError, Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { shoppinglistService } from '../shoppinglist.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy {

@ViewChild('slForm') slForm: NgForm;

editSubscription = new Subscription;
editMode = false;
SelectedEditItem : number;

editedIngredient: Ingredient;

  constructor(private shoppinglistService: shoppinglistService) { }

  ngOnInit(): void {
    this.editSubscription = this.shoppinglistService.selectedShoppingListItem.subscribe(
      (index:number)=>{
        this.SelectedEditItem = index;
        this.editedIngredient = this.shoppinglistService.getIngredient(this.SelectedEditItem);
        this.slForm.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount
        })
        this.editMode = true;

      }
    );
  }

  onAddUpdateItem(form: NgForm){
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    // const ingredient = new Ingredient(ingName,ingAmount);
    // this.shoppinglistService.AddIngredient(ingredient);

    const value = form.value;
    const ingredient = new Ingredient(value.name,value.amount);
    if(!this.editMode){
      this.shoppinglistService.AddIngredient(ingredient);
    }else{
      this.shoppinglistService.updateIngredient(this.SelectedEditItem,ingredient);
    }
    form.reset();
    this.editMode = false;

  }

  onClear(){
    this.slForm.reset();
    this.editMode= false;
  }

  onDelete(){
    this.shoppinglistService.deleteIngredient(this.SelectedEditItem);
    this.onClear();
  }

ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
}

}
