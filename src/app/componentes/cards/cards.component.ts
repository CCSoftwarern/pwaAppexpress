import { Component, Input, input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ServiceEntregaService } from '../../services/service-entrega.service';
import { Entrega } from '../../interfaces/entrega';
import {MatRippleModule} from '@angular/material/core';

import { ErrorComponent } from "../error/error.component";
import { LoadingComponent } from "../loading/loading.component";
import { InfoUsuarioComponent } from "../info-usuario/info-usuario.component";
import { ToolbarComponent } from "../toolbar/toolbar.component";



@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [MatIconModule, CommonModule, MatCardModule, MatButtonModule, MatRippleModule, ErrorComponent, LoadingComponent, InfoUsuarioComponent, ToolbarComponent],    
 
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit {
entregas: Entrega[] = [];
@Input() idMotoboy!: string; // o `!` indica que será definido depois
hasError: boolean = false;
isLoading: boolean = true;
motoboy: any = null;

constructor(private entregasService: ServiceEntregaService) {}
  ngOnInit(): void {
   this.getEntregasDoDia(Number(this.idMotoboy));
   const savedUser = localStorage.getItem('motoboy');
    if (savedUser) {
      this.motoboy = JSON.parse(savedUser);
    }
   this.carregarUsuario();
  }


getEntregasDoDia(motoboyId:number){
   this.isLoading = true;
    this.entregasService.buscarEntregasHojeDoMotoboy(motoboyId)
      .then(result => {
        this.entregas = result;
        this.isLoading = false;
      })
      .catch(err => {
        console.error('Erro ao carregar entregas', err);
         this.isLoading = false;
      });
}


getStatusInfo(status: string): { nome: string, classe: string, icone:string } {
  switch (status) {
    case 'P':
      return { nome: 'Pendente', classe: 'status-pendente', icone: 'access_time' };
    case 'F':
      return { nome: 'Entregue', classe: 'status-entregue' , icone: 'check_circle'};
    case 'C':
      return { nome: 'Cancelado', classe: 'status-cancelado' , icone: 'cancel'};
    default:
      return { nome: 'Desconhecido', classe: 'status-desconhecido' , icone: 'help'};
  }

  }

getPrimeiroESegundoNome(nome: string): string {
  if (!nome) return '';
  
  const partes = nome.trim().split(' ');
  return partes.slice(0, 2).join(' ');
}

//Cerregar entregas feito apos receber um push
carregarEntregas(){
  this.getEntregasDoDia(Number(this.idMotoboy));

}

executarAcao() {
    alert('Funciona filho')
    // ou qualquer lógica: exibir modal, carregar dados, etc.
  }

 
  carregarUsuario(){
    const motoboy = localStorage.getItem('motoboy');
      if (motoboy) {
        const dados = JSON.parse(motoboy);
        console.log('Usuário ainda logado:', dados);
      } else {
        console.log('Nenhum usuário logado');
      }
  }



}
