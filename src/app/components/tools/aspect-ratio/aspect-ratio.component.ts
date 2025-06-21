import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToolsComponent } from '../tools.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-aspect-ratio',
  imports: [CommonModule,RouterModule  ],
  templateUrl: './aspect-ratio.component.html',
  styleUrls: ['./aspect-ratio.component.css','../../tools/tools.component.css']
})
export class AspectRatioComponent {
  isCalender  : boolean = true;
  activeTab: string = 'Calculator';

  constructor( public route : Router) { }

  onClick(type: string) {
    debugger;
    this.activeTab = type;
    this.isCalender = (type === 'Calculator');
  }

}
