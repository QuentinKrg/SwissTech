import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {

  }

  getTest(){
    return this.http.get<Product[]>(environment.backendURL + 'start.php?' + 'c=Product&f=TestMBAD');
  }
 
  getProducts() {
    return this.http.get<Product[]>(environment.backendURL + 'start.php?' + 'c=Product&f=GetAll');
  }

  getRandoms(id: number) {
    return this.http.get<Product[]>(environment.backendURL + 'start.php?' + 'c=Product&f=GetRandom&id='+id);
  }

  deleteProduct(id:number) {
    return this.http.delete<Product[]>(environment.backendURL + 'start.php?' + 'c=Product&f=Delete&id=' +id);
  }

  addProduct(product: Product) {
    return this.http.post<Product[]>(environment.backendURL + 'start.php?' + 'c=Product&f=AddProtected',  product);
  }

  getProductById(id:number) {
    return this.http.get<Product>(environment.backendURL + 'start.php?' + 'c=Product&f=GetById&id=' +id);
  }

  getProductDetailsById(id:number) {
    return this.http.get<Product>(environment.backendURL + 'start.php?' + 'c=Product&f=GetDetailsById&id=' +id);
  }

  updateProduct(product: Product) {
    return this.http.post<Product[]>(environment.backendURL + 'start.php?' + 'c=Product&f=Update',  product);
  }
}