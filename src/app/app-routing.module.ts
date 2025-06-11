import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageModule } from './components/login-page/login-page.module';

const routes: Routes = [
  {
    path:'',
    loadChildren: async () => (await import('./components/login-page/login-page.module')).LoginPageModule
    // canActivate: [SiteGuardGuard]
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
