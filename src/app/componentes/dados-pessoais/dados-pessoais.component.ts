import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dados-pessoais',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './dados-pessoais.component.html',
  styleUrl: './dados-pessoais.component.scss'
})
export class DadosPessoaisComponent implements OnInit {
  motoboy: any = null;
  ngOnInit(): void {
     const savedUser = localStorage.getItem('motoboy');
    if (savedUser) {
      this.motoboy = JSON.parse(savedUser);
    }
  }

}
