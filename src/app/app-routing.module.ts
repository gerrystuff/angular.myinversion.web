import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarLogGuard } from './guards/validar-log.guard';
import { ValidarTokenGuard } from './guards/validar-token.guard';

const routes: Routes = [

  {
    
    path:'auth',
    loadChildren: () => import('./auth/auth.module')
                         .then(m => m.AuthModule),
                         canLoad:[ValidarLogGuard]
  },
  {
    path:'home',
    loadChildren: () => import('./protected/protected.module')
                        .then(m => m.ProtectedModule),
    canActivate: [ValidarTokenGuard],
    canLoad:[ValidarTokenGuard]                        
  },
  {
    path:'**',
    redirectTo: 'auth'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
