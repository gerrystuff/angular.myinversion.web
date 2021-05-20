import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { RendimientosComponent } from './rendimientos/rendimientos.component';

const routes: Routes = [
  {
    path:'',
    component:NavbarComponent,
    children: [
      {path:'',component:HomeComponent} ,
      {path:'portfolio',component:PortfolioComponent} ,
      {path:'rendimientos',component:RendimientosComponent} ,
      

      {path:'**',redirectTo:''} 

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
