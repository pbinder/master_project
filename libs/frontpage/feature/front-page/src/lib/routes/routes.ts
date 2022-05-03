import { Routes } from "@angular/router";
import { FrontpageComponent } from "../components/frontpage/frontpage.component";


export const ROUTES: Routes = [
  { path: 'home', component: FrontpageComponent },
  { path:'**', redirectTo:'home'}
]
