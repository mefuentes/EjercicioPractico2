import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-noticia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngFor="let noticia of noticias$ | async">
      <h2>{{ noticia.titulo }}</h2>
      <p>{{ noticia.contenido }}</p>
      <p><strong>Autor:</strong> {{ noticia.autor }}</p>
      <p><strong>Fecha de Publicación:</strong> {{ noticia.fechaPublicacion }}</p>
      
      <h3>Comentarios</h3>
      <div *ngFor="let comentario any obtenerComentarios(noticia.id)">
        <p><strong>{{ comentario.autor }}:</strong> {{ comentario.contenido }}</p>
        <p><small>{{ comentario.fechaCreacion }}</small></p>
      </div>

      <form (ngSubmit)="agregarComentario(noticia.id)">
        <textarea [(ngModel)]="comentarioTexto" name="comentario" required></textarea>
        <button type="submit">Agregar Comentario</button>
      </form>*/
    </div>
  `
})
export class NoticiaComponent {
  noticias$: Observable<any>;
  comentarioTexto: string = '';

  constructor(private http: HttpClient) {
    this.noticias$ = this.http.get<any[]>('http://localhost:3000/posts');
  }

  obtenerComentarios(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/comentarios?postId=${postId}`);
  }

  agregarComentario(postId: number) {
    if (this.comentarioTexto.trim()) {
      const comentario = {
        postId: postId,
        autor: "Usuario Anónimo",
        contenido: this.comentarioTexto,
        fechaCreacion: new Date().toISOString()
      };

      this.http.post('http://localhost:3000/comentarios', comentario).subscribe(() => {
        this.comentarioTexto = '';
      });
    }
  }
}
