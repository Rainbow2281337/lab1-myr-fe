import { Component, OnInit } from '@angular/core';
import { PostListComponent } from '../post-list/post-list.component';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { User } from '../../services/interfaces/UserRegData';
import { PostService } from '../../services/post/post.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [PostListComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  isProfileButtonClicked: boolean = false;

  isAddNewPostButtonClicked: boolean = false;

  user!: User;

  newPostForm!: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly userSrv: UserService,
    private readonly postSrv: PostService
  ) {}

  ngOnInit(): void {
    if (!this.checkIfUserLoggedIn()) {
      this.router.navigate(['/auth']);
    }

    this.newPostForm = new FormGroup({
      header: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      content: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  checkIfUserLoggedIn(): boolean {
    const id = localStorage.getItem('id');

    return !!id;
  }

  openProfile() {
    this.isProfileButtonClicked = !this.isProfileButtonClicked;
    this.fetchUserProfileData();
  }

  fetchUserProfileData() {
    const id = localStorage.getItem('id') ?? '';
    this.userSrv.getUserData(id).subscribe({
      next: (respone) => {
        this.user = respone;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  openAddNewPost() {
    this.isAddNewPostButtonClicked = !this.isAddNewPostButtonClicked;
  }

  createNewPost(event: Event) {
    event.preventDefault();

    if (this.newPostForm.invalid) {
      return;
    }
    const newPostData = this.newPostForm.value;

    this.postSrv.createPost(newPostData).subscribe({
      next: (response) => {
        if (response) {
          this.isAddNewPostButtonClicked = false;
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
