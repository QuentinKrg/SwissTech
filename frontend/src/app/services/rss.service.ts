import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RssService {

  constructor(private _http: HttpClient) {
   
  }

  // Récupération du fichier XML pour le flux RSS
  GetRSSFeed() {
    this._http.get(environment.backendURL + 'start.php?' + 'c=RSS&f=GetFeed').subscribe(response => this.downloadFile(response,'text/xml'));
  }

  // Création du lien + fichier pour le téléchargement
  downloadFile(data: any, type: string) {
    
    let binaryData = [];
    binaryData.push(data);
    
    let downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: type}));
    downloadLink.setAttribute('download', "RSS_SwissTech.xml");
    document.body.appendChild(downloadLink);
    downloadLink.click(); 
  }
  


}