import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { Recipe } from "../recipes/recipe.model";
import { recipeService } from "../recipes/recipe.services";

@Injectable({
  providedIn: "root"
})
export class DataStorageService{

  constructor(private httpClient: HttpClient,
              private recipeService: recipeService){}


  saveRecipes(){
    const recipes = this.recipeService.getRecipes();
    this.httpClient.put('https://angular-recipe-book-38dd7-default-rtdb.firebaseio.com/recipes.json',recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes(){
    return this.httpClient
     .get<Recipe[]>('https://angular-recipe-book-38dd7-default-rtdb.firebaseio.com/recipes.json')
     //rxjs map method
     .pipe(map(recipes => {
      // javascript map method for handling arrays
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
          this.recipeService.setRecipes(recipes);
     }))
  }
}
