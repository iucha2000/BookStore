import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient) { }

  getAllBooks() : Observable<Book[]>{
    return this.httpClient.get<Book[]>("http://localhost:5090/api/Books/Get-All-Books")
  }

  addBook(book: Book){
    return this.httpClient.post<any>("http://localhost:5090/api/Books/Add-Book", book)
  }

  editBook(id: number, book: Partial<Book>){
    return this.httpClient.put<any>(`http://localhost:5090/api/Books/Update-Book/${id}`,book)
  }

  deleteBook(id: number){
    return this.httpClient.delete<any>(`http://localhost:5090/api/Books/Delete-Book/${id}`)
  }
}
