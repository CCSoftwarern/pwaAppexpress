import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Entrega } from '../model/entrega';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
   private supabase = createClient(
    environment.supabase.supabaseUrl,
    environment.supabase.supabaseKey
  );

  constructor() { }

 getEntregas(motoboyID: number): Observable<Entrega[]> {
    // Usamos 'from' para converter a Promise em Observable
    return new Observable((observer) => {
      this.supabase
        .rpc('entregas_motoboy_hoje', { p_id_motoboy: motoboyID }) // Substitua 1 pelo ID do motoboy desejado
        .then(({ data, error }) => {
          if (error) {
            observer.error(error); // Em caso de erro, emitimos um erro
          } else {
            observer.next(data as Entrega[]); // Em caso de sucesso, emitimos os dados
            observer.complete(); // Finaliza a emissão dos dados
          }
        })
    });
  }

updateEntregaStatus(entregaID: number, status: string, anotacao:string): Observable<any> {
    return new Observable((observer) => {
      this.supabase
        .rpc('update_entrega_finish2', { entrega_id: entregaID, novo_status: status, nova_anotacao: anotacao })
        .then(({ data, error }) => {
          if (error) {
            observer.error(error);
          } else {
            observer.next(data);
            observer.complete();
          }
        });
    });
  }
}