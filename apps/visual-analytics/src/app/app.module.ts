import {HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";

import {AppComponent} from "./app.component";
import {ROUTES} from "./routes";

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserAnimationsModule, BrowserModule, FlexLayoutModule, HttpClientModule, RouterModule.forRoot(ROUTES)],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
