var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Armazenador } from "./Armazenador.js";
import { ValidaDebito, ValidaDeposito } from "./Decorators.js";
import { TipoTransacao } from "./TipoTransacao.js";
export class Conta {
    nome;
    saldo = Armazenador.obter("saldo") || 0;
    transacoes = Armazenador.obter(("transacoes"), (key, value) => {
        if (key == "data") {
            return new Date(value);
        }
        return value;
    }) || [];
    constructor(nome) {
        this.nome = nome;
    }
    getGrupoTransacoes() {
        const grupoTransacao = [];
        const ListaTransacao = structuredClone(this.transacoes);
        const ListaTransacaoOrdenada = ListaTransacao.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());
        let labelAtualGrupoTransacao = "";
        ListaTransacaoOrdenada.forEach(transacao => {
            let labelGrupoTransacao = transacao.data.toLocaleString("pt-br", { month: "long", year: "numeric" });
            if (labelAtualGrupoTransacao != labelGrupoTransacao) {
                labelAtualGrupoTransacao = labelGrupoTransacao;
                grupoTransacao.push({
                    label: labelAtualGrupoTransacao,
                    transacoes: []
                });
            }
            grupoTransacao.at(-1).transacoes.push(transacao);
        });
        return grupoTransacao;
    }
    getSaldo() {
        return this.saldo;
    }
    getDataAcesso() {
        return new Date();
    }
    setSaldo(novoSaldo) {
        this.saldo = novoSaldo;
    }
    getTitular() {
        return this.nome;
    }
    debitar(valor) {
        this.saldo -= valor;
        Armazenador.Salvar("saldo", JSON.stringify(this.saldo));
    }
    depositar(valor) {
        if (valor <= 0) {
            throw new Error("Valor não pode ser menor ou igual a zero");
        }
        this.saldo += valor;
        Armazenador.Salvar("saldo", JSON.stringify(this.saldo));
    }
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipoTransacao == TipoTransacao.Deposito) {
            this.depositar(novaTransacao.valor);
        }
        else if (novaTransacao.tipoTransacao == TipoTransacao.Transferencia || novaTransacao.tipoTransacao == TipoTransacao.PagamentoBoleto) {
            this.debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;
        }
        else {
            throw new Error("Operação invalida!");
        }
        novaTransacao.data + "00:00:00";
        const transacoes = this.transacoes;
        transacoes.push(novaTransacao);
        Armazenador.Salvar("transacoes", JSON.stringify(transacoes));
    }
}
__decorate([
    ValidaDebito
], Conta.prototype, "debitar", null);
__decorate([
    ValidaDeposito
], Conta.prototype, "depositar", null);
export class ContaPremium extends Conta {
    registrarTransacao(transacao) {
        if (transacao.tipoTransacao == TipoTransacao.Deposito) {
            console.log("Ganhou um bonus de 50 centavos");
            transacao.valor += 0.5;
        }
        super.registrarTransacao(transacao);
    }
}
const conta = new Conta("Cesar Rodrigues de Sousa");
const contaPremim = new ContaPremium("Thalita Rodrigues de Sousa");
export default conta;
