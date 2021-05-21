import { compileNgModule } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductI } from 'src/app/auth/interfaces/product.interface';
import { ValidarLogGuard } from 'src/app/guards/validar-log.guard';
import utilities from '../helpers/utilities';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-rendimientos',
  templateUrl: './rendimientos.component.html',
  styles: [
  ]
})
export class RendimientosComponent {

  products: any = [];
  state: boolean = false;
  product_toSimulate: any = {};
  count:number = 0;
  totalFinal:number = 0;

  logForm: FormGroup = this.formBuilder.group({
    plan: [, Validators.required],
    monto: [10000, Validators.required],
    date: ['2020-05-06', Validators.required]
  })

  constructor(
    private productService: ProductsService,
    private formBuilder: FormBuilder
  ) { this.getProducts() }

  getProducts() {
    this.productService.listProducts()
      .subscribe(resp => {
        this.products = resp;
      });
  }

  run() {

    this.product_toSimulate = {};
    this.count = 0;
    this.totalFinal = 0;

    this.product_toSimulate = {
      plan: this.logForm.value.plan,
      monto: this.logForm.value.monto,
      date: this.logForm.value.date,
      simulacion: [

      ]
    }

    console.log(this.product_toSimulate)

    this.products.find((obj: any) => {
      if (obj.product_name === this.logForm.value.plan) {

        this.product_toSimulate['monthlyRate'] = obj.product_monthlyRate;
        this.product_toSimulate['planTime'] = obj.product_planTime;
        
        let rend = 0;

        let aux = utilities.formatDate(this.logForm.value.date)
   
        for (let i = 0; i < this.product_toSimulate.planTime; i++) {         
          this.product_toSimulate.simulacion.push({
            rend:rend,
            date:aux
          })

          let aux2 = new Date(aux);
          let aux3 = new Date(new Date(aux2).setMonth(aux2.getMonth()+1))
         
          aux = utilities.formatDate(aux3)
         
          this.count += rend;
          rend = this.product_toSimulate.monto * ( this.product_toSimulate.monthlyRate / 100);
         
        }

        this.totalFinal = this.product_toSimulate.monto + this.count;

        console.log(this.product_toSimulate);

        return obj;
      }
    })






    this.state = true;
  }

}
