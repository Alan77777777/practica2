// ARRAYS
var arrayData = []
var newTxt

// TRANSFORMAR TXT A TEXTO
var newTxt2
var archivo2Txt = new XMLHttpRequest()
var fileRuta2 = 'prueba2.txt'
archivo2Txt.open("GET", fileRuta2, false)
archivo2Txt.send(null)
var txt2 = archivo2Txt.responseText
console.log("TEXTO ORIGINAL", txt2)

// QUITAR LOS EXPACIOS
function añadirSimbolo(txt2) {
    newTxt2 = (txt2.replace(/\s/g, '|'))
    return newTxt2
}
añadirSimbolo(txt2)
console.log("SIMBOLO | AÑADIDO", newTxt2)

// SEPARA EL TEXTO POR MEDIO DEL SIMBOLO | Y LO GUARDA COMO ELEMENTOS EN EL ARRAY
var separador
separador = newTxt2.split('|')
console.log("ARRAY CON SEPARACIONES CON ELEMENTOS VACIOS", separador)

// QUITAR LOS ELEMENTOS VACIOS DEL ARRAY
var arraySeparadoSinEspacios = separador.filter(Boolean)
console.log("ARRAY CON SEPARACIONES Y SIN ELEMENTOS VACIOS", arraySeparadoSinEspacios)

// CREA SUB ARRAYS
var subArray = []
for (let i = 0; i < arraySeparadoSinEspacios.length; i++) {
    console.log(arraySeparadoSinEspacios[i])
    subArray[i] = arraySeparadoSinEspacios[i].split(',')
}
console.log("SUB ARRAY CON ELEMENTOS BASURA", subArray)

// QUITA LOS ELEMENTOS DE EL SUB ARRAY QUE NO SE USAN
for (let i = 0; i < subArray.length; i++) {
    subArray[i].splice(3, 2)
    subArray[i].splice(1, 1)
}
console.log("SUB ARRAY SIN ELEMENTOS BASURO", subArray)

// SE HACEN DIVISIONES DENTRO DE CADA ELEMENTO POR MEDIO DE SIMBOLO : Y SIMBOLO .
var arrrayHexadecimall = []
var arrayNumeross = []
for (let i = 0; i < subArray.length; i++) {
    arrrayHexadecimall[i] = subArray[i][0].split(':')
    arrayNumeross[i] = subArray[i][2].split('.')
}
console.log("ARRAY DE VALORES HEXADECIMALES CON SUS ELEMENTOS INTERNOS ", arrrayHexadecimall)
console.log("ARRAY DE VALORES NUMERICOS CON SUS ELEMENTOS INTERNOS ", arrayNumeross)

// CONVIERTE EL ARRAY STRING A NUMEROS
for (let i = 0; i < arrayNumeross.length; i++) {

    for (let index = 0; index < arrayNumeross[i].length; index++) {
        arrayNumeross[i][index] = parseInt(arrayNumeross[i][index])
    }

}

// AQUI SE CONVIERTE EL ARRAY DE DECIMAL A HEXADECIMAL
for (let i = 0; i < arrayNumeross.length; i++) {

    for (let indice = 0; indice < arrayNumeross[i].length; indice++) {
        let valorDinamico1 = arrayNumeross[i][indice].toString(16)
        arrayNumeross[i][indice] = valorDinamico1
    }

}
console.log(arrayNumeross.length)
console.log("ARRAY DECIMAL CONVERTIDO A HEXADECIMAL", arrayNumeross)

// UNE EL ARRAY DE LOS VALORES HEXADECIMALES
let arrayDataUnidoo = []
for (let i = 0; i < arrayNumeross.length; i++) {
    arrayDataUnidoo[i] = arrayNumeross[i].join(".")
    arrayDataUnidoo[i] = arrayDataUnidoo[i].toUpperCase()
}
console.log("JUNTA LOS 4 ELEMENTOS Y LOS PONE EN JUNTOS DE MANERA DE TEXTO EN UN NUEVO ELEMENTO DE UN NUEVO ARRAY QUE CONTIENE LOS TEXTOS EN STRING (LO QUE ERA ANTES DECIMAL AHORA ES HEXADECIMAL)", arrayDataUnidoo)

//  HEXADECIMAL A DECIMAL
function convertirHexADeci(hexadecimal) {
    hexadecimal = hexadecimal.replace(/[^0-9A-Fa-f]/gi, '')
    return Number.parseInt(hexadecimal, 16)
}

// AQUI SE CONVIERTE EL ARRAY DE HEXADECIMAL A DECIMAL
for (let i = 0; i < arrrayHexadecimall.length; i++) {

    for (let indice = 0; indice < arrrayHexadecimall[i].length; indice++) {
        let valorDinamico1 = convertirHexADeci(arrrayHexadecimall[i][indice])
        arrrayHexadecimall[i][indice] = valorDinamico1
    }

}
console.log(arrrayHexadecimall.length)
console.log("ARRAY HEXADECIMAL CONVERTIDO A DECIMAL", arrrayHexadecimall)

// UNE EL ARRAY DE LOS VALORES YA CONVERTIDOS A DECIMALES
let arrayDataUnidooo = []
for (let i = 0; i < arrrayHexadecimall.length; i++) {
    arrayDataUnidooo[i] = arrrayHexadecimall[i].join(" : ")
    arrayDataUnidooo[i] = arrayDataUnidooo[i].toUpperCase()
}
console.log("JUNTA LOS 8 ELEMENTOS Y LOS PONE EN JUNTOS DE MANERA DE TEXTO EN UN NUEVO ELEMENTO DE UN NUEVO ARRAY QUE CONTIENE LOS TEXTOS EN STRING (LO QUE ERA ANTES HEXADECIMAL AHORA ES DECIMAL)", arrayDataUnidooo)

// IMPRIME EL TEXTO FINAL
let textoFinall = []
for (let i = 0; i < subArray.length; i++) {
    subArray[i] = [subArray[i][1], arrayDataUnidooo[i], arrayDataUnidoo[i]]
    textoFinall[i] = subArray[i].join(" : ")
}
console.log("ARRAY FINAL COMPLEJO", subArray)
console.log("ARRAY FINAL ACORTADO", textoFinall)

// TRANSFORMACION DE ARRAYS A STRINGS
let texto1 = textoFinall.join("\n")
console.log(texto1)

// TRANSFORMAR A .TXT
const guardarArchivoDeTextoo = (contenido, nombre) => {
    const a = document.createElement("a");
    const archivo = new Blob([contenido], { type: 'text/plain' });
    const url = URL.createObjectURL(archivo);
    a.href = url;
    a.download = nombre;
    a.click();
    URL.revokeObjectURL(url);
}
const $botonDescargarr = document.querySelector("#descargarr");
$botonDescargarr.onclick = () => {
    guardarArchivoDeTextoo(texto1, "TEXTO MODIFICADO");
}

// PONER TEXTO FINAL EN HTML
let textoOriginal = document.querySelector('#texto')
textoOriginal.innerHTML = txt2