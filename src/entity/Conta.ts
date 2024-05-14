import { Armazenador } from "./Armazenador.js";
import { ValidaDebito, ValidaDeposito } from "./Decorators.js";
import { GrupoTransacao } from "./GrupoTransacao.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

export class Conta {
protected nome: string;
protected saldo:number = Armazenador.obter<number>("saldo") || 0;
private transacoes: Transacao[]  = Armazenador.obter<Transacao[]>(("transacoes"), (key: string, value: string) => {

    if(key == "data") {
        return new Date(value);
    }
     return value;
    
    }) || [];

    constructor (nome: string)    {
        this.nome = nome;
    }

    getGrupoTransacoes(): GrupoTransacao[]{

        const grupoTransacao: GrupoTransacao[] = [];
    
        const ListaTransacao: Transacao[] = structuredClone(this.transacoes);
    
        const ListaTransacaoOrdenada: Transacao[] = ListaTransacao.sort((t1,t2)=>t2.data.getTime() - t1.data.getTime());
        let labelAtualGrupoTransacao: string = "";
    
        ListaTransacaoOrdenada.forEach(transacao => {
            let labelGrupoTransacao:string = transacao.data.toLocaleString("pt-br", { month:"long", year:"numeric"});
            if(labelAtualGrupoTransacao != labelGrupoTransacao) {
                
                labelAtualGrupoTransacao = labelGrupoTransacao;
                grupoTransacao.push({ 
                    label: labelAtualGrupoTransacao, 
                    transacoes:[]
                    
                })
            }
            grupoTransacao.at(-1).transacoes.push(transacao);
    
        });
        return grupoTransacao;
    }
    getSaldo():number {
        return this.saldo;
    }
    getDataAcesso():Date {

          return new Date();
    }
    setSaldo(novoSaldo: number):void
    {
       this.saldo = novoSaldo;

    }
    public getTitular(): string
    {
       return this.nome;
    }
    @ValidaDebito
    debitar(valor: number): void {

        this.saldo -=valor;
        Armazenador.Salvar("saldo", JSON.stringify(this.saldo));
    }
    @ValidaDeposito
    depositar(valor: number): void{
    
        if(valor <= 0) {
            throw new Error("Valor não pode ser menor ou igual a zero");
           
           }
        this.saldo +=valor;
        Armazenador.Salvar("saldo", JSON.stringify(this.saldo));
    }
    registrarTransacao(novaTransacao: Transacao): void {

        if(novaTransacao.tipoTransacao == TipoTransacao.Deposito)
        {
            this.depositar(novaTransacao.valor);
        }
        else if(novaTransacao.tipoTransacao == TipoTransacao.Transferencia || novaTransacao.tipoTransacao == TipoTransacao.PagamentoBoleto)
        {
            this.debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;
        }
        else
        {
            throw new Error("Operação invalida!");
        }

        novaTransacao.data + "00:00:00";
        const transacoes = this.transacoes;
        transacoes.push(novaTransacao);
        Armazenador.Salvar("transacoes", JSON.stringify(transacoes));
    
       
    }

}

export class ContaPremium  extends Conta {

    registrarTransacao(transacao: Transacao):void {

        if(transacao.tipoTransacao == TipoTransacao.Deposito) {

                console.log("Ganhou um bonus de 50 centavos")

                transacao.valor += 0.5;

            }
            super.registrarTransacao(transacao);
    }

    
    
}

const conta = new Conta("Cesar Rodrigues de Sousa");
const contaPremim = new ContaPremium("Thalita Rodrigues de Sousa");


export default conta;