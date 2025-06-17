import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageModule } from './components/login-page/login-page.module';
import { SiteGuardGuard } from './authentication/site-guard.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: async () => (await import('./components/login-page/login-page.module')).LoginPageModule,
    // canActivate: [SiteGuardGuard],
    data: {
      title: 'Sign In - AV Champs',
      description: 'Learn more about AV Champs, our vision, and our team.',
      keywords: 'about, av champs, team, mission'
    }
  },

  {
    path: 'profile',
    loadChildren: async () => (await import('./components/profile-page/profile-page.module')).ProfilePageModule,
    data: {
      title: 'Profile | Manage your personal and professional information',
      description: 'Discover tools, resources, events, and opportunities for AV professionals on AV Champs.',
      keywords: 'AV community, AV tools, events, networking, AV Champs'
    }
  },

  {
    path: 'directory',
    loadChildren: async () => (await import('./components/directory/directory.module')).DirectoryModule , 
    // canActivate: [SiteGuardGuard],
    data: {
      title: 'Directory | Find AV professionals and companies',
      description: 'Explore AV Champs members, companies, and experts.',
      keywords: 'directory, members, av champs'
    }
  },

    {
    path: 'trainings',
    loadChildren: async () => (await import('./components/training/training.module')).TrainingModule,
    // canActivate: [SiteGuardGuard], 
    data: {
      title: 'Training Programs | Enhance your audio-visual skills with our comprehensive training programs designed by industry experts',
      description: 'Enhance your audio-visual skills with our comprehensive training programs designed by industry experts',
      keywords: 'directory, members, av champs'
    }
  },

  {
    path: '',
    loadChildren: async () => (await import('./components/home/home.module')).HomeModule
    , data: {
      title: 'AV Champs Directory',
      description: 'Explore AV Champs members, companies, and experts.',
      keywords: 'directory, members, av champs'
    }
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
