import { FormatarData,FormatarMoeda } from "../utils/formatadores.js";
import { FormatoData } from "../entity/FormatoData.js";
import Conta from "../entity/Conta.js";

const elementoSaldo =  document.querySelector(".saldo-valor .valor") as HTMLElement;
const elementoDataAcesso = document.querySelector(".block-saldo time") as HTMLElement;
renderizarSaldo();
 elementoDataAcesso.textContent = FormatarData(Conta.getDataAcesso(), FormatoData.SemanaDiaMesAno);

 function renderizarSaldo():void {

    elementoSaldo.textContent = FormatarMoeda(Conta.getSaldo());
 }

 const SaldoComponent = {
   atualizar() {

      renderizarSaldo()
   }

 }
 export default SaldoComponent;