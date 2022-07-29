import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredients.model";
import { shoppinglistService } from "../shopping-list/shoppinglist.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class recipeService{
  constructor(private shoppinglistService: shoppinglistService){};

  selectedRecipe = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Food Meat',
               'This is a test recipe',
              'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
               [new Ingredient('Meat',1),
               new Ingredient('Bread', 2)
               ]),

    new Recipe('Burger',
               'This is a test recipe',
               'https://cdn.pixabay.com/photo/2017/01/13/03/02/burgers-1976198_1280.jpg',
               [new Ingredient('Bread', 1),
                new Ingredient('Meat',2),
                new Ingredient('Salad',4)])
  ];


  getRecipes(){
    return this.recipes.slice();
  }

 addIngredientsToShoppingList(ingredients: Ingredient[]){
  this.shoppinglistService.addIngredients(ingredients);

 }

}
