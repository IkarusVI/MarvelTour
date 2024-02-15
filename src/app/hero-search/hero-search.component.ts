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
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  search(term: string): void {
    this.heroService.searchHeroes(term)
      .subscribe((result: any) => {
        if (result.data && result.data.results && result.data.results.length > 0) {
          this.hero = result.data.results[0];
        }
      });
  }

  ngOnInit(): void {
    this.search('');
  }
}
