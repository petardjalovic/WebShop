import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm! : FormGroup |any  ;
  errors! : string[] ;
  proverimejl! : string;
    constructor( private fb : FormBuilder , private acc : AccountService , private router : Router ) { }
  
    ngOnInit(): void {
      this.CreateRegisterForm();
    this.proverimejl=this.registerForm.value.email;
    this.validetateemail();
    }
  
  CreateRegisterForm(){
    this.registerForm = this.fb.group({
      displayName:[null, [Validators.required]],
      email :[null , [Validators.required ,Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]
  ],
      password :[null , [Validators.required ,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$')]]
    });
  
  }
  onSubmit(){
    console.log(this.registerForm.value);
    this.acc.register(this.registerForm.value).subscribe(response=>{
      this.router.navigateByUrl('/shop');
    }, error=>{
      console.log(error);
      this.errors=error.errors;
    });
  }
  validetateemail(){
    return this.acc.checkemail(this.proverimejl).pipe(
      map(res=>{
        return res?{emailExists :true} :null;
        
      })
    );
  }
  }
