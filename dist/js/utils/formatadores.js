import { FormatoData } from "../entity/FormatoData.js";
export function FormatarMoeda(valor) {
    return valor.toLocaleString("pt-br", { currency: "BRL", style: "currency" });
}
export function FormatarData(data, formatoData = FormatoData.DiaMesAno) {
    if (formatoData == FormatoData.SemanaDiaMesAno) {
        return data.toLocaleString("pt-br", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    }
    else if (formatoData == FormatoData.DiaMes) {
        return data.toLocaleString("pt-br", {
            day: "2-digit",
            month: "2-digit",
        });
    }
    return data.toLocaleString("pt-br", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}
