import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredients.model";
import * as ShoppingListActions from '../shopping-list/store/shopping-list.action';
import { Recipe } from "./recipe.model";

import * as fromApp from '../store/app.reducer';

@Injectable()
export class recipeService{
  constructor(private store: Store<fromApp.AppState > ) {};

recipeChanged = new Subject<Recipe[]>;

  // private recipes: Recipe[] = [
  //   new Recipe('Food Meat',
  //              'This is a test recipe',
  //             'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
  //              [new Ingredient('Meat',1),
  //              new Ingredient('Bread', 2)
  //              ]),

  //   new Recipe('Burger',
  //              'This is a test recipe',
  //              'https://cdn.pixabay.com/photo/2017/01/13/03/02/burgers-1976198_1280.jpg',
  //              [new Ingredient('Bread', 1),
  //               new Ingredient('Meat',2),
  //               new Ingredient('Salad',4)])
  // ];

  private recipes: Recipe[] = [];
  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }


  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }


 addIngredientsToShoppingList(ingredients: Ingredient[]){
  //this.shoppinglistService.addIngredients(ingredients);
  this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients) );

}

addRecipe(newRecipe: Recipe){
  this.recipes.push(newRecipe);
  this.recipeChanged.next(this.recipes.slice());
}


updateRecipe(index: number, editedRecipe: Recipe){
  this.recipes[index] = editedRecipe;
  this.recipeChanged.next(this.recipes.slice());
}

deleteRecipe(index: number){
  this.recipes.splice(index,1);
  this.recipeChanged.next(this.recipes.slice());
}

}
