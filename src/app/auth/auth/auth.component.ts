import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  authForm!: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  loginUser(event: Event) {
    event.preventDefault();

    if (this.authForm.invalid) {
      return;
    }
    const userData = this.authForm.value;

    this.userService.logInUser(userData).subscribe({
      next: (response) => {
        if (response) {
          this.router.navigate(['/main']);
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
