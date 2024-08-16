import {
  Component,
  computed,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../../core/services/search.service';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  @Output() searchQueryChanged = new EventEmitter<string>();
  private router = inject(Router);
  private authService = inject(AuthService);
  private searchService = inject(SearchService);
  private cartService = inject(CartService);
  isLoggedIn = false;

  cartItemsCount = computed(() => this.cartService.cartItems().length);

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchService.setSearchQuery(inputElement.value);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
}
