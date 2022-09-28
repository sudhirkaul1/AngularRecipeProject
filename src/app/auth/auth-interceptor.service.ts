import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { take , exhaustMap, map } from "rxjs/operators";
import { authService } from "./auth.service";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';

@Injectable()
export class authInterceptorService implements HttpInterceptor {

  constructor(private authService: authService,
              private store: Store<fromApp.AppState>){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return  this.store.select('auth').pipe(  // this.authService.user.pipe(
      take(1),
      map(authState => {
        return authState.user;
      }),
      exhaustMap(user => {
        if(!user){
          return next.handle(req);
        }
        const modifiedReq = req.clone({params: new HttpParams().set("auth",user.token)})
        return next.handle(modifiedReq);
      }));

  }
}
