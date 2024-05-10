import { FormatarData, FormatarMoeda } from "../utils/formatadores.js";
import { FormatoData } from "../entity/FormatoData.js";
import Conta from "../entity/Conta.js";
const elementoSaldo = document.querySelector(".saldo-valor .valor");
const elementoDataAcesso = document.querySelector(".block-saldo time");
renderizarSaldo();
elementoDataAcesso.textContent = FormatarData(Conta.getDataAcesso(), FormatoData.SemanaDiaMesAno);
function renderizarSaldo() {
    elementoSaldo.textContent = FormatarMoeda(Conta.getSaldo());
}
const SaldoComponent = {
    atualizar() {
        renderizarSaldo();
    }
};
export default SaldoComponent;
