import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [MatIconModule,
    MatButtonModule, MatTabsModule, MatToolbarModule, ToolbarComponent,  MatListModule,  MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent {
   selectedTabIndex = 0;
    filtroEntrega: string = '';

  goToTab(index: number) {
    this.selectedTabIndex = index;
  }

  entregas = [
    { id: 1, destinatario: 'João Silva', status: 'Entregue', data: '10/05/2025' },
    { id: 2, destinatario: 'Maria Souza', status: 'Em trânsito', data: '11/05/2025' },
    { id: 3, destinatario: 'Carlos Lima', status: 'Pendente', data: '12/05/2025' },
    { id: 3, destinatario: 'Carlos Lima', status: 'Pendente', data: '12/05/2025' },
    { id: 3, destinatario: 'Carlos Lima', status: 'Pendente', data: '12/05/2025' },
    { id: 3, destinatario: 'Carlos Lima', status: 'Pendente', data: '12/05/2025' },
    { id: 3, destinatario: 'Carlos Lima', status: 'Pendente', data: '12/05/2025' },
    { id: 3, destinatario: 'Carlos Lima', status: 'Pendente', data: '12/05/2025' },
    { id: 3, destinatario: 'Carlos Lima', status: 'Pendente', data: '12/05/2025' },
     { id: 3, destinatario: 'Carlos Lima', status: 'Pendente', data: '12/05/2025' },
  ];

abrirModal() {
    // Lógica para abrir o modal
    console.log('Abrindo modal...');
  }

 

aplicaFiltro(entrega: any): boolean {
  const termo = this.filtroEntrega?.toLowerCase() || '';
  return (
    entrega.id.toString().includes(termo) ||
    entrega.destinatario?.toLowerCase().includes(termo)
  );
}

}
