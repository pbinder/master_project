import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { ROUTES } from './routes/routes';
import { COMPONENTS } from './components/components';

@NgModule({
  declarations: COMPONENTS,
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
})
export class FrontpageFeatureFrontPageModule {}
