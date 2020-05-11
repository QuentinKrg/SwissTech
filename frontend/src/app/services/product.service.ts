import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Manufacturer } from '../models/Manufacturer';
import { Color } from '../models/Color';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
    setInterval(()=> { this.CleanupLocks().subscribe(); }, 60000);
  }

  getTest(){
    return this.http.get<Product[]>(environment.backendURL + 'start.php?' + 'c=Product&f=TestMBAD');
  }
 
  getAllProducts() {
    return this.http.get<Product[]>(environment.backendURL + 'start.php?' + 'c=Product&f=GetAll');
  }

  getRandoms(id: number) {
    return this.http.get<Product[]>(environment.backendURL + 'start.php?' + 'c=Product&f=GetRandom&id='+id);
  }

  deleteProduct(id:number) {
    return this.http.delete<Product[]>(environment.backendURL + 'start.php?' + 'c=Product&f=Delete&id=' +id);
  }

  addProduct(product: Product) {
    return this.http.post<Product[]>(environment.backendURL + 'start.php?' + 'c=Product&f=AddProduct',  product);
  }

  getProductById(id:number) {
    return this.http.get<Product>(environment.backendURL + 'start.php?' + 'c=Product&f=GetById&id=' +id);
  }

  getProductDetailsById(id:number) {
    return this.http.get<Product>(environment.backendURL + 'start.php?' + 'c=Product&f=GetDetailsById&id=' +id);
  }

  updateProduct(product: Product) {
    return this.http.post<Product[]>(environment.backendURL + 'start.php?' + 'c=Product&f=UpdateProduct',  product);
  }

  updateProductStatus(product: Product) {
    return this.http.post<Product[]>(environment.backendURL + 'start.php?' + 'c=Product&f=UpdateProductStatus',  product);
  }

  uploadProductImage(formData: FormData) {
    return this.http.post(environment.backendURL+'start.php?'+'c=Product&f=UploadImage', formData);
  }

  getAllManufacturer() {
    return this.http.get<Manufacturer[]>(environment.backendURL + 'start.php?' + 'c=Product&f=GetAllManufacturer');
  }
  GetAllColors() {
    return this.http.get<Color[]>(environment.backendURL + 'start.php?' + 'c=Product&f=GetAllColors');
  }
  CheckLock(id:number) {
    return this.http.get<Product>(environment.backendURL + 'start.php?' + 'c=Product&f=LockCheck&id=' +id);
  }
  UpdateLock(id:number) {
    return this.http.get(environment.backendURL + 'start.php?' + 'c=Product&f=UpdateLock&id=' +id);
  }
  AddLock(id:number, username: string) {
    return this.http.get(environment.backendURL + 'start.php?' + 'c=Product&f=AddLock&id=' +id+'&username='+username);
  }
  ReleaseLock(id:number, username: string) {
    return this.http.get(environment.backendURL + 'start.php?' + 'c=Product&f=ReleaseLock&id=' +id+'&username='+username);
  }
  ForceReleaseLock(id:number) {
    return this.http.get(environment.backendURL + 'start.php?' + 'c=Product&f=ForceReleaseLock&id=' +id);
  }
  CleanupLocks() {
    console.log('clean');
    
    return this.http.get(environment.backendURL + 'start.php?' + 'c=Product&f=CleanupLocks');
    
  }
  checkImagePathAvability(imagePath: string){
    return new Promise(
      (resolve, reject) => {
        this.http.get(environment.backendURL + 'start.php?' + 'c=Product&f=CheckImagePathAvability&ImagePath='+imagePath).toPromise().then(
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