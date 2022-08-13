import { Component, OnInit } from '@angular/core';
import { recipeService } from './recipe.services';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']

})
export class RecipesComponent implements OnInit {

  constructor(private recipeService: recipeService) { }

  ngOnInit(): void {

  }

}
