import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Manufacturer } from '../models/Manufacturer';
import { Color } from '../models/Color';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
    setInterval(()=> { this.CleanupLocks().subscribe(); }, 60000);
  }

  getAllProducts() {
    return this.http.get<Product[]>(environment.backendURL + 'start.php?' + 'c=Product&f=GetAll');
  }

  getRandoms(id: number) {
    return this.http.get<Product[]>(environment.backendURL + 'start.php?' + 'c=Product&f=GetRandom&id='+id);
  }

  getLatestArticles(id: number) {
    return this.http.get<Product[]>(environment.backendURL + 'start.php?' + 'c=Product&f=GetLatestArticles&id='+id);
  }

  deleteProduct(id:number) {
    return this.http.delete<Product[]>(environment.backendURL + 'start.php?' + 'c=Product&f=Delete&id=' +id);
  }

  addProduct(product: Product) {
    return this.http.post<Product[]>(environment.backendURL + 'start.php?' + 'c=Product&f=AddProductMBAD',  product);
  }

  getProductById(id:number) {
    return this.http.get<Product>(environment.backendURL + 'start.php?' + 'c=Product&f=GetById&id=' +id);
  }

  getProductDetailsById(id:number) {
    return this.http.get<Product[]>(environment.backendURL + 'start.php?' + 'c=Product&f=GetDetailsById&id=' +id);
  }

  updateProduct(product: Product) {
    return this.http.post<Product[]>(environment.backendURL + 'start.php?' + 'c=Product&f=UpdateProductMBAD',  product);
  }

  updateProductStatus(product: Product) {
    return this.http.post<Product[]>(environment.backendURL + 'start.php?' + 'c=Product&f=UpdateProductStatusMBAD',  product);
  }

  uploadProductImage(formData: FormData) {
    return this.http.post(environment.backendURL+'start.php?'+'c=Product&f=UploadImageMBAD', formData);
  }

  getAllManufacturer() {
    return this.http.get<Manufacturer[]>(environment.backendURL + 'start.php?' + 'c=Product&f=GetAllManufacturer');
  }
  GetAllColors() {
    return this.http.get<Color[]>(environment.backendURL + 'start.php?' + 'c=Product&f=GetAllColors');
  }
  CheckLock(id:number) {
    return this.http.get<Customer>(environment.backendURL + 'start.php?' + 'c=Product&f=LockCheckMBAD&id=' +id);
  }
  UpdateLock(id:number) {
    return this.http.get(environment.backendURL + 'start.php?' + 'c=Product&f=UpdateLockMBAD&id=' +id);
  }
  AddLock(id:number, username: string) {
    return this.http.get(environment.backendURL + 'start.php?' + 'c=Product&f=AddLockMBAD&id=' +id+'&username='+username);
  }
  ReleaseLock(id:number, username: string) {
    return this.http.get(environment.backendURL + 'start.php?' + 'c=Product&f=ReleaseLockMBAD&id=' +id+'&username='+username);
  }
  ForceReleaseLock(id:number) {
    return this.http.get(environment.backendURL + 'start.php?' + 'c=Product&f=ForceReleaseLockMBAD&id=' +id);
  }
  CleanupLocks() {   
    return this.http.get(environment.backendURL + 'start.php?' + 'c=Product&f=CleanupLocks');
    
  }
  checkImagePathAvability(imagePath: string){
    return new Promise(
      (resolve, reject) => {
        this.http.get(environment.backendURL + 'start.php?' + 'c=Product&f=CheckImagePathAvabilityMBAD&ImagePath='+imagePath).toPromise().then(
          () => {
            resolve();
          },
          (error) => {
            reject(error)
          }
        );
      }
    );
  }
}