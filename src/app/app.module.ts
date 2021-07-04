import { NgModule, CUSTOM_ELEMENTS_SCHEMA   } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/inicio/home/home.component';
import { FooterComponent } from './components/inicio/footer/footer.component';
import { CarouselComponent } from './components/inicio/Carousel/carousel.component';
import { NavbarComponent } from './components/inicio/navbar/navbar.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { InterceptorService } from './services/interceptor/interceptor.service';
import { RegisterComponent } from './components/inicio/register/register.component';
import { ResultadosComponent } from './components/inicio/resultados/resultados.component';
import { HomeAdministradorComponent } from './components/inicioAdministrador/home-administrador/home-administrador.component';
import { TorneoInicioComponent } from './components/inicioAdministrador/torneos/torneo-inicio/torneo-inicio.component';
import { UsuariosPrincipalComponent } from './components/inicioAdministrador/usuarios/usuarios-principal/usuarios-principal.component';
import { EstadisticasPrincipalComponent } from './components/inicioAdministrador/estadisticas/estadisticas-principal/estadisticas-principal.component';
import { TorneoComponent } from './components/inicioAdministrador/torneos/torneo/torneo.component';
import { PartidosComponent } from './components/inicioAdministrador/torneos/partidos/partidos.component';
import { EquiposComponent } from './components/inicioAdministrador/torneos/equipos/equipos.component';
import { GraficasComponent } from './components/inicioAdministrador/torneos/graficas/graficas.component';
import { TablaComponent } from './components/inicioAdministrador/torneos/tabla/tabla.component';
import { ChartsModule } from 'ng2-charts';
import { ListUsuariosComponent } from './components/inicioAdministrador/usuarios/list-usuarios/list-usuarios.component';
import { AddUsuarioComponent } from './components/inicioAdministrador/usuarios/add-usuario/add-usuario.component';
import { EditarCuentaComponent } from './components/inicio/editar-cuenta/editar-cuenta.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    CarouselComponent,
    NavbarComponent,
    RegisterComponent,
    ResultadosComponent,
    HomeAdministradorComponent,
    TorneoInicioComponent,
    UsuariosPrincipalComponent,
    EstadisticasPrincipalComponent,
    TorneoComponent,
    PartidosComponent,
    EquiposComponent,
    GraficasComponent,
    TablaComponent,
    ListUsuariosComponent,
    AddUsuarioComponent,
    EditarCuentaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressBarModule,
    ChartsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
