import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingListRoutingModule } from "./shoppinglist-routing.module";

@NgModule({
  declarations:[
    ShoppingListComponent,
    ShoppingEditComponent,
    ],
    imports: [
      ShoppingListRoutingModule,
      FormsModule,
      SharedModule
    ],

})
export class ShoppingListModule{}
