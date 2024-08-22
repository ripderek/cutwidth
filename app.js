
const Factorial = require('./Factorial');
const TratamientoData = require('./TratamientoData');
const Permutaciones = require('./Permutaciones');
const CudWidth = require('./CudWidth');

/*
* Variables globales como por el numero de muestras y el tamaño de la poblacion
*
* */
const Numero_Muestras= 100;
const Numero_Poblacion = 3;

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
   // console.log("Adyacencias");
   // console.log(Matriz);
   // TratamientoData.EscribirArchivo("Adyacencias",NombreArchivo);
    //TratamientoData.EscribirArchivo(Matriz,NombreArchivo);
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
    //const Poblacion = Factorial.Calcular(Encabezado[1]);
   // console.log(`Poblacion: ${Poblacion}`);
    //TratamientoData.EscribirArchivo(`Poblacion: ${Poblacion}`,NombreArchivo);
    //generar el vector inicial de la combinacion
   // const PrimerCombinacion = Permutaciones.generarVector(Encabezado[0]);
   // const Combinaciones = Permutaciones.generarPermutaciones(PrimerCombinacion);
    let Maximo = 0;
    let Minimo = 0;
    let Min_Cud=0;
    let Min_Muesta=0;
    //recorrer el numero de muestras
    for (var i = 1; i <= Numero_Muestras; i++) {
        TratamientoData.EscribirArchivo(`-----------------------------------------------------------------------------------------------`,NombreArchivo);
        TratamientoData.EscribirArchivo(`Muestra: ${i}`, NombreArchivo);

        console.log(`Muestra numero: ${i}`);
        //Resetear el contador
        Maximo=0;
        Minimo=0;
        //generar la poblacion segun el numero de poblacion
        for (var j = 1; j <= Numero_Poblacion; j++) {
            TratamientoData.EscribirArchivo(`.....................................`,NombreArchivo);

            console.log(`Poblacion: ${j}`);
            //generar una combinacion de manera aleatoria
            let VectorCombinacion = Permutaciones.generarVectorAleatorio(Encabezado[0]);
            console.log(VectorCombinacion);
            TratamientoData.EscribirArchivo(`Población ${j}  : [ ${VectorCombinacion} ]`,NombreArchivo);
            //Ahora realizar el CudWIth con dicho vector generao skere modo diablo
            let CudWidthCaculado = CudWidth.calcularCutwidth(VectorCombinacion,Matriz,NombreArchivo);
            console.log(`Maximo CUdWidth calculado de la combinacion: ${CudWidthCaculado}`);
            TratamientoData.EscribirArchivo(`Maximo CUdWidth calculado de la combinacion: ${CudWidthCaculado}`,NombreArchivo);
            if(Minimo===0)
            {
                Minimo=CudWidthCaculado;
            }
            if(CudWidthCaculado<Minimo)
            {
                Minimo=CudWidthCaculado;
            }
            /*
            if (CudWidthCaculado>Maximo)
            {
                Maximo=CudWidthCaculado;
            }
             */
        }
        TratamientoData.EscribirArchivo(`- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -`,NombreArchivo);
        TratamientoData.EscribirArchivo(`Minimo encontrado en la muestra numero: ${i} es de: W=${Minimo}`,NombreArchivo);
        if(Min_Cud===0)
            Min_Cud=Minimo;
        if(Minimo<Min_Cud){
            Min_Cud=Minimo;
            Min_Muesta=i;
        }

    }
    TratamientoData.EscribirArchivo(`    `,NombreArchivo);
    TratamientoData.EscribirArchivo(`    `,NombreArchivo);

    TratamientoData.EscribirArchivo(`//////--------------[ R E S U L T A D O ]--------------\\\\\\`,NombreArchivo);
    TratamientoData.EscribirArchivo(`Minimo CudWidht encontrado es de : W=${Min_Cud} de la muestra numero: ${Min_Muesta}`,NombreArchivo);
    const endTime = performance.now(); // Detiene el temporizador
    const executionTime = (endTime - startTime) / 1000; // Tiempo en segundos
    console.log(`Tiempo de ejecución total: ${executionTime} segundos`);
    TratamientoData.EscribirArchivo(`Tiempo de ejecución total: ${executionTime} segundos`,NombreArchivo);


    /*
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
    */
}



//iniciar el script
Main();

