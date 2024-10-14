import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { LoginService } from '../services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class privadoGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {} 

  canActivate(): boolean {
    const role = this.loginService.getRole(); 

    if (role === 'admin') {
      return true; 
    }

    this.router.navigate(['/recomendados']);
    return false;
  }
}
