import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { authService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";

import * as fromApp from '../store/app.reducer';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit , OnDestroy{
  isAuthenticated = false;
  private userSub: Subscription;
  constructor(private dataStorageService: DataStorageService,
              private authService: authService,
              private store: Store<fromApp.AppState>
              ){}

 ngOnInit(): void {
     this.userSub = this.store.select('auth')
        .pipe(map(authState => authState.user))
        .subscribe(user => {
           this.isAuthenticated = !!user; // !user ? false : true;
     });
 }

  onSave(){
      this.dataStorageService.saveRecipes();
  }

  onFetch(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogOut(){
    this.authService.logout();
  }
  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }

}
