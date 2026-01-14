import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { MatDivider } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from "@angular/material/icon";
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [ToolbarComponent, NavbarComponent, MatDivider, MatListModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss'
})
export class PersonComponent implements OnInit {
  motoboyData : any;
  ngOnInit(): void {
     const data = localStorage.getItem('motoboy');
      this.motoboyData = data ? JSON.parse(data) : null;
  }

}
