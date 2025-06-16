import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'avchamps';
isDisplayHeader : boolean = true;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(() => {
        let currentRoute = this.activatedRoute;
       this.isDisplayHeader = !this.router.url.includes('login') || !this.router.url.includes('/');
        while (currentRoute.firstChild) {
          currentRoute = currentRoute.firstChild;
        }

        const routeData = currentRoute.snapshot.data;

        if (routeData['title']) {
          this.titleService.setTitle(routeData['title'] + '| AV Champs');
        }

        if (routeData['description']) {
          this.metaService.updateTag({ name: 'description', content: routeData['description' + '| AV Champs'] });
        }

        if (routeData['keywords']) {
          this.metaService.updateTag({ name: 'keywords', content: routeData['keywords' + '| AV Champs'] });
        }
      });
  }


}
