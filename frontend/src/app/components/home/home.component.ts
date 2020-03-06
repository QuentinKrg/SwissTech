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

  recommendationList: Article[];
  private _id: number;
  constructor(private _articleService: ArticleService,
              private _router: Router) { }

  ngOnInit() {
    this._articleService.getRandoms(4)
      .subscribe((data: Article[]) =>{
        this.recommendationList = data;
        console.log(data);
    });
  }

  onEdit(article: Article):void {

  }

  onDelete(article: Article):void {

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
