import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'gusers',
    loadChildren: () => import('./pages/gusers/gusers.module').then( m => m.GusersPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'gftranslocacion',
    loadChildren: () => import('./pages/gftranslocacion/gftranslocacion.module').then( m => m.GftranslocacionPageModule)
  },
  {
    path: 'gaderivacion',
    loadChildren: () => import('./pages/gaderivacion/gaderivacion.module').then( m => m.GaderivacionPageModule)
  },
  {
    path: 'gfdeceso',
    loadChildren: () => import('./pages/gfdeceso/gfdeceso.module').then( m => m.GfdecesoPageModule)
  },
  {
    path: 'garecepcion',
    loadChildren: () => import('./pages/garecepcion/garecepcion.module').then( m => m.GarecepcionPageModule)
  },
  {
    path: 'ghclinica',
    loadChildren: () => import('./pages/ghclinica/ghclinica.module').then( m => m.GhclinicaPageModule)
  },
  {
    path: 'ver-acta',
    loadChildren: () => import('./modales/ver-acta/ver-acta.module').then( m => m.VerActaPageModule)
  },
  {
    path: 'gasilvestre',
    loadChildren: () => import('./pages/gasilvestre/gasilvestre.module').then( m => m.GasilvestrePageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }