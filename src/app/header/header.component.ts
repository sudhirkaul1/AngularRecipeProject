import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { authService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit , OnDestroy{
  isAuthenticated = false;
  private userSub: Subscription;
  constructor(private dataStorageService: DataStorageService,
              private authService: authService){}

 ngOnInit(): void {
     this.userSub = this.authService.user.subscribe(user => {
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
