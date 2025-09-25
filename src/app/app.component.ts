import { Component ,OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ProfileService } from './services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
   standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  constructor(public authService: AuthService) {}

  // ngOnInit(): void {
  //   this.authService.init()
  //     .then(() => console.log('Keycloak initialized'))
  //     .catch(err => console.error('Keycloak init error', err));
  // }
 
  }


