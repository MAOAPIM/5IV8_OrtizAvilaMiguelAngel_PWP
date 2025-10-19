/*
 // JS maneja varibles del siguiente modo:
// var => una variable de acceso local y global dependiendo de donde se declerare
// Let => Es una varible "Protegida", solo se puede hacer uso dentro de la funcion donde se declara
// Const => Es una variable que no puede cambiar su valor, es una constante
*/


 /*var x = "hola";

if (true) {

let x = "habia una vez";
console.log(x);

}


*/
/*
function suma (n1,n2){
    return n1 + n2;
}
console.log( `Esta suma es de: ${suma(5,3)}`);

*/
//funciones flecha: nos ayudan a hacer opreaciones mucho mas sencilla deacuerdo a la siguiente estrucuctura
// "cadena" -> id, clase, metodo, nombre, atributo


/*
const suma = (n1,n2) => n1 + n2;
console.log( `Esta suma es de: ${suma(5,3)}`);
*/

const razasDePerros = [
    "Pastor Alemán",
    "Labrador Retriever",
    "bulldog Francés",
    "Beagle",
    "Chichuahua",
    "Pug",
    "Dalmata",
    "Salchicha",
    "pugberto"
]

/*
for (let i = 0; i < razasDePerros.length; i++) {
    console.log(razasDePerros[i]);
}
*/
// for of
/*
for(const raza of razasDePerros){
    console.log(raza);
}
*/

// for in
/*
for(const indice in razasDePerros){
    console.log(indice);
}
*/

// forEach intera sobre los elementos del arreglo y no devuelve nada 
// Todas los forEach son funciones flecha por defecto
/*
razasDePerros.forEach(raza => console.log(raza));
*/
// La estructura general del forEach es la siguiente:
// Vamos a tner un argumento.forEach(raza, indice, arregloOriginal) => {codigo a ejecutar});

/*
razasDePerros.forEach((raza, indice, arregloOriginal) => console.log(raza));
*/

// funcion map -> interar sobre los elementos del arreglo, y regresar un arreglo diferente con el cual podemos jugar.

/*
const razasDePerrosMayusculas = razasDePerros.map(raza => raza.toUpperCase());
console.log(razasDePerrosMayusculas);
*/
// FIND -> nos permite  realizar una busqueda dentro del arreglo si lo encuentra lo retorna sino lanza un "undefined"


/*
if (razasDePerros.find(raza => raza === "chichuahua")) {
    console.log("Si se encontro la raza");
    console.log(razasDePerros);
}else{
    // hay que meterlo
    console.log("No se encontro la raza");
    console.log(razasDePerros);

}
    */
   
//FINDINDEX -> Nos permite  realizar una busqueda de un elemnto del arreglo, si lo encuetra nos  regresa el indeice, sino -1, esta funcion particularmente.
// util cunado necesitamos modificar o elimnar de un arreglo original, dentro  de una copia del mismo

const indiceChichuahua = razasDePerros.findIndex(raza => raza === "Chichuahua");

if (indiceChichuahua > -1) {
    // si se encontro  y esta dentro del arreglo
    console.log(razasDePerros[indiceChichuahua]);
    //Aparte le voy a decir que agregue un texto a este rsultado 
    razasDePerros[indiceChichuahua] += "(Es una raza de perros chiquitaa y chillona)";
    console.log(razasDePerros[indiceChichuahua]);
    console.log(razasDePerros);
}


//Beran de crear 