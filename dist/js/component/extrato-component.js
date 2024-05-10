import Conta from "../entity/Conta.js";
import { FormatoData } from "../entity/FormatoData.js";
import { FormatarData, FormatarMoeda } from "../utils/formatadores.js";
const elementoRegistrosTransacaoExtrato = document.querySelector(".extrato .registro-transacoes");
renderizarExtrato();
function renderizarExtrato() {
    const grupoTransacoes = Conta.getGrupoTransacoes();
    elementoRegistrosTransacaoExtrato.innerHTML = "";
    let htmlGrupoTransacao = "";
    grupoTransacoes.forEach(grupoTransacao => {
        let htmlTransacaoItem = "";
        grupoTransacao.transacoes.forEach(transacao => {
            htmlTransacaoItem += MontarTransacaoItem(transacao);
        });
        htmlGrupoTransacao += MontarGrupoTransacao(grupoTransacao, htmlTransacaoItem);
    });
    if (htmlGrupoTransacao == "") {
        elementoRegistrosTransacaoExtrato.innerHTML = `
    <div class="transacoes-group">
        <strong class="mes-group">Não existe transações</strong>
    </div>
    `;
    }
    else {
        elementoRegistrosTransacaoExtrato.innerHTML = htmlGrupoTransacao;
    }
}
function MontarGrupoTransacao(grupoTransacao, itensGrupo) {
    return `
    <div class="transacoes-group">
        <strong class="mes-group">${grupoTransacao.label}</strong>
        ${itensGrupo}
    </div>
    `;
}
function MontarTransacaoItem(transacao) {
    return `
    <div class="transacao-item">
        <div class="transacao-info">
            <span class="tipo">${transacao.tipoTransacao}</span>
            <strong class="valor">${FormatarMoeda(transacao.valor)}</strong>
        </div>
        <time class="data">${FormatarData(transacao.data, FormatoData.DiaMes)}</time>
    </div>
    `;
}
const ExtratoComponent = {
    atualizar() {
        renderizarExtrato();
    }
};
export default ExtratoComponent;
