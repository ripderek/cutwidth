//se crea el objeto
const Permutaciones  = {};

function generarPermutaciones(arr) {
    const resultado = [];

    // Función recursiva para generar permutaciones
    function permutar(actual, resto) {
        if (resto.length === 0) {
            resultado.push(actual);
            return;
        }

        for (let i = 0; i < resto.length; i++) {
            const nuevoActual = [...actual, resto[i]];
            const nuevoResto = resto.slice(0, i).concat(resto.slice(i + 1));
            permutar(nuevoActual, nuevoResto);
        }
    }

    //  recursión
    permutar([], arr);

    return resultado;
}

function generarVector(n) {
    const vector = [];
    for (let i = 1; i <= n; i++) {
        vector.push(i);
    }
    return vector;
}
function generarVectorAleatorio(n) {
    // Crear un vector con los números del 1 al n
    const vector = Array.from({ length: n }, (_, i) => i + 1);

    for (let i = vector.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [vector[i], vector[j]] = [vector[j], vector[i]];
    }

    return vector;
}



//exportar como objeto.
Permutaciones.generarPermutaciones=generarPermutaciones;
Permutaciones.generarVector=generarVector;
// Mezclar el vector de manera aleatoria utilizando el algoritmo de Fisher-Yates
Permutaciones.generarVectorAleatorio=generarVectorAleatorio;
//Factorial.substract= substract;


//exportar como objeto
module.exports = Permutaciones;
