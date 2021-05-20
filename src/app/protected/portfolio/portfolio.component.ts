import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styles: [
  ]
})
export class PortfolioComponent {

  products:any = [];

  constructor(
    private productService:ProductsService
  ) { 
    this.list();
  }


  list(){
    this.productService.listProducts()
          .subscribe(resp =>{
              this.products = resp;
          } );
          
  }


  // Create our number formatter.
formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});



}
