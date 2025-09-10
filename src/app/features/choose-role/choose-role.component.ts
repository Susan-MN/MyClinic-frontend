import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-choose-role',
  imports: [],
  standalone: true,
  templateUrl: './choose-role.component.html',
  styleUrl: './choose-role.component.scss'
})
export class ChooseRoleComponent {

  
constructor(private authService:AuthService,
  private profileService:ProfileService,
  private router:Router){}

setRole(role:'doctor' | 'user'){
  
  const user=this.authService.getUserProfile();
   if (!user) return; 
  this.profileService.syncProfile({
    keycloakId:user.keycloakId,
    username:user.username,
      email:user.email,
      role:role
  }).subscribe({
    next:()=>{
      if(role === 'doctor'){
    this.router.navigate(['/doctor-dashboard']);
  } else {
    this.router.navigate(['/user-dashboard']);
  }
    }
  });
  
}

}
