import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

  export class LoginService {
    private token: string | null = null;
  private roleSubject = new BehaviorSubject<'admin' | 'invitado' | null>(null); 
  role$ = this.roleSubject.asObservable(); 

  constructor() {

    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    if (storedToken && storedRole) {
      this.token = storedToken;
      this.roleSubject.next(storedRole as 'admin' | 'invitado');
    }
  }

  authenticate(credentials: { email: string; password: string ; role: string}): Promise<any> {
    return fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la autenticación');
      }
      return response.json();
    })
    .then(data => {
      if (data.accessToken) {
        this.token = data.accessToken;
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('role', data.user.role);   
        this.roleSubject.next(data.user.role);           
        return { status: 200 };
      } else {
        throw new Error('Credenciales incorrectas');
      }
    })
    .catch(error => {
      console.error(error);
      return Promise.reject(error);
    });
  }

  getRole(): 'admin' | 'invitado' | null {
    return this.roleSubject.value;
  }

  isAuthenticated(): boolean {
    return this.token !== null;
  }

  // Método para cerrar sesión
  logout(): void {
    this.token = null;
    this.roleSubject.next(null); // Eliminar el rol
    localStorage.removeItem('token'); // Limpiar el localStorage
    localStorage.removeItem('role');
  }
  
}

