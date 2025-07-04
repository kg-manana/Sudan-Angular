import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-update',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './user-update.html',
  styleUrl: './user-update.css',
  providers:[UserService]
})
export class UserUpdate {
userForm: FormGroup;

  userId!: number;

  constructor(

    private fb: FormBuilder,

    private userService: UserService,

    private route: ActivatedRoute,

    private router: Router

  ) {

    this.userForm = this.fb.group({

      first_name: ['', Validators.required],

      last_name: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],

      password: ['', Validators.required],

      image: [null]

    });

  }

    ngOnInit(): void {

    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.userId) {

      this.userService.getUserById(this.userId).subscribe(user => {

        this.userForm.patchValue({

          first_name: user.first_name,

          last_name: user.last_name,

          email: user.email,

          password: user.password

        });

      });

    }

  }

  // onFileSelected(event: any): void {

  //   const file = event.target.files[0];

  //   if (file) {

  //     this.userForm.patchValue({ image: file });

  //     this.userForm.get('image')!.updateValueAndValidity();

  //   }

  // }

  updateUser(): void {

    if (this.userForm.invalid) return;

    const formData = new FormData();

    formData.append('first_name', this.userForm.get('first_name')!.value);

    formData.append('last_name', this.userForm.get('last_name')!.value);

    formData.append('email', this.userForm.get('email')!.value);

    formData.append('password', this.userForm.get('password')!.value);

    const imageFile = this.userForm.get('image')!.value;

    if (imageFile) {

      formData.append('image', imageFile, imageFile.name);

    }

    this.userService.updateUser(this.userId, formData).subscribe(() => {

      this.router.navigate(['/users']);

    });

  }
}
