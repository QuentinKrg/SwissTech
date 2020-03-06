import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  articles: Article[];
  constructor(private _articleService: ArticleService) { }

  ngOnInit() {
    this._articleService.getArticles()
      .subscribe((data: Article[]) =>{
        this.articles = data;
      });
  }

}
