import { Injectable } from '@angular/core';
import { Producto } from '../productos/productos';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: Producto[] = [];
  totalPrecio = 0;
  totalCant = 0;

  addToCart(product: Producto) {

    for (let item = 0; item < this.items.length; item++) {
      const element = this.items[item];
      if (element.id === product.id) {
        this.deleteFromCart(element);
      }
    }
    this.items.push(product);
  }

  acumPrecio(price, cant) {
    this.totalPrecio += price * cant;
  }

  getTotalPrecio() {
    this.totalPrecio = 0;
    for (let item = 0; item < this.items.length; item++) {
      const element = this.items[item];
      this.totalPrecio += element.pre_uni * element.cantlleva;
    }
    return this.totalPrecio;
  }

  acumCant(cant) {
    this.totalCant += cant;
  }

  getTotalCantidad() {
    return this.totalCant;
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    this.totalPrecio = 0;
    this.totalCant = 0;

    return this.items;

  }

  deleteFromCart(itemid) {
    this.items.forEach((item, index) => {
      if (item === itemid)
        this.items.splice(index, 1);
    });
  }

}
