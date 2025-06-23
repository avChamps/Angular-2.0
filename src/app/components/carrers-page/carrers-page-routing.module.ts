import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrersPageComponent } from './carrers-page.component';

const routes: Routes = [
  { path : '', component : CarrersPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarrersPageRoutingModule { }
