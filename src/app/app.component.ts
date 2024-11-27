import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './service/http.service';
import { Post } from './service/post';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Http Demo';
  posts: Post[] = [];

  constructor(private httpService: HttpService) {}

  onSubmit(form: NgForm) {
    this.httpService.addtoDb(
      form.controls['title'].value,
      form.controls['content'].value
    );
    form.reset();
    this.fetchPost();
  }

  fetchPost() {
    this.httpService.getPostsFromDb().subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deletePost() {
    this.httpService.deleteFromDb().subscribe({
      next: (data) => {
        console.log(data);
        this.fetchPost();
      }
    });
  }
}
