import { Component } from '@angular/core';

import { navAdmin } from './navAdmin';
import { navItems } from './_nav';
import { navDoc} from './navDoc'
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {

  public navItems = navAdmin;
  user = JSON.parse(localStorage.getItem('currentUser') || '{}');

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(private router: Router) {
    if(this.user.Role ==='Admin'){
      this.navItems = navAdmin;
    }
    else if(this.user.Role === 'Patient'){
      this.navItems = navItems;
    }
    else if(this.user.Role === 'Doctor'){
      this.navItems = navDoc
    }
    else{
      this.router.navigate(['/login']);
    }
    console.log(this.user.Role);
  }
}
