import {Transacao} from "./Transacao.js";
import {TipoTransacao} from "./TipoTransacao.js";
import {GrupoTransacao} from "./GrupoTransacao.js";


let saldo: number = JSON.parse(localStorage.getItem("saldo")) || 0;

function getTransacoes():Transacao[]{

    const transacoesRealizadas: Transacao[] = JSON.parse(localStorage.getItem("transacoes"), (key: string, value: string) => {

        if(key == "data") {
            return new Date(value);
        }
         return value;
        
        }) || [];

        return transacoesRealizadas;
}

function debitar(valor: number): void{

    if(valor <= 0) {
     throw new Error("Valor não pode ser menor ou igual a zero");
    
    }
    if(valor > saldo)
    {
        throw new Error("saldo insuficiente");
    }
    saldo -=valor;
    localStorage.setItem("saldo", JSON.stringify(saldo));
}
function depositar(valor: number): void{

    if(valor <= 0) {
        throw new Error("Valor não pode ser menor ou igual a zero");
       
       }
    saldo +=valor;
    localStorage.setItem("saldo", JSON.stringify(saldo));
}



const Conta = {

    getSaldo():number
    {
        return saldo;

    },
 
    setSaldo(novoSaldo: number):void
    {
       saldo = novoSaldo;

    },
    getDataAcesso(): Date{
    return new Date();

    },
    getGrupoTransacoes(): GrupoTransacao[]{

        const grupoTransacao: GrupoTransacao[] = [];
    
        const ListaTransacao: Transacao[] = structuredClone(getTransacoes());
    
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
    },
    registrarTransacao(novaTransacao: Transacao): void {

        if(novaTransacao.tipoTransacao == TipoTransacao.Deposito)
        {
            depositar(novaTransacao.valor);
        }
        else if(novaTransacao.tipoTransacao == TipoTransacao.Transferencia || novaTransacao.tipoTransacao == TipoTransacao.PagamentoBoleto)
        {
            debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;
        }
        else
        {
            throw new Error("Operação invalida!");
        }

        novaTransacao.data + "00:00:00";
        const transacoes = getTransacoes();
        transacoes.push(novaTransacao);
        localStorage.setItem("transacoes", JSON.stringify(transacoes));
    
       
    }
}

export default Conta;