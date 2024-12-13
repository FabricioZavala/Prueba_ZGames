import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SportsEventsComponent } from './modules/sports/components/sports-events/sports-events/sports-events.component';
import { RegisterComponent } from './modules/login/components/register/register.component';
import { LoginComponent } from './modules/login/components/login/login.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirigir al login por defecto
  { path: 'login', component: LoginComponent }, // Ruta de login
  { path: 'register', component: RegisterComponent }, // Ruta de registro
  { path: 'sports-events', component: SportsEventsComponent }, // Ruta de eventos deportivos
  { path: '**', redirectTo: 'login' }, // Redirigir rutas desconocidas al login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
