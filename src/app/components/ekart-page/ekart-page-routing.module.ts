import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EkartPageComponent } from './ekart-page.component';

const routes: Routes = [
  { path : '', component : EkartPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EkartPageRoutingModule { }
