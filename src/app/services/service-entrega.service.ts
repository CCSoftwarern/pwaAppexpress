import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceEntregaService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabase.supabaseUrl,
      environment.supabase.supabaseKey
    );
  }

  // Método para buscar entregas do motoboy
  async buscarEntregasHojeDoMotoboy(idMotoboy: number): Promise<any[]> {
    const { data, error } = await this.supabase
      .rpc('entregas_motoboy_hoje', { p_id_motoboy: idMotoboy });

    if (error) {
      console.error('Erro ao buscar entregas:', error);
      throw error;
    }

    return data || [];
  }


}
