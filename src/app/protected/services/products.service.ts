import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http:HttpClient) {}

  listProducts(){
    const url = `${this.baseUrl}/api/products`  

    const headers = new HttpHeaders()
          .set('x-token',localStorage.getItem('token')  || '');

          return this.http.get(url,{headers})
                  .pipe(
                    map( (resp:any) => {
                        return resp.products;
                    })
                  )
  }


}
