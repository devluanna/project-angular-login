import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service';
import { LogoutService } from 'src/app/services/logout-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  userInitials: string = ''; 
  userRole: string = '';
  userStatus: string = '';

  isSubMenuOpen: boolean = false;

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

  toggleSettingsMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }

  logout(): void {
    this.logoutService.logout();
  }
}
