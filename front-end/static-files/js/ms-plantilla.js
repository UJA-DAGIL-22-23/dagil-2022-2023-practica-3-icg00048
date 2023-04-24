/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};


// Plantilla de datosDescargados vacíos
Plantilla.datosDescargadosNulos = {
    mensaje: "Microservicio MS Plantilla: acerca de",
    autor: "Ignacio Cervilla Gomáriz",
    email: "icg000@red.ujaen.es",
    fecha: "24/04/2023"
}

Plantilla.plantillaTags = {
    "NOMBRE": "### NOMBRE ###",
    "TIPO_COMBUSTIBLE": "### TIPO_COMBUSTIBLE ###",
    "COLOR": "### COLOR ###",
    "HP": "### HP ###",
    "VELOCIDAD_MAXIMA": "### VELOCIDAD_MAXIMA ###",
    "NUMERO": "### NUMERO ###",
    "FECHADENACIMIENTO": "### FECHADENACIMIENTO ###",
    "ANIOS_GANADOR":"### ANIOS_GANADOR ###",
    "COEFICIENTE_AERODINAMICO":"### COEFICIENTO_AERODINAMICO ###",
    "PATROCINADOR":"### PATROCINADOR ###"

}
Plantilla.cerear = function ( num ) {
    return (num<10?"0":"")+num
}

Plantilla.plantillaTablaPersonas = {}   //Plantilla para los datos de cada persona


Plantilla.plantillaTablaPersonas.cabecera = `<table width="100%" class="listado-personas">
                    <thead>
                        <th width="10%">Nombre</th>
                        <th width="10%">Tipo_Combustible</th>
                        <th width="10%">Color</th>
                        <th width="10%">HP</th>
                        <th width="20%">Velocidad_Maxima</th>
                        <th width="10%">Numero</th>
                        <th width="20%">FechaDeNacimiento</th>
                        <th width="10%">Anios_Ganador</th>
                        <th width="10%">Coeficiente_Aerodinámico</th>
                        <th width="10%">Patrocinador</th>
                    </thead>
                    <tbody>
    `;

Plantilla.plantillaTablaPersonas.cuerpo = `
<tr title="${Plantilla.plantillaTags.NOMBRE}">
    <td>${Plantilla.plantillaTags.NOMBRE}</td>
    <td>${Plantilla.plantillaTags.TIPO_COMBUSTIBLE}</td>
    <td>${Plantilla.plantillaTags.COLOR}</td>
    <td>${Plantilla.plantillaTags.HP}</td>
    <td>${Plantilla.plantillaTags.VELOCIDAD_MAXIMA}</td>
    <td>${Plantilla.plantillaTags.FECHADENACIMIENTO}</td>
    <td>${Plantilla.plantillaTags.ANIOS_GANADOR}</td>
    <td>${Plantilla.plantillaTags.COEFICIENTE_AERODINAMICO}</td>
    <td>${Plantilla.plantillaTags.PATROCINADOR}</td>
    <td>
                <div><a href="javascript:Plantilla.mostrar('${Plantilla.plantillaTags.ID}')" class="opcion-secundaria mostrar">Mostrar</a></div>
    </td>
</tr>
`;

Plantilla.plantillaTablaPersonas.pie = `  </tbody>
    </table>
    `;



/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + "/Automovilismo/getTodos"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}


/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
Plantilla.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Plantilla Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
Plantilla.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined" ||
        typeof datosDescargados.email === "undefined" ||
        typeof datosDescargados.fecha === "undefined"
    ) datosDescargados = this.datosDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}


Plantilla.imprimeMuchasPersonas = function (){
    let msj = Plantilla.plantillaTablaPersonas.cabecera

    if( vector && Array.isArray(vector)){
        vector.forEach(e => msj = msj + Plantilla.plantillaTablaPersonas.actualiza(e))
    }

    msj += Plantilla.plantillaTablaPersonas.pie
    Frontend.actualizar("Listado de personas con todos los datos ", ms)

}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Plantilla.procesarHome = function () {
    this.descargarRuta("/Automovilismo/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Plantilla.procesarAcercaDe = function () {
    this.descargarRuta("/Automovilismo/acercade", this.mostrarAcercaDe);
}

Plantilla.plantillaTablaPersonas.actualiza = function (persona) {
    return Plantilla.sustituyeTags(this.cuerpo, persona)
}

Plantilla.sustituyeTags = function (plantilla, persona) {
    return plantilla
        .replace(new RegExp(Plantilla.plantillaTags.NOMBRE, 'g'), persona.ref['@ref'].nombre)
        .replace(new RegExp(Plantilla.plantillaTags.TIPO_COMBUSTIBLE, 'g'), persona.data.tipo_combustible)
        .replace(new RegExp(Plantilla.plantillaTags.COLOR, 'g'), persona.data.color)
        .replace(new RegExp(Plantilla.plantillaTags.HP, 'g'), persona.data.hp)
        .replace(new RegExp(Plantilla.plantillaTags.VELOCIDAD_MAXIMA, 'g'), persona.data.velocidad_maxima)
        .replace(new RegExp(Plantilla.plantillaTags.FECHADENACIMIENTO, 'g'), persona.data.fechaNacimiento.annio + "/" + persona.data.fechaNacimiento.mes + "/" + persona.data.fechaNacimiento.dia)
        .replace(new RegExp(Plantilla.plantillaTags.ANIOS_GANADOR, 'g'), persona.data.anios_ganador)
        .replace(new RegExp(Plantilla.plantillaTags.COEFICIENTE_AERODINAMICO, 'g'), persona.data.coeficiente_aerodinamico)
        .replace(new RegExp(Plantilla.plantillaTags.PATROCINADOR, 'g'), persona.data.patrocinador)
}



Plantilla.lista = function () {
    Plantilla.descargarRuta(Plantilla.imprimeMuchasPersonas);
}


