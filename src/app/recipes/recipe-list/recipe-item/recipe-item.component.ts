import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { recipeService } from '../../recipe.services';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;

  constructor(private recipeSerive: recipeService) { }

  ngOnInit(): void {
  }

  onSelected(){
      this.recipeSerive.selectedRecipe.emit(this.recipe);
  }
}
