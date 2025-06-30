import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { SharedModule } from '../../shared/shared/shared.module';
import { EventsComponent } from './events.component';
import { PostEventsComponent } from './post-events/post-events.component';
import { CoinsPageComponent } from '../coins-page/coins-page.component';
import { EkartPageComponent } from '../ekart-page/ekart-page.component';
import { EkartPageModule } from '../ekart-page/ekart-page.module';


@NgModule({
  declarations: [
    EventsComponent,
    PostEventsComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    SharedModule,
    EkartPageModule
  ],
  exports : [
    PostEventsComponent
  ]
})
export class EventsModule { }
