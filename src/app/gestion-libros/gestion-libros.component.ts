import { Component } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LibroService } from '../services/libros/libro.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-gestion-libros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-libros.component.html',
  styleUrl: './gestion-libros.component.css'
})
export class GestionLibrosComponent {libros: any[] = [];
  nuevoLibro = { id: 0, autor: '', titulo: '', anio: 0, imagen: '',bestSeller: null };
  libroSeleccionado: any = null;

  constructor(private libroService: LibroService,private authService: LoginService, private router: Router) {}

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

  agregarLibro(): void {
    this.libroService.agregarLibro(this.nuevoLibro).subscribe(
      (libroAgregado) => {
        this.libros.push(libroAgregado);
        this.nuevoLibro = { id: 0, autor: '', titulo: '', anio: 0, imagen: '',bestSeller:null};
      },
      (error) => {
        console.error('Error al agregar el libro:', error);
      }
    );
  }

  // Método para seleccionar un libro para editar
  seleccionarLibro(libro: any): void {
    this.libroSeleccionado = { ...libro }; // Hacemos una copia del libro
  }

  // Método para actualizar un libro
  actualizarLibro(): void {
    if (this.libroSeleccionado) {
      this.libroService.actualizarLibro(this.libroSeleccionado.id, this.libroSeleccionado).subscribe(
        () => {
          this.cargarLibros();
          this.libroSeleccionado = null; // Limpiar selección después de la actualización
        },
        (error) => {
          console.error('Error al actualizar el libro:', error);
        }
      );
    }
  }

  // Método para eliminar un libro
  eliminarLibro(id: number): void {
    this.libroService.eliminarLibro(id).subscribe(
      () => {
        this.libros = this.libros.filter((libro) => libro.id !== id);
      },
      (error) => {
        console.error('Error al eliminar el libro:', error);
      }
    );
  }
  

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
