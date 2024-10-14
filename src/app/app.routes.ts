import { RouterModule, Routes } from '@angular/router';
import { LibrosComponent } from './libros/libros.component';
import { RecomendadosComponent } from './recomendados/recomendados.component';
import { GestionLibrosComponent } from './gestion-libros/gestion-libros.component';
import { privadoGuard } from './guards/privado.guard';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', component: LibrosComponent },
  { path: 'recomendados', component: RecomendadosComponent },
  { path: 'gestion-libros', component: GestionLibrosComponent, canActivate: [privadoGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}