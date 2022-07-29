import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { recipeService } from './recipe.services';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [recipeService]
})
export class RecipesComponent implements OnInit {
  selectedItemRecipe: Recipe;

  constructor(private recipeService: recipeService) { }

  ngOnInit(): void {
    this.recipeService.selectedRecipe
      .subscribe(
        (recipe: Recipe) => {
          this.selectedItemRecipe = recipe;
      }

      );
  }

}
