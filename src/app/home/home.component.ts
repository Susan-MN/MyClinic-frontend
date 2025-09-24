import { Component,OnInit  } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [],
   template: `
    <div class="home-container">
      <h1>Welcome to My Clinic</h1>
      <button (click)="onRegister()">Register</button>
    </div>
  `,
  styles: [`
    .home-container {
      text-align: center;
      margin-top: 50px;
    }
    button {
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
    }
  `]
})
export class HomeComponent implements OnInit{
 constructor(private authService: AuthService) {}
ngOnInit() {
    
    const user = this.authService.getUserProfile();
    if (user) {
      this.authService.navigateBasedOnRole();
    }
  }
  onRegister() {
    this.authService.register();  
  }
}
