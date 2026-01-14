import { Component } from '@angular/core';
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-search',
  imports: [ToolbarComponent, NavbarComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

}
