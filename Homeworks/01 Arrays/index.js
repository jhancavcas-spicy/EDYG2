// ==========================================
// JAVASCRIPT ARRAYS - HOMEWORK 01
// ==========================================


// ==========================================
// 1. at()
// ==========================================
// Permite obtener un elemento por su posición.
// También permite usar posiciones negativas.

const frutas = ["manzana", "pera", "uva", "mango"];

console.log("at:", frutas.at(1));   // pera
console.log("at negativo:", frutas.at(-1)); // mango



// ==========================================
// 2. concat()
// ==========================================
// Une dos o más arrays.

const numeros1 = [1, 2, 3];
const numeros2 = [4, 5, 6];

const numerosConcatenados = numeros1.concat(numeros2);

console.log("concat:", numerosConcatenados);
// [1, 2, 3, 4, 5, 6]



// ==========================================
// 3. constructor
// ==========================================
// Indica el constructor utilizado para crear el Array.

const animales = ["perro", "gato"];

console.log("constructor:", animales.constructor);
// Array



// ==========================================
// 4. copyWithin()
// ==========================================
// Copia elementos dentro del mismo array.

const numerosCopy = [1, 2, 3, 4, 5];

numerosCopy.copyWithin(0, 3);

console.log("copyWithin:", numerosCopy);
// [4, 5, 3, 4, 5]



// ==========================================
// 5. entries()
// ==========================================
// Devuelve un iterador con índice y valor.

const colores = ["rojo", "verde", "azul"];

for (const entrada of colores.entries()) {
    console.log("entries:", entrada);
}



// ==========================================
// 6. every()
// ==========================================
// Comprueba si TODOS los elementos cumplen una condición.

const edades = [18, 20, 25, 30];

const todosMayores = edades.every(edad => edad >= 18);

console.log("every:", todosMayores);
// true



// ==========================================
// 7. fill()
// ==========================================
// Reemplaza elementos por un valor.

const numerosFill = [1, 2, 3, 4, 5];

numerosFill.fill(0, 1, 4);

console.log("fill:", numerosFill);
// [1, 0, 0, 0, 5]



// ==========================================
// 8. filter()
// ==========================================
// Crea un nuevo array con los elementos que cumplen
// una condición.

const numerosFilter = [1, 2, 3, 4, 5, 6];

const pares = numerosFilter.filter(numero => numero % 2 === 0);

console.log("filter:", pares);
// [2, 4, 6]



// ==========================================
// 9. find()
// ==========================================
// Devuelve el primer elemento que cumple una condición.

const numerosFind = [5, 10, 15, 20];

const encontrado = numerosFind.find(numero => numero > 10);

console.log("find:", encontrado);
// 15



// ==========================================
// 10. findIndex()
// ==========================================
// Devuelve la posición del primer elemento
// que cumple una condición.

const numerosFindIndex = [5, 10, 15, 20];

const posicion = numerosFindIndex.findIndex(numero => numero > 10);

console.log("findIndex:", posicion);
// 2



// ==========================================
// 11. findLast()
// ==========================================
// Devuelve el último elemento que cumple
// una condición.

const numerosFindLast = [5, 10, 15, 20, 25];

const ultimoMayor = numerosFindLast.findLast(numero => numero > 10);

console.log("findLast:", ultimoMayor);
// 25



// ==========================================
// 12. findLastIndex()
// ==========================================
// Devuelve la posición del último elemento
// que cumple una condición.

const numerosFindLastIndex = [5, 10, 15, 20, 25];

const ultimaPosicion = numerosFindLastIndex.findLastIndex(
    numero => numero > 10
);

console.log("findLastIndex:", ultimaPosicion);
// 4



// ==========================================
// 13. flat()
// ==========================================
// Convierte un array con arrays internos
// en un array más plano.

const arrayAnidado = [1, 2, [3, 4], [5, 6]];

const arrayPlano = arrayAnidado.flat();

console.log("flat:", arrayPlano);
// [1, 2, 3, 4, 5, 6]



// ==========================================
// 14. flatMap()
// ==========================================
// Primero hace map() y después flat().

const numerosFlatMap = [1, 2, 3];

const duplicados = numerosFlatMap.flatMap(numero => [numero, numero * 2]);

console.log("flatMap:", duplicados);
// [1, 2, 2, 4, 3, 6]



// ==========================================
// 15. forEach()
// ==========================================
// Ejecuta una función para cada elemento.

const nombres = ["Juan", "Ana", "Pedro"];

nombres.forEach(nombre => {
    console.log("forEach:", nombre);
});



// ==========================================
// 16. includes()
// ==========================================
// Comprueba si un elemento existe en el array.

const frutasIncludes = ["manzana", "pera", "uva"];

console.log("includes:", frutasIncludes.includes("pera"));
// true

console.log("includes:", frutasIncludes.includes("banana"));
// false



// ==========================================
// 17. indexOf()
// ==========================================
// Devuelve la posición de un elemento.

const coloresIndex = ["rojo", "verde", "azul"];

