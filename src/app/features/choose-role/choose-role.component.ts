import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-choose-role',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './choose-role.component.html',
  styleUrls: ['./choose-role.component.scss']
})
export class ChooseRoleComponent  {

  
constructor(private authService:AuthService,
  private profileService:ProfileService,
  private router:Router){}

public setRole(role:'doctor' | 'user'){    
  const user=this.authService.getUserProfile();
    if (!user) {
      this.authService.login();
       return;
    }
  //  if (!user) return; 
  this.profileService.syncProfile({
    keycloakId:user.keycloakId,
    username:user.username,
      email:user.email,
      role:role
  }).subscribe({
    next:()=>{
      this.router.navigate([role === 'doctor' ? '/doctor-dashboard' : '/user-dashboard'], { replaceUrl: true });

    },
     error: (err) => {
    console.error('SyncProfile failed', err);
  }
  });
  
}

}
