import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { SearchService } from '../../core/services/search.service';
import { PaginatorModule } from 'primeng/paginator';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginatorModule, RatingModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  private productService = inject(ProductsService);
  private cartService = inject(CartService);
  private searchService = inject(SearchService);

  products = signal<any[]>([]);
  categories: any[] = [];
  selectedCategory = '';
  currentPage = 1;
  totalPages = 0;
  totalProducts = 0;
  itemsPerPage = 10;

  filteredProducts = computed(() => {
    const query = this.searchService.searchQuery.toLowerCase();

    if (query) {
      return this.products().filter((product) =>
        product.title.toLowerCase().includes(query)
      );
    } else {
      return this.products();
    }
  });

  ngOnInit() {
    this.fetchCategories();
    this.fetchProducts(this.currentPage);
  }

  fetchCategories() {
    this.productService.getCategories().subscribe((categories: any) => {
      this.categories = categories;
    });
  }

  fetchProducts(page: number) {
    const skip = (page - 1) * this.itemsPerPage;
    if (this.selectedCategory) {
      this.productService
        .getProductsByCategory(
          this.selectedCategory,
          this.itemsPerPage,
          skip,
          'title',
          'asc'
        )
        .subscribe((response: any) => {
          this.products.set(response.products);
          this.totalPages = Math.ceil(response.total / this.itemsPerPage);
          this.totalProducts = response.total;
        });
    } else {
      this.productService
        .getProducts(this.itemsPerPage, skip, 'title', 'asc')
        .subscribe((response: any) => {
          this.products.set(response.products);
          this.totalPages = Math.ceil(response.total / this.itemsPerPage);
          this.totalProducts = response.total;
        });
    }
  }

  onCategoryChange(slug: string) {
    this.selectedCategory = slug;
    this.fetchProducts(1);
  }

  onPageChange(event: any) {
    this.currentPage = event.page + 1;
    this.fetchProducts(this.currentPage);
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  calculateDiscountedPrice(price: number, discountPercentage: number): number {
    const discountAmount = (price * discountPercentage) / 100;
    return Math.round((price - discountAmount) * 100) / 100;
  }

  trackById(index: number, product: any): number {
    return product.id;
  }
}
