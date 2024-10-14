import { Component } from '@angular/core';
import { LibroService } from '../services/libros/libro.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent {
  libros: any[] = [];
  constructor(private libroService: LibroService) {}
  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.libroService.getLibros().subscribe(
      (data) => {
        this.libros = data;
      },
      (error) => {
        console.error('Error al cargar los libros:', error);
      }
    );
  }
}
