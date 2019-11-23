import { Injectable } from '@angular/core';
import { Post } from './posts.models';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsServiceService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(
    private httpClient: HttpClient
  ) { }

  getPosts() {
    this.httpClient.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts').subscribe((postData) => {
      console.log(postData, 'resources');
      this.posts = postData.posts;
      this.postUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  addPost(post: Post) {
    this.httpClient.post<{message}>('http://localhost:3000/api/posts', post)
      .subscribe((res) => {
        console.log(res.message, 'response message');
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      })
  }
}
