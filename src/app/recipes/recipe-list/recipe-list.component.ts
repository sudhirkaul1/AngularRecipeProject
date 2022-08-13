import { Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { recipeService } from '../recipe.services';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit , OnDestroy {

  recipes : Recipe[];

  recipeSubscription : Subscription;

  constructor(private recipeService: recipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipeSubscription = this.recipeService.recipeChanged
      .subscribe(
        (recipe: Recipe[]) => {
          this.recipes = recipe;
        }
      );
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});

  }

  ngOnDestroy(): void {
      this.recipeSubscription.unsubscribe();
  }

}
