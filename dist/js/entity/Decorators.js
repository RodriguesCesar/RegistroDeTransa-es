import Armazenador from "./Armazenador";
export function ValidaDebito(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (valorDoDebito) {
        if (valorDoDebito <= 0) {
            throw new Error("Valor não pode ser menor ou igual a zero");
        }
        if (valorDoDebito > Armazenador.obter("saldo")) {
            throw new Error("saldo insuficiente");
        }
        return originalMethod.apply(this, [valorDoDebito]);
    };
    return descriptor;
}
export function ValidaDeposito(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (valorDoDeposito) {
        if (valorDoDeposito <= 0) {
            throw new Error("Valor não pode ser menor ou igual a zero");
        }
        return originalMethod.apply(this, [valorDoDeposito]);
    };
    return descriptor;
}
