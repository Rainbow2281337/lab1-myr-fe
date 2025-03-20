import { Component, OnInit } from '@angular/core';
import { PostListComponent } from '../post-list/post-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [PostListComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    if (!this.checkIfUserLoggedIn()) {
      this.router.navigate(['/auth']);
    }
  }

  checkIfUserLoggedIn(): boolean {
    const id = localStorage.getItem('id');

    return !!id;
  }
}
