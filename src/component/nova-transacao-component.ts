import { TipoTransacao } from "../entity/TipoTransacao.js";
import { Transacao } from "../entity/Transacao.js";
import SaldoComponent from "../component/saldo-component.js"
import Conta from "../entity/Conta.js"
import ExtratoComponent from "../component/extrato-component.js"


const elementoFormulario = document.querySelector(".block-nova-transacao form") as HTMLFormElement;

 elementoFormulario.addEventListener("submit", function(evento){
    evento.preventDefault();

    try {

        if(!elementoFormulario.checkValidity())
        {
            alert("Preencha os campos corretamentes");
            return;
        }
    
        const inputTipoTransacao = elementoFormulario.querySelector("#tipoTransacao") as HTMLSelectElement;
        const inputvalor = elementoFormulario.querySelector("#valor") as HTMLInputElement;
        const inputdata = elementoFormulario.querySelector("#data") as HTMLInputElement;
    
        let tipoTransacao: TipoTransacao = inputTipoTransacao.value as TipoTransacao;
        let valor: number = inputvalor.valueAsNumber;
        let data: Date = new Date(inputdata.value); 
      
    
        const NovaTransacao: Transacao = {
            tipoTransacao: tipoTransacao,
            valor: valor,
            data: data
        }
    
        Conta.registrarTransacao(NovaTransacao);
        SaldoComponent.atualizar();
        ExtratoComponent.atualizar();
        elementoFormulario.reset();
    }
    catch(erro) {
        alert(erro.message);
    }

 })
