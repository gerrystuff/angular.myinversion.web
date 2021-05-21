import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidarLogGuard } from 'src/app/guards/validar-log.guard';
import Swal from 'sweetalert2';
import utilities from '../helpers/utilities';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-productform',
  templateUrl: './productform.component.html',
  styles: [
  ]
})



export class ProductformComponent implements OnInit {

  title:string = '';
  btnTitle:string = '';
  edit:boolean = false;

  newProductForm: FormGroup = this.formBuilder.group({
    product_name: ['Plan Active', [Validators.required]],
    product_minInvestment: [, [Validators.required]],
    product_maxInvestment: [, [Validators.required]],
    product_monthlyRate: [, [Validators.required]],
    product_planTime: [, [Validators.required, Validators.maxLength(2)]],

  })

  ngOnInit() {
    const params = this.activedRoute.snapshot.params //objeto ruta

    if (params.id) {
      this.productService.getProduct(params.id)
        .subscribe(ok => {
          this.newProductForm.patchValue({
            product_name: ok.product.product_name,
            product_minInvestment: ok.product.product_minInvestment,
            product_maxInvestment: ok.product.product_maxInvestment,
            product_monthlyRate: ok.product.product_monthlyRate,
            product_planTime: ok.product.product_planTime
          })

          this.title = 'Editar producto';
          this.btnTitle = 'Editar producto'
          this.edit = true;
        },
         err => console.log('Contacte con el administrador.', err)
        )

    } else {
          this.title = 'Nuevo producto';
          this.btnTitle = 'Agregar producto'
          this.edit = false;

    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductsService,
    private activedRoute: ActivatedRoute
  ) { }

  createProduct() {
    console.log(this.newProductForm.value);

    this.productService.create(this.newProductForm.value)
      .subscribe(ok => {

        if (ok === true) {
          Swal.fire('Success', 'Plan creado!', 'success');
          utilities.waitUnTill();
          this.router.navigate(['/home/portfolio'])
        } else {
          Swal.fire('Error', ok, 'error');
        }
      })

  }

  editProduct(){
    const params = this.activedRoute.snapshot.params //objeto ruta
    this.productService.editProduct(params.id,this.newProductForm.value)
          .subscribe(ok => {
            if(ok === true){
          Swal.fire('Success', 'Plan editado!', 'success');
          this.router.navigate(['/home/portfolio'])
            } else {
          Swal.fire('Error', ok, 'error');
              
            }
          })

  }


}
