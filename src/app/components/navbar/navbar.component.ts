import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service';
import { LogoutService } from 'src/app/services/logout-service';
import { UserService } from 'src/app/services/user-service';
import { NotificationNavbarComponent } from '../notification-navbar/notification-navbar.component';
import { SubmenuNavbarComponent } from '../submenu-navbar/submenu-navbar.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NotificationNavbarComponent, SubmenuNavbarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  userInitials: string = ''; 
  userRole: string = '';
  userStatus: string = '';
  userSubStatus: string = '';

  isSubMenuOpen: boolean = true;

  isNotificationOpen: boolean = false;

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
          this.userSubStatus =  `${user.subStatus}`;
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

  toggleNotification() {
    this.isNotificationOpen = !this.isNotificationOpen;
  }


  logout(): void {
    this.logoutService.logout();
  }
}
