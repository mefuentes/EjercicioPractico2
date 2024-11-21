import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoticiasService {
  private urlApi = 'http://localhost:3000/news';

  constructor(private http: HttpClient) {}

  obtenerNoticias(): Observable<any[]> {
    return this.http.get<any[]>(this.urlApi);
  }

  agregarComentario(idNoticia: number, comentario: string): Observable<any> {
    const url = `${this.urlApi}/${idNoticia}`;
    return this.http.patch(url, { comentario });
  }
}
