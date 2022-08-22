import { Component, EventEmitter, Output } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent{

  constructor(private dataStorageService: DataStorageService){}

  onSave(){
      this.dataStorageService.saveRecipes();
  }

  onFetch(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

}
