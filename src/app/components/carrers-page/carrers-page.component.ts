import { Component } from '@angular/core';

@Component({
  selector: 'app-carrers-page',
  templateUrl: './carrers-page.component.html',
  styleUrls: ['./carrers-page.component.css', '../../../assets/css/profile.css']
})
export class CarrersPageComponent {
  minSalary = 0;
  maxSalary = 50;
  categories = [
    { name: 'All', count: 1 },
    { name: 'AV Engineer', count: 1 },
    { name: 'AV Designer', count: 0 },
    { name: 'CAD Engineer', count: 0 },
    { name: 'Pre-Sales', count: 0 },
    { name: 'AV Support', count: 0 },
    { name: 'AV Events', count: 0 },
    { name: 'AV Project', count: 0 }
  ];

  jobTypes = [
    { name: 'Full-time', count: 1 },
    { name: 'Part-time', count: 0 },
    { name: 'Contract', count: 0 },
    { name: 'Remote', count: 0 },
    { name: 'Internship', count: 0 }
  ];

  experienceLevels = [
    { name: 'Entry Level', count: 1 },
    { name: 'Mid Level', count: 0 },
    { name: 'Senior Level', count: 0 }
  ];

  selectedCategory = 'All';
  totalJobs = 0;
  activeFilters = 1;
  selectedJobType: any;
  selectedExperience: any;


  jobList = [
  {
    initial: 'G',
    title: 'Audio-Visual Technician',
    company: 'Godrej & Boyce Mfg. Co. Ltd.',
    type: 'full-time',
    location: 'Bengaluru',
    posted: 'Posted about 3 hours ago',
    salary: '₹8L – ₹50L',
    shortDesc: "We're looking for experienced Audio-Visual professionals to join our team in Bengaluru. The successful candidate will be responsible for implementing and maintaining AV systems across Bengaluru.",
    skills: ['ITI/Diploma/Degree in Electronics', 'Electrical'],
    fullDesc:
      `• ITI/Diploma/Degree in Electronics, Electrical, or related field.\n` +
      `• Proven experience in AV system installation and service.\n` +
      `• Strong knowledge of AV technologies and protocols\n` +
      `• Excellent problem-solving and communication skills`
  },
  {
    initial: 'S',
    title: 'Senior AV Project Manager',
    company: 'Samsung India',
    type: 'contract',
    location: 'Noida',
    posted: 'Posted 1 day ago',
    salary: '₹20L – ₹30L',
    shortDesc: 'Lead AV installation projects across corporate and education sectors.',
    skills: ['Project Management', 'AutoCAD', 'AVIXA CTS'],
    fullDesc:
      `• Manage project timelines\n` +
      `• Vendor coordination\n` +
      `• Installation team management to deliver projects on schedule`
  },
  {
    initial: 'I',
    title: 'Installation Technician',
    company: 'Infosys',
    type: 'full-time',
    location: 'Pune',
    posted: 'Posted 2 days ago',
    salary: '₹4.5L – ₹8L',
    shortDesc: 'Looking for hands-on AV technicians for field installations in client locations.',
    skills: ['Structured Cabling', 'Display Mounting'],
    fullDesc:
      `• Handle on-site installations\n` +
      `• Rack dressing\n` +
      `• AV device configuration\n` +
      `• Travel may be required`
  },
  {
    initial: 'H',
    title: 'Helpdesk AV Support',
    company: 'HCL Technologies',
    type: 'part-time',
    location: 'Chennai',
    posted: 'Posted 5 hours ago',
    salary: '₹3L – ₹6L',
    shortDesc: 'Provide remote AV support for enterprise clients using ticket-based system.',
    skills: ['Zoom/Teams/Meet', 'Customer Support'],
    fullDesc:
      `• Experience in troubleshooting live AV sessions remotely\n` +
      `• Proficiency with conferencing platforms like Zoom, Teams, and Google Meet`
  }
];


  currentDate: string = new Date().toLocaleDateString(); // Used in the sidebar






  selectCategory(category: string) {
    this.selectedCategory = category;
    // You can set logic to filter jobs here
  }

  selectJobType(type: string) {
    this.selectedJobType = type;
    // Update jobs
  }

  selectExperience(level: string) {
    this.selectedExperience = level;
    // Update jobs
  }


  applyFilters() {
    console.log('Filters applied:', {
      category: this.selectedCategory,
      type: this.selectedJobType,
      experience: this.selectedExperience,
      salaryRange: [this.minSalary, this.maxSalary]
    });
    // Add logic to filter jobs
  }

  clearAll() {
    this.selectedCategory = 'All';
    this.selectedJobType = 'Full-time';
    this.selectedExperience = 'Entry Level';
    this.minSalary = 0;
    this.maxSalary = 50;
    // Optionally reset jobs list
  }


  sortBy(type: any) {

  }

  selectedJob: any = null;

  selectJob(job: any) {
    this.selectedJob = job;
  }
}
