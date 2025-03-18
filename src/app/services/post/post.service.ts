import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatePost, Post } from '../interfaces/Post';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly apiUrl = 'http://localhost:3000/posts';

  constructor(private readonly http: HttpClient) {}

  getPostList(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }

  createPost(postData: CreatePost): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, postData).pipe(
      catchError((error) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }
}
