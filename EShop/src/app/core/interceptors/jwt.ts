import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, retry } from "rxjs";

@Injectable()
export class Jwt implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        if (token){
            req = req.clone({
                setHeaders :{authorization :`Bearer ${token}`}
            });
        }
        return next.handle(req);
        ;
        
    }
}