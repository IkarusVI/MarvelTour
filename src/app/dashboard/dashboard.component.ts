import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

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
      .subscribe((result: any) => {
        if (result) {
          this.heroes = result.data.results;
          this.shuffleHeroes();
        }
      });
  }

  
  shuffleHeroes(): void {
    for (let i = this.heroes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.heroes[i], this.heroes[j]] = [this.heroes[j], this.heroes[i]];
    }
  }
}