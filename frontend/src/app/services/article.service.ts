import { Injectable } from '@angular/core';
import { Article } from '../models/article';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {

  }
 
  getArticles() {
    return this.http.get<Article[]>(environment.backendURL + 'start.php?' + 'c=Article&f=GetAll');
  }

  deleteArticle(id:number) {
    return this.http.delete<Article[]>(environment.backendURL + 'start.php?' + 'c=Article&f=Delete&id=' +id);
  }

  addArticle(article: Article) {
    return this.http.post<Article[]>(environment.backendURL + 'start.php?' + 'c=Article&f=Add',  article);
  }

  getArticleById(id:number) {
    return this.http.get<Article[]>(environment.backendURL + 'start.php?' + 'c=Article&f=GetById&id=' +id);
  }

  updateArticle(article: Article) {
    return this.http.post<Article[]>(environment.backendURL + 'start.php?' + 'c=Article&f=Update',  article);
  }
}
