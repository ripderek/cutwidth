//se crea el objeto
const TratamientoData = require('./TratamientoData');

const CudWidth  = {};

function calcularCutwidth(vector, adyacencias, NombreArchivo) {
    //console.log(`Combinacion: ${vector}`)

    const n = vector.length;
    let maxCutwidth = 0;

    // Crear un mapa de índices para el vector
    const indices = {};
    for (let i = 0; i < n; i++) {
        indices[vector[i]] = i;
    }

    // cortes en posición en el vector
    for (let i = 0; i < n - 1; i++) {
        let cutwidth = 0;

        // numero de  aristas cruzan el corte en la posición i
        for (const [u, v] of adyacencias) {
            const posU = indices[u];
            const posV = indices[v];
            if ((posU <= i && posV > i) || (posV <= i && posU > i)) {
                cutwidth++;
            }
        }
        console.log(`Cutwidth Calculado: ${cutwidth}`)
        TratamientoData.EscribirArchivo(`Cutwidth Calculado: ${cutwidth} en el corte: ${i+1}`,NombreArchivo);
        //  máximo cutwidth encontrado
        if (cutwidth > maxCutwidth) {
            maxCutwidth = cutwidth;
        }
    }

    return maxCutwidth;
}

//exportar como objeto.
CudWidth.calcularCutwidth=calcularCutwidth;
//Factorial.substract= substract;


//exportar como objeto
module.exports = CudWidth;
