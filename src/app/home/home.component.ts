import { Component, OnInit } from '@angular/core';
import { AdalService } from 'adal-angular4';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: any;
  profile: any;
  displayedColumns: string[] = ['id', 'name'];
  data: any = [];

  constructor(private adalService: AdalService, protected http: HttpClient) { }

  ngOnInit() {

    this.user = this.adalService.userInfo;

    this.user.token = this.user.token.substring(0, 10) + '...';
    this.loadMemberDetails();
  }

  getMemberDetails(){
    return this.http.get("https://servise1-rus95.azurewebsites.net/users");
  }

  loadMemberDetails(){
    this.getMemberDetails().subscribe({
      next: result => {
        this.data = result['data'];
      }
    });
  }

  public getProfile() {
    console.log('Get Profile called');
    return this.http.get("https://graph.microsoft.com/v1.0/me");
  }

  public profileClicked() {
    this.getProfile().subscribe({
      next: result => {
        console.log('Profile Response Received');
        this.profile = result;
      }
    });
  }
}
