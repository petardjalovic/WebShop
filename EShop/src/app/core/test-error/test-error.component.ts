import { HttpClient } from '@angular/common/http';
import { Component ,OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent implements OnInit {

  constructor(private http: HttpClient) { }
  validationErrors: any;
  baseurl = environment.apiUrl;
  ngOnInit(): void {
  }

  get404Error() {
    this.http.get(this.baseurl + 'products/1').subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }
  get500Error() {
    this.http.get(this.baseurl + 'buggy/servererror').subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }
  get400Error() {
    this.http.get(this.baseurl + 'buggy/badrequest').subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }
  get400VError() {
    this.http.get(this.baseurl + 'products/fortytwo').subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
      this.validationErrors = error.errors;
    });
  }
}