import { Component } from '@angular/core';
import { AppService } from './../app.service';

export class User {
  constructor(public name: string, public phoneNumber: number, public email: string, public address: string) {
  }
}

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})

export class UserDetailsComponent {
 data:any = [];
  constructor(private appService: AppService) {
    this.data = this.appService.getValues();
    console.log('detailscomp', this.data);
  }

  ngOnInit() {

  }


}