const fs = require('fs');
//se crea el objeto
const TratamientoData  = {};

//Leer el archivo completamente
function LeerArchivo () {
    try {
        const data = fs.readFileSync('Fuente.txt', 'utf8');
        //console.log(data);
        return data;
    } catch (err) {
        console.error(err);
    }
}
//funcionpara convertir la primera fila en una matriz (Encabezado)
function CrearEncabezado (contenido) {
    // Separar el contenido en líneas
    const lineas = contenido.trim().split(/\r?\n/);

    // Procesar la primera línea
    if (lineas.length > 0) {
        // Remover espacios adicionales y separar los números
        const numeros = lineas[0].trim().split(/\s+/).map(Number);
        return numeros; // Retornar el vector con los números del encabezado
    }
    return []; // Retornar un vector vacío si no hay líneas
}
//funcion para convertir la data del archivo en una matriz (FILAS)
function CrearMatrizFilas (contenido) {
    // Separar el contenido en líneas
    const lineas = contenido.trim().split(/\r?\n/);
    // Inicializar la matriz
    const matriz = [];
    // Procesar cada línea
    lineas.forEach((linea, index) => {
        // Remover espacios adicionales y separar los números
        const numeros = linea.trim().split(/\s+/).map(Number);

        if (index !== 0)
            //Guarda la lineas en una matriz de 2 x 2 sin el encabezado
            matriz.push(numeros);
    });
    return matriz;
}

function EscribirArchivo  (textoenviado,NombreArchivo) {
    const texto = textoenviado + '\n';  // Agregar un salto de línea al final
   // let NombreArchivo = obtenerFechaHoraActual();
    // Usar `fs.appendFile` para agregar el texto al archivo sin reemplazar el contenido existente
    fs.appendFileSync(NombreArchivo, texto, (err) => {
        if (err) {
            console.error('Error al guardar en el archivo:', err);
        }
    });
};
function ObtenerFechaHoraActual ()  {
    const ahora = new Date();

    const dia = String(ahora.getDate()).padStart(2, '0');
    const mes = String(ahora.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const año = ahora.getFullYear();

    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    const segundos = String(ahora.getSeconds()).padStart(2, '0');

    return `Resultados/${dia}${mes}${año}${horas}${minutos}${segundos}.txt`;
};
//exportar como objeto.
TratamientoData.LeerArchivo=LeerArchivo;
TratamientoData.CrearEncabezado=CrearEncabezado;
TratamientoData.CrearMatrizFilas=CrearMatrizFilas;
TratamientoData.EscribirArchivo = EscribirArchivo;
TratamientoData.ObtenerFechaHoraActual=ObtenerFechaHoraActual;
//Factorial.substract= substract;


//exportar como objeto
module.exports = TratamientoData;
