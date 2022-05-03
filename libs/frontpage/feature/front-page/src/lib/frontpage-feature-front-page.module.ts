import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { ROUTES } from './routes/routes';
import { COMPONENTS } from './components/components';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: COMPONENTS,
  imports: [CommonModule, FormsModule, RouterModule.forChild(ROUTES)],
})
export class FrontpageFeatureFrontPageModule {}
