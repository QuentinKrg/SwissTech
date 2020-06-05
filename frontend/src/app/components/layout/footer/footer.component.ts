import { Component, OnInit } from '@angular/core';
import { faRss } from '@fortawesome/free-solid-svg-icons';
import { Categories } from 'src/app/models/categories';
import { CategoriesService } from 'src/app/services/categories.service';
import { Router } from '@angular/router';
import { RssService } from 'src/app/services/rss.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {


  // icons
  rssIcon = faRss ;

  mainCategories: Categories[];

  constructor(private _router: Router,
    private _categoriesService:CategoriesService,
    private _rssService: RssService) { }

  ngOnInit() {
    this._categoriesService.getAllMainGategories()
      .subscribe((data: Categories[]) =>{
        this.mainCategories = data;       
    }); 
  }

  getRssFeed() {
    this._rssService.GetRSSFeed();
  }

  refreshResults(category: Categories) {
    this._router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this._router.navigate(['products'],
        {
          queryParams: {cat: category.id},
          queryParamsHandling: 'merge'
        }
      );
    }); 
  }

}
