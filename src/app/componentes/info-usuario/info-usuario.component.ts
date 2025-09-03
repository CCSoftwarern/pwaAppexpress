import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-info-usuario',
  standalone: true,
  imports: [MatIcon, MatButtonModule],
  templateUrl: './info-usuario.component.html',
  styleUrl: './info-usuario.component.scss'
})
export class InfoUsuarioComponent {

  atualizarEntregas(){
    console.log("Atualizar entregas");
  }

}
