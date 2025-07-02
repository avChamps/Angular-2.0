import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import tools from './tools.json';
import { addRecentTool, getRecentTools, getTools, markInterest } from '../../constants/api-constants';
import { Router } from '@angular/router';


export interface Tool {
  title: string;
  description: string;
  icon: string;
  iconBgClass: string;
  iconTextClass: string;
  tags: string[];
  version: string;
  premium: boolean;
  badgeClass?: string;
  link: string;
  linkClass: string;
}



@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css', '../../../assets/css/profile.css']
})
export class ToolsComponent {
  toolsList: any[] = [];
  emailId: any;
  interestCount: any;
  recentCount: any;
  searchTerm: string = '';
  selectedFilterLabel: string = 'All Tools';

  toolFilters = [
    { label: 'All Tools', icon: 'bi-tools', type: 'all', active: true },
    { label: 'Project Calculators', icon: 'bi-calculator', type: 'calculators', active: false },
    { label: 'Video Tools', icon: 'bi-camera-video', type: 'video', active: false },
    { label: 'Audio Tools', icon: 'bi-music-note-beamed', type: 'audio', active: false },
    { label: 'Reports', icon: 'bi-graph-up', type: 'reports', active: false },
    { label: 'Communications', icon: 'bi-chat-dots', type: 'communications', active: false },
    { label: 'Events & Training', icon: 'bi-calendar-event', type: 'events', active: false },
    { label: 'Integrations', icon: 'bi-box-arrow-up-right', type: 'integrations', active: false }
  ];


  constructor(private http: HttpClient, public route: Router) { }

  ngOnInit(): void {
    this.emailId = localStorage.getItem('EmailId');
    this.getTools();
  }


  selectedTab: string = 'all';

  getTools(showFavourites: boolean = false) {
    const EmailId = localStorage.getItem('EmailId');
    this.selectedTab = showFavourites ? 'favourite' : 'all';

    let url = `${getTools}?EmailId=${encodeURIComponent(this.emailId)}`;
    if (showFavourites) url += `&filter=favourite`;
    if (this.searchTerm?.trim()) url += `&search=${encodeURIComponent(this.searchTerm.trim())}`;

    this.http.get(url).subscribe((res: any) => {
      this.interestCount = res.interestCount;
      this.recentCount = res.recentCount;
      this.toolsList = res.data.map((tool: any) => ({
        ...tool,
        tags: tool.tags?.split(',') || [],
        isInterested: !!tool.isInterested
      }));
    });
  }





  markInterest(tool: any) {
    if (!this.emailId) return;

    tool.isInterested = !tool.isInterested;

    const payload = {
      ToolId: tool.id,
      Interested: tool.isInterested,
      EmailId: this.emailId
    };

    this.http.post(markInterest, payload).subscribe(
      (res: any) => {
        this.getTools()
      },
      err => {
        console.error('Error saving interest', err);
        tool.isInterested = !tool.isInterested;
      }
    );
  }


  addToRecent(tool: any) {
    const EmailId = this.emailId;
    if (!EmailId) return;

    this.http.post(addRecentTool, {
      EmailId,
      ToolId: tool.id
    }).subscribe({
      next: () => {
        console.log('Recent tool saved');
        this.loadRecentTools('count');
      },
      error: err => console.error('Failed to save recent tool:', err)
    });
    const formattedTitle = tool?.title.replace(/\s+/g, '-');

    if (tool.link.startsWith('http://') || tool.link.startsWith('https://')) {
      window.open(tool.link, '_blank');
    }

    this.route.navigateByUrl(formattedTitle);
  }



  loadRecentTools(type?: string) {
    if (type != 'count') {
      this.selectedTab = 'recent';
    }

    const EmailId = localStorage.getItem('EmailId');
    if (!EmailId) return;

    this.http.get(`${getRecentTools}?EmailId=${encodeURIComponent(EmailId)}`).subscribe((res: any) => {
      if (type != 'count') {

        this.toolsList = res.data.map((tool: any) => ({
          ...tool,
          tags: tool.tags?.split(',') || [],
          isInterested: !!tool.isInterested
        }));
      }
      this.recentCount = res?.recentCount;
    });
  }



onFilterSelect(type: string) {
  this.toolFilters.forEach(filter => {
    filter.active = filter.type === type;
    if (filter.active) {
      this.selectedFilterLabel = filter.label; // ✅ Update label
    }
  });

  if (type === 'all') {
    this.getTools();
    return;
  }

  this.toolsList = this.toolsList.filter(tool => (tool.toolType || '').toLowerCase() === type.toLowerCase());
}



}
