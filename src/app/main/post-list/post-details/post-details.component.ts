import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post/post.service';
import { CommentsService } from '../../../services/comments/comments.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../../services/interfaces/Post';
import { Comment } from '../../../services/interfaces/Comment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-details',
  imports: [FormsModule],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent implements OnInit {
  post!: Post;

  comments!: Comment[];

  newComment!: string;

  constructor(
    private readonly postSrv: PostService,
    private readonly commentSrv: CommentsService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const postId = this.activatedRoute.snapshot.paramMap.get('id');

    if (postId) {
      this.fetchPost(postId);
      this.fetchComments(postId);
    }
  }

  fetchPost(postId: string) {
    this.postSrv.getPostById(postId).subscribe({
      next: (response) => {
        this.post = response;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  fetchComments(postId: string) {
    this.commentSrv.getCommentByPostId(postId).subscribe({
      next: (response) => {
        this.comments = response;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  addNewComment(postId: string) {
    const userId = localStorage.getItem('id') ?? '';
    const content = this.newComment;

    this.commentSrv.createComment(postId, userId, content).subscribe({
      next: (response) => {
        this.comments.push(response);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
}
