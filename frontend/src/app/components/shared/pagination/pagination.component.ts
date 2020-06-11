import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  //Pagination
  @Input() currentPage = 1;
  @Input() itemsPerPage = 5;
  @Input() pageSize: number;
  @Input() collectionSize: number;

  @Output() pageSizeEvent = new EventEmitter<number>();
  @Output() itemsPerPageEvent = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
    this.pageSizeEvent.emit(this.pageSize)
    this.itemsPerPageEvent.emit(this.itemsPerPage);
  }

  //fonction de pagination, sélection de page
  onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
    this.pageSizeEvent.emit(this.pageSize)
  }
//Fonction de pagination, sélection de nombre d'items par page
  changePagesize(num) {
    this.itemsPerPage = num;
    this.itemsPerPageEvent.emit(this.itemsPerPage);
  }
}
