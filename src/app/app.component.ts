import { Component ,OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ProfileService } from './services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'MyClinic-frontend';
  constructor(private authService: AuthService, private profileService: ProfileService,private router: Router){}
   ngOnInit():void{
    this.initAuthFlow();
  }
  private async initAuthFlow():Promise<void>
  {
     const loggedIn = await this.authService.isLoggedIn();
     console.log('Is logged in:', loggedIn);

    // if (loggedIn) {
    //   const token = await this.keycloak.getToken();
    //   console.log('Token:', token);
    
    //   if (!(await this.authService.isLoggedIn())) {
    // await this.authService.login();  
    // return;
    //   }
    if (!(await this.authService.isLoggedIn())) {
  await this.authService.login({
    redirectUri: window.location.origin + '/choose-role'
    

  });
  return;
}

       const profile = await this.authService.getUserProfile();
         const roles = this.authService.getUserRole();
        // roles = roles.filter(r => !r.startsWith('default-roles'));

      if (!roles || roles.length === 0) {
  this.router.navigate(['/choose-role']);
   }
      // const isDoctor=await this.authService.hasRole('doctor');
     // const isUser=await this.authService.hasRole('user');

      if(!roles.includes('doctor') && !roles.includes('user'))
      {
        this.router.navigate(['/choose-role']);
      }
     else if (roles.includes('doctor')) {
    this.router.navigateByUrl('/doctor-dashboard');
  } else if (roles.includes('user')) {
    this.router.navigateByUrl('/user-dashboard');
  }
    }
  }


