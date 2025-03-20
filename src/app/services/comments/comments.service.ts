import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Comment } from '../interfaces/Comment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private readonly apiUrl = 'http://localhost:3000/comment';

  constructor(private readonly http: HttpClient) {}

  getCommentByPostId(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/${postId}`).pipe(
      catchError((error) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }

  createComment(
    postId: string,
    userId: string,
    content: string
  ): Observable<Comment> {
    const commentData = {
      userId,
      postId,
      content,
    };

    return this.http.post<Comment>(`${this.apiUrl}`, commentData).pipe(
      catchError((error) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }
}
