import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Comments } from '../models/comments';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) {

  }

  getAllProductsComments(id: number) {
    return this.http.get<Comments[]>(environment.backendURL + 'start.php?' + 'c=Comments&f=getAllProductsComments&id='+id);
  }

  addComment(comment: Comments) {
    return this.http.post<Comments>(environment.backendURL + 'start.php?' + 'c=Comments&f=addCommentMBL', comment);
  }

  updateCommentStatus(comment: Comments) {
    return this.http.post<Comments[]>(environment.backendURL + 'start.php?' + 'c=Comments&f=UpdateCommentStatusMBAD',  comment);
  }

}