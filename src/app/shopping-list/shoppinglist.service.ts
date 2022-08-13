import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredients.model";


export class shoppinglistService{
 ingredientsChanged = new Subject<Ingredient[]>();

 selectedShoppingListItem = new Subject<number>();

 private  ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes', 10)
  ];

  AddIngredient(ingredient: Ingredient){

    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

 getIngredients(){
  return this.ingredients.slice();
 }

 getIngredient(id: number){
  return this.ingredients[id];
 }


 addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
 }

 updateIngredient(index: number, editedIngredient: Ingredient){
  this.ingredients[index] = editedIngredient;
  this.ingredientsChanged.next(this.ingredients.slice());
 }

 deleteIngredient(index: number){
  this.ingredients.splice(index,1);
  this.ingredientsChanged.next(this.ingredients.slice());
 }

}
