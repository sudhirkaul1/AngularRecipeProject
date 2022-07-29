import { EventEmitter, Inject } from "@angular/core";
import { Ingredient } from "../shared/ingredients.model";


export class shoppinglistService{
 ingredientsChanged = new EventEmitter<Ingredient[]>();

 private  ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes', 10)
  ];

  AddIngredient(ingredient: Ingredient){

    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

 getIngredients(){
  return this.ingredients.slice();
 }


 addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.ingredients.slice());
 }

}
