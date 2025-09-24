import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly baseUrl=environment.apiUrl;
    constructor(private router:Router , private http:HttpClient) {}
      syncProfile(data:{keycloakId:string;username:string;email:string;role:string}) {
        console.error("entered")
     return this.http.post(`${this.baseUrl}/profile/sync`, data);
  }



  
}
