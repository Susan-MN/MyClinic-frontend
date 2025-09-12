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
export class AppComponent implements OnInit{
  title = 'MyClinic-frontend';
  constructor(private authService: AuthService, private profileService: ProfileService,private router: Router){}
   ngOnInit():void{
    this.initAuthFlow();
  }
  private async initAuthFlow():Promise<void>
  {
     const isloggedIn = await this.authService.isLoggedIn();
     console.log('Is logged in:', isloggedIn);

    // if (loggedIn) {
    //   const token = await this.keycloak.getToken();
    //   console.log('Token:', token);
    

    if (!isloggedIn) {
  await this.authService.login({
    redirectUri: window.location.origin + '/choose-role'
     });
  return;
}

       const profile = await this.authService.getUserProfile();
         const roles = this.authService.getUserRole();
        // roles = roles.filter(r => !r.startsWith('default-roles'));

      if (!roles || roles.length === 0 ||!roles.includes('doctor') && !roles.includes('user')) {
  this.router.navigate(['/choose-role']);
  return;
   }

     const role = roles.includes('doctor') ? 'doctor' : 'user';
  this.profileService.syncProfile({
    keycloakId: profile.keycloakId,
    username: profile.username,
    email: profile.email,
    role: role
  }).subscribe({
    next: () => console.log('Profile synced successfully'),
    error: (err) => console.error('Profile sync failed:', err)
  });
   
  
  if (role === 'doctor') {
    this.router.navigateByUrl('/doctor-dashboard');
  } else {
    this.router.navigateByUrl('/user-dashboard');
  }

    }
    
  }


