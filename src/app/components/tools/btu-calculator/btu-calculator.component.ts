import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToolsComponent } from '../tools.component';

@Component({
  selector: 'app-btu-calculator',
  standalone : true,
  imports: [CommonModule,RouterModule  ],
  templateUrl: './btu-calculator.component.html',
  styleUrls: ['./btu-calculator.component.css','../../tools/tools.component.css']
})
export class BtuCalculatorComponent {
isBaseMode : boolean = false;

constructor( public route : Router) { }

onClick(mode: boolean) {
  this.isBaseMode = mode;
}



}
