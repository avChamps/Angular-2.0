import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { SharedModule } from '../../shared/shared/shared.module';
import { EventsComponent } from './events.component';
import { PostEventsComponent } from './post-events/post-events.component';
import { CoinsPageComponent } from '../coins-page/coins-page.component';


@NgModule({
  declarations: [
    EventsComponent,
    PostEventsComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    SharedModule
  ],
  exports : [
    PostEventsComponent
  ]
})
export class EventsModule { }
