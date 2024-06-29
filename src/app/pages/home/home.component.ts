import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderProfileComponent } from 'src/app/components/header-profile/header-profile.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { AuthService } from 'src/app/services/auth-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [CommonModule, SidebarComponent, NavbarComponent, HeaderProfileComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  userRole: string = '';  

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const userId = sessionStorage.getItem('userId');
  
    if (userId) {
      this.userService.getUserInfo(userId).subscribe(
        (user) => {
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


}