import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from '../posts.models';
import { NgForm } from '@angular/forms';
import { PostsServiceService } from '../posts-service.service'

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  public inputContent = '';
  public inputTitle = '';

  constructor(private postService: PostsServiceService) { }

  ngOnInit() {
  }

  onAddPosts(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const post: Post = {
      title: form.value.title,
      content: form.value.content,
    };
    form.resetForm();
    this.postService.addPost(post);
  }

}
