//se crea el objeto
const Factorial  = {};

function Calcular(numero){
    // Verificar si el número es negativo, cero o uno
    if (numero < 0) {
        return "No existe factorial para números negativos";
    } else if (numero === 0 || numero === 1) {
        return 1;
    } else {
        // Calcular el factorial
        let resultado = 1;
        for (let i = 2; i <= numero; i++) {
            resultado *= i;
        }
        return resultado;
    }
}

//exportar como objeto.
Factorial.Calcular=Calcular;
//Factorial.substract= substract;


//exportar como objeto
module.exports = Factorial;
