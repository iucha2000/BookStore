import { Component } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book-service/book.service';

@Component({
  selector: 'app-manager',
  standalone: false,
  
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent {

  idValue: number = 0;
  quantityValue:  number = 0;
  nameValue: string = '';
  priceValue:  number = 0;
  authorValue: string = '';

  addBookDisplay: boolean = false;
  editBookDisplay: boolean = false;
  books: Book[] | null = null;
  newBook: Book | null = null;


  constructor(private bookService: BookService){}

  ngOnInit(){
    this.InitializeBooksList()
  }

  InitializeBooksList(){
    this.bookService.getAllBooks().subscribe(data => {
      this.books = data
      console.log(this.books)
    })
  }

  showAddBookDialog(){
    this.addBookDisplay = true;
  }

  showEditBookDialog(book: Book){
    this.editBookDisplay = true;
    this.idValue = book.id
    this.quantityValue = book.quantity
    this.nameValue = book.name
    this.priceValue = book.price
    this.authorValue = book.author
  }

  onDialogHide(){
    this.quantityValue = this.priceValue = this.idValue = 0;
    this.nameValue = this.authorValue = '';
  }

  addBook(){
    this.newBook = {id: 0, name: this.nameValue, author: this.authorValue, quantity: this.quantityValue, price: this.priceValue}
    this.bookService.addBook(this.newBook).subscribe(() => {
      this.InitializeBooksList()
      this.addBookDisplay = false;
    })
  }

  editBook(){
    this.newBook = {id: this.idValue, name: this.nameValue, author: this.authorValue, quantity: this.quantityValue, price: this.priceValue}
    this.bookService.editBook(this.idValue, this.newBook).subscribe(() => {
      this.InitializeBooksList()
      this.editBookDisplay = false;
    })
  }

  deleteBook(){
    this.bookService.deleteBook(this.idValue).subscribe(() => {
      this.InitializeBooksList();
      this.editBookDisplay = false;
    })
  }

  applyFilter(event: any, field: string) {
    const value = event.target.value;
    this.books = this.books!.filter(book => 
      book![field as keyof Book].toString().toLowerCase().includes(value.toLowerCase())
    );
  }
}
