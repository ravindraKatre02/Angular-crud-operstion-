import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  formData: User = { id: 0, name: '', email: '', role: '' };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }

  onSubmit(): void {
    if (this.formData.id) {
      this.userService.updateUser(this.formData);
    } else {
      this.userService.addUser(this.formData);
    }
    this.resetForm();
  }

  editUser(user: User): void {
    this.formData = { ...user };
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id);
    this.users = this.userService.getUsers();
  }

  resetForm(): void {
    this.formData = { id: 0, name: '', email: '', role: '' };
    this.users = this.userService.getUsers();
  }
}
