import { Component } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LibroService } from '../services/libros/libro.service';

@Component({
  selector: 'app-recomendados',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './recomendados.component.html',
  styleUrl: './recomendados.component.css'
})
export class RecomendadosComponent {
  isAuthenticated: boolean = false;
  role: 'admin' | 'invitado' | null = null;
  bestSellers: any[] = [];
  constructor(private loginService: LoginService, private router: Router,private libroService: LibroService) {}
  ngOnInit() {
    this.cargarBestSellers();
    this.isAuthenticated = this.loginService.isAuthenticated();
    this.loginService.role$.subscribe(role => {
      this.role = role;
    });
  }
  cargarBestSellers(): void {
    this.libroService.getBestSellers().subscribe(
      (data) => {
        this.bestSellers = data;
      },
      (error) => {
        console.error('Error al cargar los best sellers:', error);
      }
    );
  }
  logout() {
    this.loginService.logout();  
    this.router.navigate(['/login']);  
  }
  
}
