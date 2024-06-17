import { Component, OnInit } from '@angular/core';
import { HomeDefaultComponent } from 'src/app/components/home-default/home-default.component';
import { AuthService } from 'src/app/services/auth-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [HomeDefaultComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  userFullName: string = '';

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userId = sessionStorage.getItem('userId');

    if (userId) {
      this.userService.getUserInfo(userId).subscribe(
        (user) => {
          this.userFullName = `${user.first_name} ${user.last_name}`;
          console.log("NOME", this.userFullName)
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