import { Component, Input } from '@angular/core';
import { Order } from '../../models/order';
import { OrderService } from '../../services/orders-service/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: false,
  
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  user: string = '';
  orders: Order[] | null = null;
  sum: number = 0;

  constructor(private route: ActivatedRoute, private orderService: OrderService){
    this.route.queryParams.subscribe(params => {
      this.user = params['user'];
    });
  }

  ngOnInit(){
    this.orderService.get_orders_by_user(this.user, this.user).subscribe(data => {
      this.orders = data
      this.sum = this.orders.reduce((total, order) => {
        return total + (order.orderQuantity * order.book.price);
      }, 0);
    })
  }
}
