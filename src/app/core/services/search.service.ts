import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchQuerySignal = signal<string>('');

  get searchQuery() {
    return this.searchQuerySignal();
  }

  setSearchQuery(query: string) {
    this.searchQuerySignal.set(query);
  }
}
