import { Component, Input } from '@angular/core';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {
  @Input() sidebarId: string = 'sidebar';

  public newMessages = new Array(4);
  public newTasks = new Array(5);
  public newNotifications = new Array(5);

  constructor(private classToggler: ClassToggleService, private router: Router) {
    super();
  }
  profilepage(){
    this.router.navigate(['/dashboard/view_patients/profile']);
  }

  onLogout() {
    
    // console.log(localStorage.getItem('currentUser'));
    localStorage.removeItem('currentUser');
    localStorage.clear();
      this.router.navigate(['/login']);
  }
}
