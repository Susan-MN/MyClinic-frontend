import { Component, inject, OnDestroy } from '@angular/core';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-home',
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
  `],
  imports: []
})
export class HomeComponent {

  private readonly keycloak = inject(Keycloak);

  onRegister() {
    this.keycloak.register({
      redirectUri: window.location.origin + '/choose-role'
    });
  }
}
