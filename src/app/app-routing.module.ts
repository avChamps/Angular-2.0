import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageModule } from './components/login-page/login-page.module';
import { SiteGuardGuard } from './authentication/site-guard.guard';

const routes: Routes = [
  {
    path: 'auth/:mode',
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
    canActivate: [SiteGuardGuard],
    data: {
      title: 'Profile | Manage your personal and professional information',
      description: 'Discover tools, resources, events, and opportunities for AV professionals on AV Champs.',
      keywords: 'AV community, AV tools, events, networking, AV Champs'
    }
  },

  {
    path: 'directory',
    loadChildren: async () => (await import('./components/directory/directory.module')).DirectoryModule , 
    canActivate: [SiteGuardGuard],
    data: {
      title: 'Directory | Find AV professionals and companies',
      description: 'Explore AV Champs members, companies, and experts.',
      keywords: 'directory, members, av champs'
    }
  },

    {
    path: 'trainings',
    loadChildren: async () => (await import('./components/training/training.module')).TrainingModule,
    canActivate: [SiteGuardGuard], 
    data: {
      title: 'Training Programs | Enhance your audio-visual skills with our comprehensive training programs designed by industry experts',
      description: 'Enhance your audio-visual skills with our comprehensive training programs designed by industry experts',
      keywords: 'directory, members, av champs'
    }
  },



  {
    path: 'events',
    loadChildren: async () => (await import('./components/events/events.module')).EventsModule,
    canActivate: [SiteGuardGuard], 
    data: {
      title: 'Training Programs | Enhance your audio-visual skills with our comprehensive training programs designed by industry experts',
      description: 'Enhance your audio-visual skills with our comprehensive training programs designed by industry experts',
      keywords: 'directory, members, av champs'
    }
  },

   {
    path: 'ekart',
    loadChildren: async () => (await import('./components/ekart-page/ekart-page.module')).EkartPageModule,
    canActivate: [SiteGuardGuard], 
    data: {
      title: 'Training Programs | Enhance your audio-visual skills with our comprehensive training programs designed by industry experts',
      description: 'Enhance your audio-visual skills with our comprehensive training programs designed by industry experts',
      keywords: 'directory, members, av champs'
    }
  },

   {
    path: 'careers',
    loadChildren: async () => (await import('./components/carrers-page/carrers-page.module')).CarrersPageModule,
    canActivate: [SiteGuardGuard], 
    data: {
      title: 'Training Programs | Enhance your audio-visual skills with our comprehensive training programs designed by industry experts',
      description: 'Enhance your audio-visual skills with our comprehensive training programs designed by industry experts',
      keywords: 'directory, members, av champs'
    }
  },

  {
    path: 'careers/job/:id',
    loadChildren: async () => (await import('./components/carrers-page/carrers-page.module')).CarrersPageModule,
    canActivate: [SiteGuardGuard], 
    data: {
      title: 'Training Programs | Enhance your audio-visual skills with our comprehensive training programs designed by industry experts',
      description: 'Enhance your audio-visual skills with our comprehensive training programs designed by industry experts',
      keywords: 'directory, members, av champs'
    }
  },


   {
    path: 'community',
    loadChildren: async () => (await import('./components/community/community.module')).CommunityModule,
    canActivate: [SiteGuardGuard], 
    data: {
      title: 'Training Programs | Enhance your audio-visual skills with our comprehensive training programs designed by industry experts',
      description: 'Enhance your audio-visual skills with our comprehensive training programs designed by industry experts',
      keywords: 'directory, members, av champs'
    }
  },

   {
    path: 'user-admin',
    loadChildren: async () => (await import('./components/user-admin-dashboard/user-admin-dashboard.module')).UserAdminDashboardModule,
    canActivate: [SiteGuardGuard], 
    data: {
      title: 'Training Programs | Enhance your audio-visual skills with our comprehensive training programs designed by industry experts',
      description: 'Enhance your audio-visual skills with our comprehensive training programs designed by industry experts',
      keywords: 'directory, members, av champs'
    }
  },

  {
    path: 'tools',
    loadChildren: async () => (await import('./components/tools/tools.module')).ToolsModule,
    canActivate: [SiteGuardGuard], 
    data: {
      title: 'Training Programs | Enhance your audio-visual skills with our comprehensive training programs designed by industry experts',
      description: 'Enhance your audio-visual skills with our comprehensive training programs designed by industry experts',
      keywords: 'directory, members, av champs'
    }
  },

  {
    path: 'rewards',
    loadChildren: async () => (await import('./components/rewards/rewards.module')).RewardsModule,
    canActivate: [SiteGuardGuard], 
    data: {
      title: 'Training Programs | Enhance your audio-visual skills with our comprehensive training programs designed by industry experts',
      description: 'Enhance your audio-visual skills with our comprehensive training programs designed by industry experts',
      keywords: 'directory, members, av champs'
    }
  },

  {
    path: 'Aspect-Ratio-Calculator',
    loadComponent: async () => (await import('./components/tools/aspect-ratio/aspect-ratio.component')).AspectRatioComponent
    , data: {
      title: 'AV Champs Directory',
      description: 'Explore AV Champs members, companies, and experts.',
      keywords: 'directory, members, av champs'
    }
  },

  
  {
    path: 'BTU-Calculator',
    loadComponent: async () => (await import('./components/tools/btu-calculator/btu-calculator.component')).BtuCalculatorComponent
    , data: {
      title: 'AV Champs Directory',
      description: 'Explore AV Champs members, companies, and experts.',
      keywords: 'directory, members, av champs'
    }
  },

    {
    path: 'Video-Bandwidth-Calculator',
    loadComponent: async () => (await import('./components/tools/video-bandwith-calculator/video-bandwith-calculator.component')).VideoBandwithCalculatorComponent
    , data: {
      title: 'AV Champs Directory',
      description: 'Explore AV Champs members, companies, and experts.',
      keywords: 'directory, members, av champs'
    },
  },

    {
      path: 'Mileage-Expense-Form',
      loadComponent: async () => (await import('./components/tools/mileage-expense-form/mileage-expense-form.component')).MileageExpenseFormComponent
      , data: {
        title: 'AV Champs Directory',
        description: 'Explore AV Champs members, companies, and experts.',
        keywords: 'directory, members, av champs'
      }
  },


  {
      path: 'Material-Gate-Pass-Form',
      loadComponent: async () => (await import('./components/tools/material-gate-pass-form/material-gate-pass-form.component')).MaterialGatePassFormComponent
      , data: {
        title: 'AV Champs Directory',
        description: 'Explore AV Champs members, companies, and experts.',
        keywords: 'directory, members, av champs'
      }  
  }, 
 
   {
      path: 'Delivery-Challan-Form',
      loadComponent: async () => (await import('./components/tools/delivery-challan-form/delivery-challan-form.component')).DeliveryChallanFormComponent
      , data: {
        title: 'AV Champs Directory',
        description: 'Explore AV Champs members, companies, and experts.',
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
