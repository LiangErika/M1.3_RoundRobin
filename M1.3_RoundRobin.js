//Obtener el número de proceso que se desea incluir
console.log("Insertar el número de proceso a simular:");
prompt("Insertar el número de proceso a simular:");
var proc="";
for(let i=2;i<process.argv.length;i++){
    proc+=process.argv[i];
}

//Función para generar número aleatorio con un rango
function generarNumeroAleatorio(min,max){
	return Math.floor(Math.random()*(max-min+1))+min;
}

//Función que crea un nuevo proceso
function crearNuevoProceso(numP,cod){
	const proceso={
	    numProceso: numP,
	    codigo: cod
	};
	return proceso;
}

//Lineas de códigos predefinidos
const codigoPredefinido=["a=1+2","b=3+4","c=5+6","console.log(a)","console.log(b)","console.log(c)","console.log(tyeof a)","console.log(typeof c)"];

//Devolver la linea de código de un proceso
function elegirLineaDeCodigo(proceso,linea){
	return proceso.codigo[linea];
}

//Iniciarlizar los procesos antes de empezar la simulación
function inicializarSimulacion(proc){
	//Crear los procesos con sus lineas de código
	codigoPredefinido.sort();
	const procesos=new Array(); //Arreglo de objeto procesos
	for(let i=0;i<proc;i++){
		const lineasCodigo=new Array();//Crear un arreglo de lineas de código para cada proceso
		var ale=generarNumeroAleatorio(1,codigoPredefinido.length);
		for(let j=0;j<ale;j++){
		    var al=generarNumeroAleatorio(0,codigoPredefinido.length-1);
			lineasCodigo.push(codigoPredefinido[al]);
		}
		var p=crearNuevoProceso(i+1,lineasCodigo);
		procesos.push(p);
	}
	return procesos;
}

//Empieza a correr la simulación
function empezarSimulacion(){
	const procesosASimular=inicializarSimulacion(proc);
	var terminada=false;
	//Arreglos para identificar si el proceso está terminado
	var pro=[false];
	for(let i=1;i<proc;i++){
        pro.push(false);
    }
	var linea=0;
	var numPro=0;
	do{
		console.log("Proceso "+procesosASimular[numPro].numProceso);
		//document.write("Proceso "+procesosASimular[numPro].numProceso);
		if(procesosASimular[numPro].codigo[linea]!=null){
			console.log(`Linea de código: ${procesosASimular[numPro].codigo[linea]}`);
			//document.write(`Linea de código: ${procesosASimular[numPro].codigo[linea]}`);
		}else{
			pro[numPro]=true;
			console.log("Terminado");
			//document.write("Terminado");
		}
		numPro++;
		if(numPro>=pro.length){
			numPro=0;
			linea++;
		}
		for(let i=0;i<pro.length;i++){
            if(!pro[i]){
                terminada=false;
                break;
            }
            if(i+1==pro.length){
                terminada=true;
            }
        }
	}while(!terminada);
}

empezarSimulacion();