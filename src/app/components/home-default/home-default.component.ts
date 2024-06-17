import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AuthService } from 'src/app/services/auth-service';
import { LogoutService } from 'src/app/services/logout-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-home-default',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './home-default.component.html',
  styleUrl: './home-default.component.scss',
})
export class HomeDefaultComponent {
    userInitials: string = ''; // Variável para armazenar as iniciais do usuário

    constructor(
      private authService: AuthService,
      private logoutService: LogoutService,
      private userService: UserService
    ) { }
  
    ngOnInit(): void {
        const userId = sessionStorage.getItem('userId');
      
      if (userId) {
        this.userService.getUserInfo(userId).subscribe(
          (user) => {
            this.userInitials = `${user.first_name.charAt(0)} ${user.last_name.charAt(0)}`;
          },
          (error) => {
            console.error('Erro ao obter informações do usuário', error);
          }
        );
      } else {
        console.error('ID do usuário não encontrado na sessão');
      }
    }


  isSubMenuOpen: boolean = false;

  toggleSettingsMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }

  logout(): void {
    this.logoutService.logout();
  }
}
