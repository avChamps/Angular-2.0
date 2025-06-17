import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


export enum Section {
  Overview = "Overview",
  Curriculum = "Curriculum",
  Requirements = "Requirements",
  Instructors = "Instructors"
}

@Component({
  selector: 'app-training-overview',
  templateUrl: './training-overview.component.html',
  styleUrls: ['./training-overview.component.css', '../../../../assets/css/profile.css']
})
export class TrainingOverviewComponent implements OnInit {
  @Input() data: any;
  @Output() backClicked = new EventEmitter<void>();
  @Output() enrollClicked = new EventEmitter<void>();
  isCurrentSection = Section.Overview;
  Section = Section;
  requirementKeys: any;

  ngOnInit(): void {
    if(this.data.Requirements) {
    this.requirementKeys = Object.keys(this.data.Requirements);
    }
  }

  onTabSelection(type: any) {
    this.isCurrentSection = type;
  }

  openEnrollment() {
    this.enrollClicked.emit();
  }

  goBack() {
    this.backClicked.emit();
  }
}
