import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user-service';
import * as moment from 'moment';

@Component({
  selector: 'app-notification-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-navbar.component.html',
  styleUrl: './notification-navbar.component.scss',
})
export class NotificationNavbarComponent {
  userSubStatus: string = '';
  datePasswordExpire: string = '';
  notificationMessage: string = '';
  daysUntilPasswordExpires: number | null = null;
  notificationClass: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userId = sessionStorage.getItem('userId');

    if (userId) {
      this.userService.getUserInfo(userId).subscribe(
        (user) => {
          this.userSubStatus = user.subStatus;
          this.daysUntilPasswordExpires = moment(
            user.passwordExpirationDays
          ).diff(moment(), 'days');

          this.setNotificationMessageAndClass();
        },
        (error) => {
          console.error('Erro ao obter informações do usuário', error);
        }
      );
    } else {
      console.error('ID do usuário não encontrado na sessão');
    }
  }

  private setNotificationMessageAndClass(): void {
    switch (this.userSubStatus) {
      case 'ON_ALERT':
        this.notificationMessage = `ON ALERT! Your password is about to expire, ${this.daysUntilPasswordExpires} days left. Please change your password manually to avoid being blocked.`;
        this.notificationClass = 'alert-red';
        break;
      case 'IN_NON_COMPLIANCE':
        this.notificationMessage = `We verified that your password was reset via the system, on the date: ${this.daysUntilPasswordExpires}. However, you haven't changed your password manually yet, after 7 calendar days your account will be blocked.`;
        this.notificationClass = 'alert-orange';
        break;
      default:
        this.notificationMessage = 'You have no notifications.';
        this.notificationClass = '';
        break;
    }
  }
}
