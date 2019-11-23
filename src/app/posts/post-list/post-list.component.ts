import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../posts.models';
import { PostsServiceService } from '../posts-service.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(
    private postsService: PostsServiceService
  ) { }

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
