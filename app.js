
const Factorial = require('./Factorial');
const TratamientoData = require('./TratamientoData');
const Permutaciones = require('./Permutaciones');
const CudWidth = require('./CudWidth');

const Main = () => {
    //iniciar un temporizador para medir el tiempo de ejecucion
    const startTime = performance.now();
    const NombreArchivo= TratamientoData.ObtenerFechaHoraActual();
    Data = TratamientoData.LeerArchivo();
    if (Data.trim() === "" )
        {
            console.log("Archivo Fuente Vacío");
            return  null;
        }
    //si no esta vacio entonces el archivo es valido
    console.log("El archivo no esta Vacío y se procede al tratamiento de los datos");
    //encabezado de la matris
    const Encabezado = TratamientoData.CrearEncabezado(Data);
    console.log("Encabezado");
    console.log(Encabezado);
    TratamientoData.EscribirArchivo("Encabezado",NombreArchivo);
    TratamientoData.EscribirArchivo(Encabezado,NombreArchivo);
    //Matriz sin encabezado
    const Matriz = TratamientoData.CrearMatrizFilas(Data);
    console.log("Adyacencias");
    console.log(Matriz);
    TratamientoData.EscribirArchivo("Adyacencias",NombreArchivo);
    TratamientoData.EscribirArchivo(Matriz,NombreArchivo);
    //Verificar que los dos primeros numeros sean iguales ya que corresponden al numero de vertices
    if (Encabezado[0]!==Encabezado[1])
    {
        console.log("El numero de vertices no coindice");
        return null;
    }
    if (Encabezado[2]===0){
        console.log("El numero de aristas es 0");
        return null;
    }
    //verificar que el numero de adyancencias sea igual al numero de aristas del encabezado
    if (Encabezado[2]!== Matriz.length)
    {
        console.log(`El numero de aristas ${Encabezado[2]} es diferente del numero de adyacencias de la matriz ${Matriz.length}`);
        return null;
    }
    //Calcular la poblacion mediante el factorial del numero de vertices
    const Poblacion = Factorial.Calcular(Encabezado[1]);
    console.log(`Poblacion: ${Poblacion}`);
    TratamientoData.EscribirArchivo(`Poblacion: ${Poblacion}`,NombreArchivo);
    //generar el vector inicial de la combinacion
    const PrimerCombinacion = Permutaciones.generarVector(Encabezado[0]);
    const Combinaciones = Permutaciones.generarPermutaciones(PrimerCombinacion);

    // console.log(`Combinaciones`)
    //console.log(Combinaciones);

    //recorrer todas las combinaciones para obtener el CudWidth
    //guardar el minimo cudWith de las combinaciones, la combinacion y el indice
    let MinCudWidth = 0;
    let CombinacionMinCudWidth = [];
    let IndiceMinimo=0;
    let indicador = false;
    Combinaciones.forEach((subArray, index) => {
        TratamientoData.EscribirArchivo(`-----------------------------------------------------------------------------------------------`,NombreArchivo);
        console.log(`Combinacion ${index + 1}:`, subArray);
        TratamientoData.EscribirArchivo(`Combinacion ${index + 1}: ${subArray}`,NombreArchivo);

        let CudWidthCaculado = CudWidth.calcularCutwidth(subArray,Matriz,NombreArchivo);
        console.log(`Maximo CUdWidth calculado de la combinacion: ${CudWidthCaculado}`);
        TratamientoData.EscribirArchivo(`Maximo CUdWidth calculado de la combinacion: ${CudWidthCaculado}`,NombreArchivo);

        //la primer vuelta obtiene el primer valor calculado para despues evaluarlo
        if (!indicador)
        {
            MinCudWidth=CudWidthCaculado;
            indicador= true;
            MinCudWidth=CudWidthCaculado;
            IndiceMinimo=index + 1;
            CombinacionMinCudWidth=subArray;
        }
        //aqui ir comparando el minimo y guardar la combinacion, el numero indice y el minCUdWith
        if (CudWidthCaculado<MinCudWidth)
        {
            MinCudWidth=CudWidthCaculado;
            IndiceMinimo=index + 1;
            CombinacionMinCudWidth=subArray;
        }
    });

    //resultado
    console.log(`////////////////////////////////////////////////////////////////////////////////////////`);
    console.log(`Minimo CudWith encontrado: ${MinCudWidth}`);
    console.log(`Indice: ${IndiceMinimo}, Combinacion: ${CombinacionMinCudWidth}`);
    TratamientoData.EscribirArchivo(`////////////////////////////////////////////////////////////////////////////////////////`,NombreArchivo);
    TratamientoData.EscribirArchivo(`Minimo CudWith encontrado: ${MinCudWidth}`,NombreArchivo);
    TratamientoData.EscribirArchivo(`Numero Combinacion: ${IndiceMinimo}, Combinacion: ${CombinacionMinCudWidth}`,NombreArchivo);

    const endTime = performance.now(); // Detiene el temporizador
    const executionTime = (endTime - startTime) / 1000; // Tiempo en segundos
    console.log(`Tiempo de ejecución total: ${executionTime} segundos`);
    TratamientoData.EscribirArchivo(`Tiempo de ejecución total: ${executionTime} segundos`,NombreArchivo);

}



//iniciar el script
Main();

