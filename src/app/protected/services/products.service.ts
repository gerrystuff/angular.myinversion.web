import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, catchError, tap } from 'rxjs/operators';
import { ProductI, SuccesResponse } from 'src/app/auth/interfaces/product.interface';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl: string = environment.baseUrl;


  constructor(private http: HttpClient) { }

  listProducts() {
    const url = `${this.baseUrl}/api/products`

    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get(url, { headers })
      .pipe(
        map((resp: any) => {
          return resp.products;
        })
      )
  }


  create(product: ProductI) {
    const url = `${this.baseUrl}/api/products/`
    console.log(url);

    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

      console.log(product)

    return this.http.post<SuccesResponse>(url, product, { headers })
      .pipe(
        map(resp => {
          console.log(resp);
          return resp.ok;
        }
        ),
        catchError(err => of(err.error.msg)))

  }


  delete(id: string) {
    const url = `${this.baseUrl}/api/products/${id}`
    console.log(url);

    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');


    return this.http.delete<SuccesResponse>(url, { headers })
      .pipe(
        map(resp => {
          console.log(resp);
          return resp.ok;
        }
        ),
        catchError(err => of(err.error.msg)))
  }

  getProduct(id:string){
    const headers = new HttpHeaders()
      .set('x-token',localStorage.getItem('token') || '')


      return this.http.get<SuccesResponse>(`${this.baseUrl}/api/products/${id}`, { headers })
      .pipe(
        map(resp => {
          return resp;
        }
        ),
        catchError(err => of(err.error.msg)))
  }

  editProduct(id:string,product:ProductI){
    const url = `${this.baseUrl}/api/products/${id}`
    console.log(url);

    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');


    return this.http.put<SuccesResponse>(url, product, { headers })
      .pipe(
        map(resp => {
          console.log(resp);
          return resp.ok;
        }
        ),
        catchError(err => of(err.error.msg)))
  }


}
