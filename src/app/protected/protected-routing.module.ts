import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ProductformComponent } from './productform/productform.component';
import { RendimientosComponent } from './rendimientos/rendimientos.component';

const routes: Routes = [
  {
    path:'',
    component:NavbarComponent,
    children: [
      {path:'',component:PortfolioComponent} ,
      {path:'portfolio',component:PortfolioComponent} ,
      {path:'rendimientos',component:RendimientosComponent} ,
      {path:'product/add', component:ProductformComponent},
      {path:'product/edit/:id', component:ProductformComponent},

      

      {path:'**',redirectTo:''} 

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
