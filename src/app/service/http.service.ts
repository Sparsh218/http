import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { Post } from "./post";

@Injectable({
    providedIn : 'root'
})
export class HttpService {

    constructor(private httpClient: HttpClient) {}
    postsList:{title: string, content:string}[] = null;

    private url: string = "https://angular-backend-4200-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json";

    addtoDb(title: string, content:string) {

        this.httpClient.post(this.url, {
            'title' : title,
            'content': content
        }).subscribe({
            next: data => {
                console.log(data);
            }, 
            error: error => {
                console.log("error in post");
                console.log(error);
            }
        });
    }

    getPostsFromDb() {
        return this.httpClient.get(this.url,
            {
                responseType : 'json',
                observe: 'response'
            }
        ).pipe(
            map(data => {
                console.log(data.body);
                const arr:Post[] = [];
                for (const entry in data.body) {
                    if (data.body.hasOwnProperty(entry)) {
                        arr.push({ ...data.body[entry], id: entry});
                    }
                }
                return arr;
            }),
            catchError(error => {
                return throwError(() => error);
            })
        );
    }

    deleteFromDb() {
        return this.httpClient.delete(this.url);
    }
}