import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  username='';
  password='';
  email='';
 constructor(private http:HttpClient){}

  signup(){
    this.http.post('https://localhost:5001/api/auth/signup',{
      username:this.username,
      email:this.email,
      password:this.password
    }).subscribe({
      next:()=>alert('User Registration Successfull'),
      error:(err)=> alert('Registration failed:'+err.message)
    });
  }

}
