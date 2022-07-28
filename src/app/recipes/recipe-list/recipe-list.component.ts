import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { recipeService } from '../recipe.services';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes : Recipe[];

 @Output() selectedItemRecipeDetail = new EventEmitter<Recipe>();


  constructor(private recipeService: recipeService) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  onSelectedItem(selectedItemRecipe: Recipe){
    this.selectedItemRecipeDetail.emit(selectedItemRecipe);
  }
}
