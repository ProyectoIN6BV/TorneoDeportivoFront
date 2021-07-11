import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarCuentaComponent } from './components/inicio/editar-cuenta/editar-cuenta.component';
import { HomeComponent } from './components/inicio/home/home.component';
import { RegisterComponent } from './components/inicio/register/register.component';
import { ResultadosComponent } from './components/inicio/resultados/resultados.component';
import { EstadisticasPrincipalComponent } from './components/inicioAdministrador/estadisticas/estadisticas-principal/estadisticas-principal.component';
import { HomeAdministradorComponent } from './components/inicioAdministrador/home-administrador/home-administrador.component';
import { EquiposComponent } from './components/inicioAdministrador/torneos/equipos/equipos.component';
import { GraficasComponent } from './components/inicioAdministrador/torneos/graficas/graficas.component';
import { PartidosComponent } from './components/inicioAdministrador/torneos/partidos/partidos.component';
import { TablaComponent } from './components/inicioAdministrador/torneos/tabla/tabla.component';
import { TorneoInicioComponent } from './components/inicioAdministrador/torneos/torneo-inicio/torneo-inicio.component';
import { TorneoComponent } from './components/inicioAdministrador/torneos/torneo/torneo.component';
import { AddUsuarioComponent } from './components/inicioAdministrador/usuarios/add-usuario/add-usuario.component';
import { ListUsuariosComponent } from './components/inicioAdministrador/usuarios/list-usuarios/list-usuarios.component';
import { UsuariosPrincipalComponent } from './components/inicioAdministrador/usuarios/usuarios-principal/usuarios-principal.component';
import { HomeUserComponent } from './components/inicioUser/home-user/home-user.component';
import { AdminGuard } from './guards/adminGuards/admin-guards.guard';
import { RedirectGuard } from './guards/redirect/redirect.guard';
import { UserGuardsGuard } from './guards/userGuards/user-guards.guard';

const routes: Routes = [
  {path:'',canActivate:[RedirectGuard], component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'results', component: ResultadosComponent},
  {path: 'home',canActivate:[UserGuardsGuard], component: HomeUserComponent},
  {path: 'homeAdmin',canActivate:[AdminGuard], component: HomeAdministradorComponent},
  {path: 'homeAdmin/torneos', component:TorneoInicioComponent},
  {path: 'homeAdmin/users/listarusuario', component:ListUsuariosComponent},
  {path: 'homeAdmin/estadisticas', component: EstadisticasPrincipalComponent},
  {path: 'homeAdmin/torneos/:nombre/partidos', component:PartidosComponent},
  {path: 'homeAdmin/torneos/:nombre/equipos', component:EquiposComponent},
  {path: 'homeAdmin/torneos/:nombre/tabla', component:TablaComponent},
  {path: 'homeAdmin/torneos/:nombre/graficas', component:GraficasComponent},
  {path: 'homeAdmin/users/AddUsuario', component:AddUsuarioComponent},
  {path: 'editAccount', component:EditarCuentaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
