import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { RendimientosComponent } from './rendimientos/rendimientos.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductformComponent } from './productform/productform.component';


@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    PortfolioComponent,
    RendimientosComponent,
    ProductformComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    HttpClientModule
  ]
})
export class ProtectedModule { }
