import { Component, inject, OnInit, ChangeDetectionStrategy, Inject, OnDestroy } from '@angular/core';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Entrega } from '../../model/entrega';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatDialog, MatDialogModule, MatDialogActions, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { trigger, transition, style, animate } from '@angular/animations';
import { NavbarComponent } from "../navbar/navbar.component";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [MatIconModule,
    MatButtonModule, MatTabsModule, MatToolbarModule, ToolbarComponent, MatListModule, MatFormFieldModule, MatInputModule, FormsModule, RouterModule, MatProgressSpinnerModule, DatePipe, MatDialogModule, MatIconModule, NavbarComponent, MatProgressBarModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss',
  animations: [
    trigger('fadeList', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(6px)' }),
        animate('250ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        )
      ]),
      transition(':leave', [
        animate('200ms ease-in',
          style({ opacity: 0, transform: 'translateY(6px)' })
        )
      ])
    ])
  ]
})
export class PrincipalComponent implements OnInit, OnDestroy {
  selectedTabIndex = 0;
  filtroEntrega: string = '';
  isloading: boolean = false;
  entregas: Entrega[] = [];
  errorMessage?: string = '';
  query: string = '';
  onlyActive: boolean = false;
  lastUpdated: Date = new Date();
  readonly dialog = inject(MatDialog);
  private intervalo: any;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    const motoboyData = Storage.prototype.getItem.call(localStorage, 'motoboy');

    if (motoboyData) {
      const motoboy = JSON.parse(motoboyData);
      this.onGetEntregas(motoboy.id);
      this.intervalo = setInterval(() => {
        this.onGetEntregas(motoboy.id);
        // this.lastUpdated = new Date();
      }, 15000);
    } else {
      this.router.navigate(['/login']);
    }
  }

  // Coloquei no componente navBar

  // goToTab(index: number) {
  //   this.selectedTabIndex = index;
  //   switch (index) {
  //     case 0 :
  //       this.router.navigate(['/login']);
  //       break;

  //     case 1:
  //       this.router.navigate(['/search']);
  //       break;

  //     case 2:
  //       this.router.navigate(['/login']);
  //       break;
  //   }

  // }

  // onGetEntregas(motoboyID: number) {
  //   this.isloading = true;

  //   this.apiService.getEntregas(motoboyID).subscribe({
  //     next: (result: Entrega[]) => {
  //       this.entregas = result;
  //       this.isloading = false;
  //      Storage.prototype.setItem.call(localStorage, 'entregas', JSON.stringify(this.entregas)); 
  //     },
  //     error: (error) => {
  //       this.errorMessage = 'Erro ao carregar os dados: ' + error.message;
  //       this.entregas = Storage.prototype.setItem.call(localStorage, 'entregas', JSON.stringify(this.entregas)); 
  //       this.isloading = false;
  //     },
  //   });
  // }

  // onGetEntregas(motoboyID: number) {
  //   this.isloading = true;

  //   this.apiService.getEntregas(motoboyID).subscribe({
  //     next: (result: Entrega[]) => {
  //       this.entregas = result;
  //       this.isloading = false;

  //       // salva no storage
  //       localStorage.setItem('entregas', JSON.stringify(this.entregas));
  //       localStorage.setItem('lastupdate', this.lastUpdated.toISOString());
  //       this.lastUpdated = new Date();
  //     },

  //     error: (error) => {
  //       this.errorMessage = 'Erro ao carregar os dados. Carregando dados locais.';

  //       // tenta recuperar do storage
  //       const entregasStorage = localStorage.getItem('entregas');
  //       const lastupdateStorage = localStorage.getItem('lastupdate');

  //       if (entregasStorage) {
  //         this.entregas = JSON.parse(entregasStorage);

  //         if (lastupdateStorage) {
  //           this.lastUpdated = new Date(lastupdateStorage);
  //         }
  //       } else {
  //         this.entregas = [];
  //       }

  //       this.isloading = false;
  //     },
  //   });
  // }

  onGetEntregas(motoboyID: number) {
  this.isloading = true;

  this.apiService.getEntregas(motoboyID).subscribe({
    next: (result: Entrega[]) => {
      this.entregas = result;
      this.errorMessage = '';
      localStorage.setItem('entregas', JSON.stringify(this.entregas));

      this.lastUpdated = new Date();
      localStorage.setItem('lastupdate', this.lastUpdated.toISOString());

      this.isloading = false;
    },

    error: (error: HttpErrorResponse) => {
      if (error.status === 0) {
        // 🔌 Sem internet
        this.errorMessage = 'Sem conexão com a internet.';
      } else {
        // ❌ Erro do backend
        this.errorMessage = `Sem conexão com a internet.`;
      }

      // tenta recuperar do storage
      const entregasStorage = localStorage.getItem('entregas');
      const lastupdateStorage = localStorage.getItem('lastupdate');

      if (entregasStorage) {
        this.entregas = JSON.parse(entregasStorage);

        if (lastupdateStorage) {
          this.lastUpdated = new Date(lastupdateStorage);
        }
      } else {
        this.entregas = [];
      }

      this.isloading = false;
    },
  });
}


  aplicaFiltro(entrega: any): boolean {
    const termo = this.filtroEntrega?.toLowerCase() || '';
    return (
      entrega.id.toString().includes(termo) ||
      entrega.destinatario?.toLowerCase().includes(termo)
    );
  }

  onLogout() {
    // Lógica de logout aqui
    Storage.prototype.removeItem.call(localStorage, 'motoboy');
    this.router.navigate(['/login']);
    console.log('Logout realizado');
  }


  openDialog(entrega: Entrega) {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {

      data: entrega
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog fechado', result);
    });
  }

  onDetalhes(entregaId: number) {
    const entrega = this.entregas.find(e => e.id === entregaId);
    if (entrega) {
      this.openDialog(entrega);
    }
  }

  ngOnDestroy() {
    clearInterval(this.intervalo); // Para o intervalo quando o componente for destruído
  }

  get filteredEntregas(): Entrega[] {
    if (!this.entregas) return [];
    return this.entregas.filter(e => {
      if (this.onlyActive) return false;
      if (this.query && this.query.trim() !== '') {
        const q = this.query.toLowerCase();
        return (
          e.nome_cliente.toLowerCase().includes(q) ||
          (e.endereco_entrega?.toLowerCase().includes(q)) ||
          (e.endereco_entrega?.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }



}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './dialog-content-example.html',
  imports: [MatDialogModule, MatButtonModule, DatePipe, CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './principal.component.scss',
})
export class DialogContentExampleDialog {
  entregas: Entrega[] = [];
  isloading: boolean = false;
  errorMessage: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public detalheEntrega: Entrega, private apiService: ApiService,
  ) { }

  onFinishEntrega(entregaid: number, anotacao: string) {
    this.apiService.updateEntregaStatus(entregaid, 'F', anotacao).subscribe({
      next: (result) => {
        console.log('Entrega finalizada com sucesso', result);
        const motoboyData = Storage.prototype.getItem.call(localStorage, 'motoboy');
        if (motoboyData) {
          const motoboy = JSON.parse(motoboyData);
          // this.onGetEntregas(motoboy.id);
        }
      },
      error: (error) => {
        console.error('Erro ao finalizar a entrega', error);
      },
    });
  }



}
