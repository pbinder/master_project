import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./routes/routes";
import {COMPONENTS} from "./components/components";
import {FormsModule} from "@angular/forms";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatGridListModule} from '@angular/material/grid-list';
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
	declarations: COMPONENTS,
	imports: [
		CommonModule,
		FlexLayoutModule,
		FormsModule,
		RouterModule.forChild(ROUTES),
		MatCardModule,
		MatExpansionModule,
    MatGridListModule
	],
})
export class FrontpageFeatureFrontPageModule {}