console.log("indexOf:", coloresIndex.indexOf("verde"));
// 1



// ==========================================
// 18. join()
// ==========================================
// Convierte los elementos del array en un String.

const palabras = ["Hola", "mundo"];

const frase = palabras.join(" ");

console.log("join:", frase);
// "Hola mundo"



// ==========================================
// 19. keys()
// ==========================================
// Devuelve un iterador con los índices.

const animalesKeys = ["perro", "gato", "conejo"];

for (const indice of animalesKeys.keys()) {
    console.log("keys:", indice);
}



// ==========================================
// 20. lastIndexOf()
// ==========================================
// Devuelve la última posición donde aparece
// un elemento.

const numerosLastIndex = [1, 2, 3, 2, 4, 2];

console.log("lastIndexOf:", numerosLastIndex.lastIndexOf(2));
// 5



// ==========================================
// 21. length
// ==========================================
// Indica cuántos elementos tiene el array.

const frutasLength = ["manzana", "pera", "uva"];

console.log("length:", frutasLength.length);
// 3



// ==========================================
// 22. map()
// ==========================================
// Crea un nuevo array transformando cada elemento.

const numerosMap = [1, 2, 3, 4];

const cuadrados = numerosMap.map(numero => numero * numero);

console.log("map:", cuadrados);
// [1, 4, 9, 16]



// ==========================================
// 23. pop()
// ==========================================
// Elimina el último elemento.

const numerosPop = [1, 2, 3, 4];

const ultimo = numerosPop.pop();

console.log("pop:", ultimo);
// 4

console.log(numerosPop);
// [1, 2, 3]



// ==========================================
// 24. push()
// ==========================================
// Agrega uno o más elementos al final.

const numerosPush = [1, 2, 3];

numerosPush.push(4);

console.log("push:", numerosPush);
// [1, 2, 3, 4]



// ==========================================
// 25. reduce()
// ==========================================
// Reduce todos los elementos a un solo valor.

const numerosReduce = [1, 2, 3, 4];

const suma = numerosReduce.reduce(
    (total, numero) => total + numero,
    0
);

console.log("reduce:", suma);
// 10



// ==========================================
// 26. reduceRight()
// ==========================================
// Reduce comenzando desde la derecha.

const letras = ["A", "B", "C"];

const resultadoRight = letras.reduceRight(
    (resultado, letra) => resultado + letra,
    ""
);

console.log("reduceRight:", resultadoRight);
// "CBA"



// ==========================================
// 27. reverse()
// ==========================================
// Invierte el orden de los elementos.

const numerosReverse = [1, 2, 3, 4];

numerosReverse.reverse();

console.log("reverse:", numerosReverse);
// [4, 3, 2, 1]



// ==========================================
// 28. shift()
// ==========================================
// Elimina el primer elemento.

const numerosShift = [1, 2, 3, 4];

const primero = numerosShift.shift();

console.log("shift:", primero);
// 1

console.log(numerosShift);
// [2, 3, 4]



// ==========================================
// 29. slice()
// ==========================================
// Extrae una parte del array sin modificar
// el array original.

const numerosSlice = [1, 2, 3, 4, 5];

const parte = numerosSlice.slice(1, 4);

console.log("slice:", parte);
// [2, 3, 4]



// ==========================================
// 30. some()
// ==========================================
// Comprueba si AL MENOS UN elemento cumple
// una condición.

const numerosSome = [1, 3, 5, 8];

const existePar = numerosSome.some(numero => numero % 2 === 0);

console.log("some:", existePar);
// true



// ==========================================
// 31. sort()
// ==========================================
// Ordena los elementos.

const numerosSort = [40, 10, 5, 20];

numerosSort.sort((a, b) => a - b);

console.log("sort:", numerosSort);
// [5, 10, 20, 40]



// ==========================================
// 32. splice()
// ==========================================
// Agrega, elimina o reemplaza elementos.

const frutasSplice = ["manzana", "pera", "uva"];

frutasSplice.splice(1, 1, "mango");

console.log("splice:", frutasSplice);
// ["manzana", "mango", "uva"]



// ==========================================
// 33. toLocaleString()
// ==========================================
// Convierte los elementos a texto respetando
// configuraciones regionales.

const numerosLocale = [1000, 2000, 3000];

console.log("toLocaleString:", numerosLocale.toLocaleString());



// ==========================================
// 34. toString()
// ==========================================
// Convierte el array en un String.

const frutasString = ["manzana", "pera", "uva"];

console.log("toString:", frutasString.toString());
// "manzana,pera,uva"



// ==========================================
// 35. unshift()
// ==========================================
// Agrega elementos al principio.

const numerosUnshift = [2, 3, 4];

numerosUnshift.unshift(1);

console.log("unshift:", numerosUnshift);
// [1, 2, 3, 4]



// ==========================================
// 36. values()
// ==========================================
// Devuelve un iterador con los valores.

const frutasValues = ["manzana", "pera", "uva"];

for (const fruta of frutasValues.values()) {
    console.log("values:", fruta);
}