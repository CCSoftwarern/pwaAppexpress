import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIcon, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  selectedTabIndex = 0;

  constructor(private router: Router){}

  goToTab(index: number) {
    this.selectedTabIndex = index;
    switch (index) {
      case 0 :
        this.router.navigate(['/login']);
        break;

      case 1:
        this.router.navigate(['/search']);
        break;

      case 2:
        this.router.navigate(['/person']);
        break;
    }

  }


}
