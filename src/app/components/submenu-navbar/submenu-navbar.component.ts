import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-submenu-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './submenu-navbar.component.html',
  styleUrl: './submenu-navbar.component.scss'
})
export class SubmenuNavbarComponent {

  userStatus: string = '';
  isSubMenuOpen: boolean = false;
  userRole: string = '';

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userId = sessionStorage.getItem('userId');

    if (userId) {
      this.userService.getUserInfo(userId).subscribe(
        (user) => {
          this.userStatus =  `${user.status}`;
          this.userRole =  `${user.role}`;
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


}
