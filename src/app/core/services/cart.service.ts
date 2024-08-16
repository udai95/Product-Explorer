import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSignal = signal<any[]>([]);

  cartItems = computed(() => this.cartSignal());

  totalPrice = computed(
    () =>
      Math.round(
        this.cartSignal().reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ) * 100
      ) / 100
  );

  addToCart(product: any) {
    const updatedCart = [...this.cartSignal()];
    const existingProduct = updatedCart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }
    this.cartSignal.set(updatedCart);
  }

  removeItem(index: number) {
    const updatedCart = [...this.cartSignal()];
    updatedCart.splice(index, 1);
    this.cartSignal.set(updatedCart);
  }

  clearCart() {
    this.cartSignal.set([]);
  }
}
