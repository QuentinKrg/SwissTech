import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Categories } from '../models/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) {

  }

  getAllMainGategories() {
    return this.http.get<Categories[]>(environment.backendURL + 'start.php?' + 'c=Categories&f=GetAllMain');
  }
}