import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html'
})
export class BooksComponent implements OnInit {
  books: any[] = [];
  form: { title: string; author: string } = { title: '', author: '' };
  editingId: string | null = null;
  error = '';
  success = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.api.getBooks().subscribe({
      next: (res) => this.books = res.data || res,
      error: (err) => console.error(err)
    });
  }

  favorite(id: string) {
    this.api.favoriteBook(id).subscribe({
      next: () => this.loadBooks(),
      error: (err) => console.error(err)
    });
  }

  startEdit(book: any) {
    this.editingId = book._id;
    this.form = { title: book.title, author: book.author };
    this.error = '';
    this.success = '';
  }

  cancelEdit() {
    this.editingId = null;
    this.form = { title: '', author: '' };
    this.error = '';
    this.success = '';
  }

  save() {
    this.error = '';
    this.success = '';
    if (this.editingId) {
      this.api.updateBook(this.editingId, this.form).subscribe({
        next: () => {
          this.success = 'Livro atualizado';
          this.cancelEdit();
          this.loadBooks();
        },
        error: (err) => this.error = err.error?.error || 'Erro ao atualizar'
      });
    } else {
      this.api.createBook(this.form).subscribe({
        next: () => {
          this.success = 'Livro criado';
          this.form = { title: '', author: '' };
          this.loadBooks();
        },
        error: (err) => this.error = err.error?.error || 'Erro ao criar'
      });
    }
  }

  remove(id: string) {
    if (!confirm('Deseja excluir este livro?')) return;
    this.api.deleteBook(id).subscribe({
      next: () => this.loadBooks(),
      error: (err) => this.error = err.error?.error || 'Erro ao excluir'
    });
  }
}
