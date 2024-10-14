import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isAdmin: boolean = false;
  isInvitado: boolean = false;
  private roleSubscription!: Subscription;

  constructor(private authService: LoginService) {}

  ngOnInit(): void {
    // Nos suscribimos a los cambios del rol
    this.roleSubscription = this.authService.role$.subscribe(role => {
      this.isAdmin = role === 'admin';
      this.isInvitado = role === 'invitado';
    });
  }

  ngOnDestroy(): void {
    // Nos desuscribimos para evitar fugas de memoria
    if (this.roleSubscription) {
      this.roleSubscription.unsubscribe();
    }
  }
}
