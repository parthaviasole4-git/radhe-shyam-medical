import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputText,
    Card
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {

  user = {
    name: '',
    email: '',
    phone: '',
    address: {
      house: '',
      area: '',
      city: '',
      zip: '',
      state: '',
      country: 'India'
    }
  };

  constructor() {
    const saved = localStorage.getItem('profile');
    if (saved) {
      this.user = JSON.parse(saved);
    }
  }

  saveProfile() {
    localStorage.setItem('profile', JSON.stringify(this.user));
    console.log('Profile Saved:', this.user);
  }
}
