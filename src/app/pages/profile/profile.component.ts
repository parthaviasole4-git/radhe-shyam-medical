import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputText,
    InputTextarea,
    Button,
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
      line1: '',
      line2: '',
      landmark: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    }
  };

  saveProfile() {
    console.log('Profile Saved:', this.user);
  }
}
