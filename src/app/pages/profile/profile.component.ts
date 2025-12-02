import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Card } from 'primeng/card';
import { InputText } from 'primeng/inputtext';
import { UserService } from '../../core/services/user.service';
import { getUserIdFromToken } from '../../helper/jwt.helper';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Card, InputText],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  profileForm!: FormGroup;
  loading = false;
  userId = getUserIdFromToken();

  constructor(private readonly fb: FormBuilder, private readonly userService: UserService, private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadUser();
  }

  buildForm() {
    this.profileForm = this.fb.group({
      displayName: ['', Validators.required],
      phone: ['', [Validators.required]],
      email: [''],
      address: this.fb.group({
        house: ['', Validators.required],
        area: ['', Validators.required],
        city: ['', Validators.required],
        pincode: ['', [Validators.required, Validators.maxLength(6)]],
        state: ['', Validators.required],
      })
    });
  }

  loadUser() {
    this.userService.getById(this.userId).subscribe(res => {
      if (!res) return;

      this.profileForm.patchValue({
        displayName: res?.displayName,
        phone: res?.identifier,
        address: {
          house: res.address?.house || '',
          area: res.address?.area || '',
          city: res.address?.city || '',
          pincode: res.address?.pincode || '',
          state: res.address?.state || ''
        }
      });
    });
  }

  saveProfile() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.userService.completeProfile(this.userId, this.profileForm.value).subscribe({
      next: () => {
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  get f() {
    return this.profileForm.controls;
  }
  
  get addr() {
    return (this.profileForm.get('address') as FormGroup).controls;
  }
}
