import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { CardsComponent } from "../cards/cards.component";
import { ActivatedRoute } from '@angular/router';
import { DadosPessoaisComponent } from "../dados-pessoais/dados-pessoais.component";




@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [MatIconModule,
    MatButtonModule, MatTabsModule, MatToolbarModule, ToolbarComponent, MatListModule, MatFormFieldModule, FormsModule, CommonModule, CardsComponent, DadosPessoaisComponent], templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent implements OnInit {
  selectedTabIndex = 0;
  id!: string;

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
     this.id = this.route.snapshot.paramMap.get('id')!;
 
     
  }

  goToTab(index: number) {
    this.selectedTabIndex = index;
  }







}
