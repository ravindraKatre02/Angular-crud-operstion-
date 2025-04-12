// src/app/user.service.ts
import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private storageKey = 'users';

  getUsers(): User[] {
    const users = localStorage.getItem(this.storageKey);
    return users ? JSON.parse(users) : [];
  }

  saveUsers(users: User[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  addUser(user: User): void {
    const users = this.getUsers();
    user.id = Date.now();
    users.push(user);
    this.saveUsers(users);
  }

  updateUser(updatedUser: User): void {
    let users = this.getUsers();
    users = users.map(u => (u.id === updatedUser.id ? updatedUser : u));
    this.saveUsers(users);
  }

  deleteUser(id: number): void {
    const users = this.getUsers().filter(u => u.id !== id);
    this.saveUsers(users);
  }
}
