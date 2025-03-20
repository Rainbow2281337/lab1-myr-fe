import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post/post.service';
import { Post } from '../../services/interfaces/Post';
import { PostItemComponent } from './post-item/post-item.component';

@Component({
  selector: 'app-post-list',
  imports: [PostItemComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent implements OnInit {
  constructor(private readonly postSrv: PostService) {}

  postList!: Post[];

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.postSrv.getPostList().subscribe({
      next: (posts) => {
        this.postList = posts;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
