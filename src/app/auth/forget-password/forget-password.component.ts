import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../services/interfaces/UserRegData';

@Component({
  selector: 'app-forget-password',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent implements OnInit {
  forgetPasswordForm!: FormGroup;

  isUserExists: boolean = false;

  user!: User;

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.forgetPasswordForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      newPassword: new FormControl(null),
    });
  }

  checkIfUserExists(event: Event) {
    event.preventDefault();

    if (this.forgetPasswordForm.invalid) {
      return;
    }
    const email = this.forgetPasswordForm.get('email')?.value;

    this.userService.checkIfUserExists(email).subscribe({
      next: (response) => {
        this.user = response;
        this.isUserExists = true;
        this.forgetPasswordForm
          .get('newPassword')
          ?.setValidators([Validators.required, Validators.minLength(3)]);
        this.forgetPasswordForm.get('newPassword')?.updateValueAndValidity();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  changePassword(event: Event) {
    event.preventDefault();

    if (this.forgetPasswordForm.invalid) {
      return;
    }

    const newPassword = this.forgetPasswordForm.get('newPassword')?.value;

    this.userService
      .updateUser(this.user.id, { password: newPassword })
      .subscribe({
        next: () => {
          this.router.navigate(['/auth']);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
