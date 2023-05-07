import { Component, HostListener, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as GifActions from '../store/actions/gif.actions';

@Component({
  selector: 'app-gif-view',
  templateUrl: './gif-view.component.html',
  styleUrls: ['./gif-view.component.css']
})
export class GifViewComponent implements OnInit {
  // Properties
  offset = 0; // Pagination offset
  gifs$ = this.store.select('gifs'); // Observable of GIFs from the store
  searchInput = new Subject<string>(); // Subject for search input
  currValue = ''; // Current search value
  scrollTimeout: any; // Timeout reference for scroll event

  constructor(
    private store: Store<any>,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Subscribe to search input changes with debounce and distinctUntilChanged
    this.searchInput.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe((query: string) => {
      this.offset = 0;
      this.store.dispatch(GifActions.searchGifs({ query, offset: this.offset, replace: true }));
    });
  }

  // Function triggered when scrolling occurs
  @HostListener("window:scroll", [])
  onScroll() {
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;

      if (windowBottom >= docHeight) {
        this.offset += 10;
        this.store.dispatch(GifActions.searchGifs({ query: this.currValue, offset: this.offset, replace: false }));
      }
    }, 200);
  }

  // Function triggered when search input changes
  onSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value.trim();
    this.currValue = value;
    this.searchInput.next(value);
  }
}
