import { Injectable } from "@angular/core";
import { Resolve, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { recipeService } from "./recipe.services";

@Injectable({
  providedIn: "root"
})
export class recipesResolverService implements Resolve<Recipe[]>{

  constructor(private dataStorageService: DataStorageService,
              private recipeService: recipeService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const recipes = this.recipeService.getRecipes();
    if(recipes.length == 0 ){
      return this.dataStorageService.fetchRecipes();
    }
    else{
      return recipes;
    }

  }
}
