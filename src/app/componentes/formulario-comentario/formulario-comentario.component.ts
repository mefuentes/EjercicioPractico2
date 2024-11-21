import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NoticiasService } from 'src/app/servicios/noticias.service';

@Component({
  selector: 'app-formulario-comentario',
  templateUrl: './formulario-comentario.component.html',
  styleUrls: ['./formulario-comentario.component.css'],
})
export class FormularioComentarioComponent {
  @Input() idNoticia!: number;
  @Output() comentarioAgregado = new EventEmitter<string>();
  nuevoComentario: string = '';

  constructor(private noticiasService: NoticiasService) {}

  agregarComentario(): void {
    if (this.nuevoComentario.trim()) {
      this.noticiasService.agregarComentario(this.idNoticia, this.nuevoComentario).subscribe(() => {
        this.comentarioAgregado.emit(this.nuevoComentario);
        this.nuevoComentario = '';
      });
    }
  }
}
