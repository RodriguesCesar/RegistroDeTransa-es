import { TipoTransacao } from "./TipoTransacao.js";
let saldo = JSON.parse(localStorage.getItem("saldo")) || 0;
function getTransacoes() {
    const transacoesRealizadas = JSON.parse(localStorage.getItem("transacoes"), (key, value) => {
        if (key == "data") {
            return new Date(value);
        }
        return value;
    }) || [];
    return transacoesRealizadas;
}
function debitar(valor) {
    if (valor <= 0) {
        throw new Error("Valor não pode ser menor ou igual a zero");
    }
    if (valor > saldo) {
        throw new Error("saldo insuficiente");
    }
    saldo -= valor;
    localStorage.setItem("saldo", JSON.stringify(saldo));
}
function depositar(valor) {
    if (valor <= 0) {
        throw new Error("Valor não pode ser menor ou igual a zero");
    }
    saldo += valor;
    localStorage.setItem("saldo", JSON.stringify(saldo));
}
const Conta = {
    getSaldo() {
        return saldo;
    },
    setSaldo(novoSaldo) {
        saldo = novoSaldo;
    },
    getDataAcesso() {
        return new Date();
    },
    getGrupoTransacoes() {
        const grupoTransacao = [];
        const ListaTransacao = structuredClone(getTransacoes());
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
    },
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipoTransacao == TipoTransacao.Deposito) {
            depositar(novaTransacao.valor);
        }
        else if (novaTransacao.tipoTransacao == TipoTransacao.Transferencia || novaTransacao.tipoTransacao == TipoTransacao.PagamentoBoleto) {
            debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;
        }
        else {
            throw new Error("Operação invalida!");
        }
        novaTransacao.data + "00:00:00";
        const transacoes = getTransacoes();
        transacoes.push(novaTransacao);
        localStorage.setItem("transacoes", JSON.stringify(transacoes));
    }
};
export default Conta;
