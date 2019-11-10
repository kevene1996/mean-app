import { Injectable } from '@angular/core';
import { Post } from './posts.models';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsServiceService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post>();

  constructor() { }

  getPosts() {
    return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  addPost(post: Post) {
    this.postUpdated.next(post);
  }
}
