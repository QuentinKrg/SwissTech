import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service.';
import { Customer } from 'src/app/models/customer';
import { Comments } from 'src/app/models/comments';
import { faChartLine,faQuoteLeft,faQuoteRight,faUsers, faCrown} from '@fortawesome/free-solid-svg-icons';

import { faComments} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  //Icones
  faChartLine=faChartLine;
  faQuoteLeft=faQuoteLeft;
  faQuoteRight=faQuoteRight;
  faUsers=faUsers;
  faComments=faComments;
  faCrown=faCrown;
//Variables
CustomerNumber: number;
CommentNumber: number;
LastCustomerRegistered = new Customer;
LastCommentAdded = new Comments;
BestsellerProduct: string;

  constructor(private _statisticsService: StatisticsService,) { }

  ngOnInit() {
    window.scroll(0,0);
    this.GetNumberOfCustomers();
    this.GetLastCustomerRegistered();
    this.GetNumberOfComments();
    this.GetLastCommentAdded();
    this.GetBestSellerProduct()
  }

  GetNumberOfCustomers(){
    this._statisticsService.GetNumberOfCustomers().subscribe((data: number)=>{
      this.CustomerNumber = data;
    }
    )
  }
  GetLastCustomerRegistered(){
    this._statisticsService.GetLastCustomerRegistered().subscribe((data)=>{
      this.LastCustomerRegistered = data;
      console.log(this.LastCustomerRegistered);
      
    }
    )
  }
  GetNumberOfComments(){
    this._statisticsService.GetNumberOfComments().subscribe((data:number)=>{
      this.CommentNumber = data;
      console.log(this.CommentNumber);
      
    }
    )
  }
  GetLastCommentAdded(){
    this._statisticsService.GetLastCommentAdded().subscribe((data)=>{
      this.LastCommentAdded = data;
      console.log(this.LastCommentAdded);
      
    }
    )
  }
  GetBestSellerProduct(){
    this._statisticsService.GetBestSellerProduct().subscribe((data:string)=>{
      this.BestsellerProduct = data;
      console.log(this.BestsellerProduct);
    }
    )
  }
}
