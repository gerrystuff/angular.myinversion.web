import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import utilities from '../helpers/utilities';
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



deleteProduct(id:string):void{
  this.productService.delete(id)
  .subscribe(ok => {
    if(ok === true){
      Swal.fire('Success','Usuario eliminado','success');
      this.list();
    }else{
      Swal.fire('Error',ok,'error');
    }
  })
    
}


}
