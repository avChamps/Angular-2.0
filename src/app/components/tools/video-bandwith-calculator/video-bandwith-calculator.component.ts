import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-video-bandwith-calculator',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './video-bandwith-calculator.component.html',
  styleUrls: ['./video-bandwith-calculator.component.css', '../../tools/tools.component.css']
})
export class VideoBandwithCalculatorComponent {


  constructor(public route: Router) { }
}
