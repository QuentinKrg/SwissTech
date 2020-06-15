import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  //Variables
  currentPage = 1;
  itemsPerPage = 5;
  pageSize: number;
  //Récuperation du nombre d'items depuis le component cible
  @Input() collectionSize: number;
  //Envoie le choix d'item par page et taille de la page pour le slice des données
  @Output() pageSizeEvent = new EventEmitter<number>();
  @Output() itemsPerPageEvent = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
    //Affecte les valeurs choisies
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
