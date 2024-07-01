import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.css']
})
export class LogginComponent implements OnInit {

  loginform!: FormGroup | any;




  constructor(private accService: AccountService, private routher: Router) { }

  ngOnInit(): void {
    this.createLoginform();
    this.getemail();
  }
  createLoginform() {
    this.loginform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
      )])
    });
  }
  onSubmit() {
    this.accService.login(this.loginform.value).subscribe(() => {
      this.routher.navigateByUrl('/shop');
    }, error => {
      console.log(error);
    });
  }
  getemail() {
    return this.loginform.get('email');
  }
}
