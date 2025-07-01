import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoticationsComponent } from './notications.component';

const routes: Routes = [
  { path : '', component : NoticationsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticationsRoutingModule { }
