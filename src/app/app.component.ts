import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from './modules/main/topbar/topbar.component';
import { ProductsComponent } from './modules/products/products.component';
import { FooterComponent } from './modules/main/footer/footer.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopbarComponent, ProductsComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'product-explorer';
  searchQuery: string = '';
  isLoggedIn = false;

  constructor(private authService: AuthService) {
    this.authService.isLoggedIn$.subscribe((status: any) => {
      this.isLoggedIn = status;
    });
  }

  onSearch(query: string) {
    this.searchQuery = query;
  }
}
