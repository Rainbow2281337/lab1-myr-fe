import { Component, Input } from '@angular/core';
import { Post } from '../../../services/interfaces/Post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-item',
  imports: [],
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.css',
})
export class PostItemComponent {
  @Input() post: Post | undefined;

  constructor(private readonly router: Router) {}

  navigateToPostDetail(postId: string) {
    this.router.navigate([`/main/post/${postId}`]);
  }
}
