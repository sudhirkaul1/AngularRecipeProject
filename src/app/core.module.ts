import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { authInterceptorService } from "./auth/auth-interceptor.service";
import { recipeService } from "./recipes/recipe.services";

@NgModule({
  providers:[
    recipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: authInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule{}
