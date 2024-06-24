import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AuthService } from 'src/app/services/auth-service';
import { LogoutService } from 'src/app/services/logout-service';
import { UserService } from 'src/app/services/user-service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home-default',
  standalone: true,
  imports: [CommonModule, SidebarComponent, NavbarComponent],
  templateUrl: './home-default.component.html',
  styleUrls: ['./home-default.component.scss'], // Corrigido aqui
})
export class HomeDefaultComponent {
  userInitials: string = ''; 
  userFullName: string = '';
  userEmail: string = '';
  userRole: string = '';
  userStatus: string = '';


  constructor(
    private logoutService: LogoutService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const userId = sessionStorage.getItem('userId');
  
    if (userId) {
      this.userService.getUserInfo(userId).subscribe(
        (user) => {
          this.userInitials = `${user.first_name.charAt(0)} ${user.last_name.charAt(0)}`;
          this.userFullName = `${user.first_name} ${user.last_name}`;
          this.userEmail =  `${user.email}`;
          this.userRole =  `${user.role}`;
          this.userStatus =  `${user.status}`;
        },
        (error) => {
          console.error('Erro ao obter informações do usuário', error);
        }
      );
    } else {
      console.error('ID do usuário não encontrado na sessão');
    }
  }

  logout(): void {
    this.logoutService.logout();
  }
}
