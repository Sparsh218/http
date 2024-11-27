import { HttpEvent, HttpEventType, HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";


export const loggingInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    console.log("just logging the api interceptor");
    return next(req).pipe(
        tap(event => {
            if (event.type === HttpEventType.Response) {
                console.log("respinse received");
            }
        })
    );
};