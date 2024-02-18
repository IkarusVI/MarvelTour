import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { ApiResponse } from '../api-response';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe((result: Hero[]) => {
        if (result) {
          this.heroes = result;
        }
      });
  }
}