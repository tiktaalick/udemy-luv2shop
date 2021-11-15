import { OktaAuthService } from '@okta/okta-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean = false;
  userFirstName: string = '';

  storage: Storage = sessionStorage;

  constructor(private oktaAuthService: OktaAuthService) { }

  ngOnInit(): void {
    this.oktaAuthService.$authenticationState.subscribe(
      (result) => {
        this.isAuthenticated = result;
        this.getUserDetails();
      }
    )
  }

  getUserDetails() {
    if (this.isAuthenticated) {
      this.oktaAuthService.getUser().then(
        result => {
          this.userFirstName = result.given_name!;
          this.storage.setItem('userEmail', JSON.stringify(result.email));
          this.storage.setItem('userFirstName', JSON.stringify(result.given_name));
          this.storage.setItem('userLastName', JSON.stringify(result.family_name));
        }
      );
    }
  }

  logout() {
    this.oktaAuthService.signOut();
  }

}
