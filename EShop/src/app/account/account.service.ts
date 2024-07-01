import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/Models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentuser = new BehaviorSubject<IUser | null>(null);
  currentuser$ = this.currentuser.asObservable();
  constructor(private http: HttpClient, private router: Router) { }

getCurentUservalue() {
  return this.currentuser.value;
}


loadCurentUser(token: string) {
  let headers = new HttpHeaders();
  headers = headers.set('Authorization', `Bearer ${token}`);
  return this.http.get(this.baseUrl + 'account', { headers }).pipe(
    map((user: any) => {
      if (user) {
        localStorage.setItem('token', user.token);
        this.currentuser.next(user);
      }
    })
  );
}

login(values: any) {
  return this.http.post(this.baseUrl + 'account/login', values).pipe(
    map((user: any) => {
      if (user) {
        localStorage.setItem('token', user.token);
        this.currentuser.next(user);
      }
    })
  );
}
register(values: any) {
  return this.http.post(this.baseUrl + 'account/register', values).pipe(
    map((user: any) => {
      if (user) {
        localStorage.setItem('token', user.token);
        this.currentuser.next(user);
      }
    })
  )
}
logout() {
  localStorage.removeItem('token');
  this.currentuser.next(null);
  this.router.navigateByUrl('/')
}
checkemail(email: string) {
  return this.http.get(this.baseUrl + '/account/emailexists?email=' + email);
}
}