export interface Entrega {
    id: number,
    id_pessoa: number,
    nome_cliente: string,
    endereco_retirada: string,
    endereco_entrega: string,
    vr_calculado: number,
    id_forma_pgto: number,
    descricao: string,
    dt_cadastro:Date,
    operador: string,
    status: string,
    motoboy_nome: string,
    foto: string
}
