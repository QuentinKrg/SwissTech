import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  articles: Article[];
  private _id: number;
  constructor(private _articleService: ArticleService,
              private _router: Router) { }

  ngOnInit() {
    this._articleService.getArticles()
      .subscribe((data: Article[]) =>{
        this.articles = data;
      });
  }

  onEdit(article: Article):void {
    this._id = article.id;
    this._router.navigate(['edit/' + this._id]);
  }

  onDelete(article: Article):void {
    this._articleService.deleteArticle(article.id)
      .subscribe(data => {
        this.articles = this.articles.filter(u => u !== article);
      });
  }

  monstreTest():void {
    this._articleService.getTest()
      .subscribe(data => {
        console.log(data+"test");
      },
      error => {
        console.log(error + "dfdf");
      });
  }

}
