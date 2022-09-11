import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { authResponseData, authService } from "./auth.service";



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class authComponent implements OnDestroy{
  isloggedIn = true;
  isLoading = false;
  error: string = null;
  private closeSub: Subscription;

  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  constructor(private authService: authService,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver
              ){}

  onSwitchMode(){
    this.isloggedIn = !this.isloggedIn;
  }

  onSubmit(authForm: NgForm){
    if(!authForm.valid){
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;

    let authObs: Observable<authResponseData>;

    this.isLoading = true;

    if(this.isloggedIn)
    {
      authObs = this.authService.login(email,password);


    }
    else{

      authObs = this.authService.signUp(email,password);

    }

    authObs.subscribe(respData => {
      console.log(respData);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    },errorMessage => {
      console.log(errorMessage);
      // this.error = errorMessage;
      this.showErrorAlert(errorMessage);
      this.isLoading = false;
    });


    authForm.reset();
  }

  onHandleError(){
    this.error = null;
  }

  private showErrorAlert(message: string){
   const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
   const hostViewContainerRef = this.alertHost.viewContainerRef;
   hostViewContainerRef.clear();

   const alComponentRef = hostViewContainerRef.createComponent(alertComponentFactory);
    alComponentRef.instance.message = message;
    this.closeSub = alComponentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    })

  }

ngOnDestroy(): void {
  if(this.closeSub)
    this.closeSub.unsubscribe();
}

}
