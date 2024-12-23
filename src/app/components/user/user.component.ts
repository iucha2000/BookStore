import { Component } from '@angular/core';
import { BookService } from '../../services/book-service/book.service';
import { Book } from '../../models/book';
import { Order } from '../../models/order';

@Component({
  selector: 'app-user',
  standalone: false,
  
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  cartClicked = false;
  count: number = 5;
  username: string = '';
  quantityValue: number = 0;
  books: Book[] | null = null;
  orders: Order[] | null = null;

  constructor(private bookService: BookService){}

  ngOnInit(){
    this.bookService.getAllBooks().subscribe(data => this.books = data)
  }
}
