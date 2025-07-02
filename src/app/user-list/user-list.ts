import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, RouterModule],
  providers: [UserService],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList implements OnInit {
  users: User[] = []

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers()
  }    

  getUsers() {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data
    })
  }

  deleteUser(id: any) {
    this.userService.deleteUser(id).subscribe(() => {
      this.getUsers //refresh list after deleting
    })
  }

  updateUser(id: any) {
    this.router.navigate([`/users/update/${id}`])
  }
}
