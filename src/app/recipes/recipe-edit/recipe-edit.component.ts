import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivationEnd, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { Recipe } from '../recipe.model';
import { recipeService } from '../recipe.services';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;

  recipeForm: FormGroup;

  constructor(private recipeService: recipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (param:Params)=> {
        this.id = +param['id'];
        this.editMode = param['id'] !== null;
        this.initForm();
      }
    )
  }

  private initForm(){

    let recipeName = '';
    let recipeDesc = '';
    let recipeImg  = '';
    let recipeIng  = new FormArray([]);

    if (this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeDesc = recipe.description;
      recipeImg = recipe.imagePath;

      if(recipe['ingredients']){
        for (let ingredient of recipe.ingredients){
          recipeIng.push(
            new FormGroup({
              'name': new FormControl(ingredient.name,Validators.required),
              'amount': new FormControl(ingredient.amount,[
                        Validators.required,
                        Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
      'imagePath': new FormControl(recipeImg,Validators.required),
      'description': new FormControl(recipeDesc,Validators.required),
      'ingredients': recipeIng
    })
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).controls.push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }


get controls(){
  return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onCancel(){
    this.navigate();
  }

  navigate(){
    this.router.navigate(['../'],{relativeTo: this.route});
  }



  onSubmit(){
    // const newRecipe = new Recipe(
    //                   this.recipeForm.value['name'],
    //                   this.recipeForm.value['description'],
    //                   this.recipeForm.value['imagePath'],
    //                   this.recipeForm.value['ingredients']);
    if(this.editMode){
      this.recipeService.updateRecipe(this.id,this.recipeForm.value);
    }
    else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
  this.navigate();
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
