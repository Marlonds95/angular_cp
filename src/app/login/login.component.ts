import { Component, inject} from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';





@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule, ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  route = inject(ActivatedRoute); 
  router = inject(Router);
  
  credentials = { email: '', password: '',role:"" };
  errorMessage: string | null = null; 
  successMessage: string | null = null; 

  constructor(private loginService: LoginService,) {}

  login() {
    this.loginService.authenticate(this.credentials).then(response => {
      console.log('Autenticación completada:', response);
   
      this.credentials.role = localStorage.getItem('role') || ''; 
      console.log('Rol de usuario asignado desde localStorage:', this.credentials.role);
  
      if (response.status === 200) {
        this.errorMessage = null;
        this.successMessage = 'Inicio de sesión exitoso. Redirigiendo...';
  
        
        if (this.credentials.role === 'admin') {
          console.log('Redirigiendo a gestión de libros...');
          this.router.navigate(['/gestion-libros']).then(() => {
            console.log('Redirección exitosa a /gestion-libros');
          }).catch(err => {
            console.error('Error en la redirección a /gestion-libros:', err);
          });
        } else if (this.credentials.role === 'invitado') {
          console.log('Redirigiendo a recomendados...');
          this.router.navigate(['/recomendados']).then(() => {
            console.log('Redirección exitosa a /recomendados');
          }).catch(err => {
            console.error('Error en la redirección a /recomendados:', err);
          });
        }
      }
    }).catch(error => {
      console.error('Error de autenticación:', error);
      this.successMessage = null;
      this.errorMessage = 'Error de autenticación. Verifique sus credenciales.';
    });
  }
  
  
}
