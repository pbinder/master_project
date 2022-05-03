import { Routes } from "@angular/router";
import { FrontpageFeatureFrontPageModule } from "@visual-analytics/frontpage/feature/front-page";


export const ROUTES: Routes = [
  { path: '', loadChildren: () => FrontpageFeatureFrontPageModule },
]
