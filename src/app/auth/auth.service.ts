import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError,tap } from "rxjs/operators";
import { User } from "./user.model";

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

export interface authResponseData{
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: "root"
})
export class authService{

  // user = new BehaviorSubject<User>(null);

  private apiKey = 'AIzaSyCKnlCHWfDtGPPjItFGBB1ugnTWJt32JGw';
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient,
              private router: Router,
              private store: Store<fromApp.AppState>){}



  signUp(email: string, password: string){
   return this.http.post<authResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.apiKey,
    {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.errorHandler), tap(respData => {
      this.handleAuthentication(
          respData.email,
          respData.localId,
          respData.idToken,
          +respData.expiresIn
      )
    }));

  }


  login(email: string, password: string){
    return this.http.post<authResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.apiKey,
     {  email: email,
        password: password,
        returnSecureToken: true
     }).pipe(catchError(this.errorHandler),tap(respData => {
      this.handleAuthentication(
          respData.email,
          respData.localId,
          respData.idToken,
          +respData.expiresIn
      )
    }));

  }

logout(){
  //this.user.next(null);
  this.store.dispatch(new AuthActions.Logout());
  this.router.navigate(['/auth']);
  localStorage.removeItem('userData');

  if(this.tokenExpirationTimer){
    clearTimeout(this.tokenExpirationTimer);
  }
}


autoLogin(){
  const userData:{
    email: string,
    id: string,
    _token: string,
    _tokenExpirationDate: string
  } = JSON.parse(localStorage.getItem('userData'));
  if(!userData){
    return;
  }
  const loadedUser = new User(userData.email,
                              userData.id,
                              userData._token,
                              new Date(userData._tokenExpirationDate)
                              );
  if(!loadedUser.token){
    // this.user.next(loadedUser);
    this.store.dispatch(new AuthActions
               .Login(
                    {email: loadedUser.email,
                     userId: loadedUser.id,
                     token: loadedUser.token,
                     expirationDate: new Date(userData._tokenExpirationDate)
                    })
                  );
    const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
    this.autoLogout(expirationDuration);
  }
}

autoLogout(expirationDuration: number){
 this.tokenExpirationTimer = setTimeout(()=> {
    this.logout();
  } , expirationDuration)
}

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      const user = new User(
                            email,
                            userId,
                            token,
                            expirationDate
                            );

      //this.user.next(user);
      this.store.dispatch(new AuthActions
          .Login(
            {
              email: email,
              userId: userId,
              token: token,
              expirationDate: expirationDate
            }));
      this.autoLogout(expiresIn*1000);
      localStorage.setItem('userData',JSON.stringify(user));
  }

  private errorHandler(errResp: HttpErrorResponse){
    let errorMessage = 'An unknown error occurred!';
        if(!errResp.error || !errResp.error.error){
          return throwError(errorMessage);
        }

        switch(errResp.error.error.message){
          case 'EMAIL_EXISTS':
            errorMessage = 'This email already exists' ;
            break;
          case 'EMAIL_NOT_FOUND':
            errorMessage = 'Email not found';
            break;

        }
        return throwError(errorMessage);
  }


}
