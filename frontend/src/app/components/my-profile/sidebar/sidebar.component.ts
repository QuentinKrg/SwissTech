import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';
import { faClipboardList,faUser,faHeart,faUserShield } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  //infos de l'user
  currentUser: User;
  currentUserRole: string;
  //icones
  faClipboardList=faClipboardList;
  faUser=faUser;
  faHeart=faHeart;
  faUserShield=faUserShield;
  constructor(
    private _authenticationService: AuthenticationService
  ) {
    //Récupère le role de l'user pour lui afficher ou pas le menu administration
    this._authenticationService.currentUser.subscribe(x => this.currentUser = x);
   }

  ngOnInit() {
    //Propriété pour check dans la vue, 
    this.currentUserRole = this.currentUser.role;
  }

}
