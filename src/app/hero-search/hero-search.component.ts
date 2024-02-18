import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  hero?: Hero;
  
  constructor(private heroService: HeroService) { }

  search(term: string): void {
    this.heroService.searchHeroes(term)
      .subscribe({
        next: (heroes: Hero[]) => {
          if (heroes && heroes.length > 0) {
            this.hero = heroes[0];
          }
        }
      });
  }

  ngOnInit(): void {
    this.search('');
  }
}
