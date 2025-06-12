import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageModule } from './components/login-page/login-page.module';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: async () => (await import('./components/login-page/login-page.module')).LoginPageModule,
    data: {
      title: 'About Us - AV Champs',
      description: 'Learn more about AV Champs, our vision, and our team.',
      keywords: 'about, av champs, team, mission'
    }
    // canActivate: [SiteGuardGuard]
  },

  {
    path: 'profile',
    loadChildren: async () => (await import('./components/home-page/home-page.module')).HomePageModule,
    data: {
      title: 'Welcome to AV Champs - Empowering the AV Community',
      description: 'Discover tools, resources, events, and opportunities for AV professionals on AV Champs.',
      keywords: 'AV community, AV tools, events, networking, AV Champs'
    }
    // canActivate: [SiteGuardGuard]
  },

  {
    path: 'directory',
    loadChildren: async () => (await import('./components/directory/directory.module')).DirectoryModule
    , data: {
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
