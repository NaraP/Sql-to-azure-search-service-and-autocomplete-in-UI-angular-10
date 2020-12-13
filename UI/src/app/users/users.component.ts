import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AppService } from './../app.service';

export class User {
  constructor(public name: string, public phoneNumber: number, public email: string, public address: string) {
  }
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent {
  myControl = new FormControl();
  options1: any;
  options2: any;
  ready: boolean;
  option: any;
  selectedUsers: User[] = new Array<User>();
  userControl: FormControl = new FormControl();


  filteredOptions: Observable<string[]>;

  constructor(private appService: AppService, private router: Router) {
    this.appService.getList().subscribe(data => {
      this.options2 = data;
    //  this.options1 = this.options2.map(value => value.name)
   //   console.log('this.options1', this.options1);
      this.filteredOptions = this.myControl.valueChanges.pipe(startWith(''),
        map(value => this._filter(value))
      );
      console.log('optionsfiltered', this.filteredOptions);
      console.log('DATA', data);
    });
  }

  ngOnInit() {

  }

  displayFn(value: User[] | string): string | undefined {
    let displayValue: string;
    if (Array.isArray(value)) {
      value.forEach((user) => {
          displayValue = user.name;
      });
    } else {
      displayValue = value;
    }
    return displayValue;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options2.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  getValue(user){
    this.selectedUsers.push(user);
    this.userControl.setValue(this.selectedUsers);
    this.appService.setValues(this.selectedUsers);  
    console.log('SELECTED USERS', this.selectedUsers);
    this.router.navigateByUrl('/details');
  }
}