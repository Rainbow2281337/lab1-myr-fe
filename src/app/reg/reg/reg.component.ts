import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-reg',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reg.component.html',
  styleUrl: './reg.component.css',
})
export class RegComponent implements OnInit {
  regForm!: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.regForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  registerUser(event: Event) {
    event.preventDefault();

    if (this.regForm.invalid) {
      return;
    }
    const userData = this.regForm.value;

    this.userService.regUser(userData).subscribe({
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
