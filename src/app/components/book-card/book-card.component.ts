import { Component, Input } from '@angular/core';
import { Book } from '../../models/book';
import { Order } from '../../models/order';
import { OrderService } from '../../services/orders-service/order.service';
import { AddOrder } from '../../models/addOrder';

@Component({
  selector: 'app-book-card',
  standalone: false,
  
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent {
  @Input() book: Book | null = null;
  @Input() username: string | null = null;

  addOrder: AddOrder | null = null;
  orders: Order[] = []
  order: Order | null = null;

  constructor(private orderService: OrderService){}

  addToOrder(){
    this.addOrder = {firstName: this.username!, lastName: this.username!, bookId: this.book!.id, orderQuantity: 1}
    this.orderService.add_order(this.addOrder).subscribe()
  }
}
