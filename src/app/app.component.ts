import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, switchMap} from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title) {}

  ngOnInit(): void {
    this.router.events
                  .pipe(filter(event => event instanceof NavigationEnd))
                  .pipe(map(() => this.activatedRoute))
                  .pipe(map(router => {
                    while(router.firstChild) router = router.firstChild;
                    return router;
                  }))
                  .pipe(switchMap(route => route.data))
                  .subscribe(event => this.titleService.setTitle(event.title));
  }
}
