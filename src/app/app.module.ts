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
import { TorneoComponent } from './components/inicioAdministrador/torneos/torneo/torneo.component';
import { PartidosComponent } from './components/inicioAdministrador/torneos/partidos/partidos.component';
import { EquiposComponent } from './components/inicioAdministrador/torneos/equipos/equipos.component';
import { GraficasComponent } from './components/inicioAdministrador/torneos/graficas/graficas.component';
import { TablaComponent } from './components/inicioAdministrador/torneos/tabla/tabla.component';
import { ChartsModule } from 'ng2-charts';
import { ListUsuariosComponent } from './components/inicioAdministrador/usuarios/list-usuarios/list-usuarios.component';
import { AddUsuarioComponent } from './components/inicioAdministrador/usuarios/add-usuario/add-usuario.component';
import { EditarCuentaComponent } from './components/inicio/editar-cuenta/editar-cuenta.component';
import { FormsModule } from '@angular/forms';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { HomeUserComponent } from './components/inicioUser/home-user/home-user.component';
import { NavbarTorneoComponent } from './components/inicioUser/torneos/navbar-torneo/navbar-torneo.component';
import { TorneoInicioUserComponent } from './components/inicioUser/torneos/torneo-inicio-user/torneo-inicio-user.component';
import { PartidosUserComponent } from './components/inicioUser/torneos/partidos-user/partidos-user.component';
import { EquiposUserComponent } from './components/inicioUser/torneos/equipos-user/equipos-user.component';


const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'left',
			distance: 12
		},
		vertical: {
			position: 'bottom',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

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
    TorneoComponent,
    PartidosComponent,
    EquiposComponent,
    GraficasComponent,
    TablaComponent,
    ListUsuariosComponent,
    AddUsuarioComponent,
    EditarCuentaComponent,
    HomeUserComponent,
    NavbarTorneoComponent,
    TorneoInicioUserComponent,
    PartidosUserComponent,
    EquiposUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressBarModule,
    ChartsModule, 
    NotifierModule.withConfig(customNotifierOptions)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
