import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageModule } from './components/login-page/login-page.module';

const routes: Routes = [
  {
    path:'login',
    loadChildren: async () => (await import('./components/login-page/login-page.module')).LoginPageModule,
    data: {
      title: 'About Us - AV Champs',
      description: 'Learn more about AV Champs, our vision, and our team.',
      keywords: 'about, av champs, team, mission'
    }
     // canActivate: [SiteGuardGuard]
},

{
  path:'directory',
  loadChildren: async () => (await import('./components/directory/directory.module')).DirectoryModule
  ,data: {
    title: 'AV Champs Directory',
    description: 'Explore AV Champs members, companies, and experts.',
    keywords: 'directory, members, av champs'
  }
  // canActivate: [SiteGuardGuard]
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
