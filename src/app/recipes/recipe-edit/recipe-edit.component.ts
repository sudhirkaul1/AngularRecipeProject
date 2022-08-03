import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Params } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { recipeService } from '../recipe.services';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;

  recipeName: string;
  recipeDesc: string;
  recipeImg: string;
  recipeIng: Ingredient[];

  constructor(private recipeService: recipeService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (param:Params)=> {
        this.id = +param['id'];
        this.editMode = param['id'] !== null;
      }
    )
  }

}
