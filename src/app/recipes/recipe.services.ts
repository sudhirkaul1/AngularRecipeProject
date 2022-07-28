import { Recipe } from "./recipe.model";

export class recipeService{
  private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is a test recipe',
    'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'),
    new Recipe('A Test Recipe', 'This is a test recipe',
    'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg')
  ];


  getRecipes(){
    return this.recipes.slice();
  }

}
