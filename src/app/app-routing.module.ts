import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { authComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipes/recipe-list/recipe-item/recipe-item.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { recipesResolverService } from "./recipes/recipes-resolver.service";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes : Routes = [
  {path:'', redirectTo: '/recipes', pathMatch: 'full'},
  {path:'recipes',
   component: RecipesComponent,
   canActivate: [AuthGuard],
   children:[
    {path: '',component: RecipeStartComponent},
    {path: 'new',component: RecipeEditComponent},
    {path: ':id',component: RecipeDetailComponent, resolve: [recipesResolverService]},
    {path: ':id/edit',component: RecipeEditComponent, resolve: [recipesResolverService] }
   ]},

  {path:'shopping-list', component: ShoppingListComponent },
  {path: 'auth', component: authComponent }
]

@NgModule({
  imports:[
    RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule{

}
