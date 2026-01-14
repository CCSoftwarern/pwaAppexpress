
export interface Entrega {
  id :number,
  id_pessoa: number,
  endereco_retirada:string,
  endereco_entrega:string,
  nome_cliente:string,
  vr_calculado :number,
  id_forma_pgto : number,
  descricao :string,
  dt_cadastro: Date,
  id_usuario:string,
  operador:string,
  status:string,
  motoboy_nome:string,
  id_motoqueiro:number,
  celular:string,
  endereco_cliente:string,
  motoboy_celular:string,
  foto:string

}

export interface EntregaInclusao {
  id_pessoa: number,
  endereco_retirada:string,
  endereco_entrega:string,
  vr_calculado :number,
  id_forma_pgto : number,
  descricao :string,
  dt_cadastro: Date,
  id_usuario:string,
  id_motoqueiro: number,
  status:string,
  
}

export interface EntregaUpdate {
  id :number,
  id_pessoa: number,
  endereco_retirada:string,
  endereco_entrega:string,
  vr_calculado :number,
  id_forma_pgto : number,
  descricao :string,
  dt_cadastro: Date,
  id_motoqueiro: number,
  status:string,
  id_usuario:string
}

export interface EntregaUpdateEnvio {
  id :number,
  id_motoqueiro: number,
  status:string
}

export interface EntregaFinish {
  id :number,
  status:string
}