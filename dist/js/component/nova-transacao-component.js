import SaldoComponent from "../component/saldo-component.js";
import Conta from "../entity/Conta.js";
import ExtratoComponent from "../component/extrato-component.js";
const elementoFormulario = document.querySelector(".block-nova-transacao form");
elementoFormulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    try {
        if (!elementoFormulario.checkValidity()) {
            alert("Preencha os campos corretamentes");
            return;
        }
        const inputTipoTransacao = elementoFormulario.querySelector("#tipoTransacao");
        const inputvalor = elementoFormulario.querySelector("#valor");
        const inputdata = elementoFormulario.querySelector("#data");
        let tipoTransacao = inputTipoTransacao.value;
        let valor = inputvalor.valueAsNumber;
        let data = new Date(inputdata.value);
        const NovaTransacao = {
            tipoTransacao: tipoTransacao,
            valor: valor,
            data: data
        };
        Conta.registrarTransacao(NovaTransacao);
        SaldoComponent.atualizar();
        ExtratoComponent.atualizar();
        elementoFormulario.reset();
    }
    catch (erro) {
        alert(erro.message);
    }
});
