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
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "TIPO_COMBUSTIBLE": "### TIPO_COMBUSTIBLE ###",
    "COLOR": "### COLOR ###",
    "HP": "### HP ###",
    "VELOCIDAD_MAXIMA": "### VELOCIDAD_MAXIMA ###",
    "NUMERO": "### NUMERO ###",
    "FECHA_NACIMIENTO": "### FECHA_NACIMIENTO ###",
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
                        <th width="20%">Fecha_Nacimiento</th>
                        <th width="10%">Anios_Ganador</th>
                        <th width="10%">Numero</th>
                        <th width="10%">Coeficiente_Aerodinámico</th>
                        <th width="10%">Patrocinador</th>
                    </thead>
                    <tbody>
    `;


Plantilla.plantillaTablaPersonas.cabeceranNombres = `<table width="100%" class="listado-personas">
                    <thead>
                    
                        <th width="100%">Nombre</th>

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
    <td>${Plantilla.plantillaTags.FECHA_NACIMIENTO}</td>
    <td>${Plantilla.plantillaTags.ANIOS_GANADOR}</td>
    <td>${Plantilla.plantillaTags.NUMERO}</td>
    <td>${Plantilla.plantillaTags.COEFICIENTE_AERODINAMICO}</td>
    <td>${Plantilla.plantillaTags.PATROCINADOR}</td>
    <td>
                <div><a href="javascript:Plantilla.mostrar('${Plantilla.plantillaTags.ID}')" class="opcion-secundaria mostrar">Mostrar</a></div>
    </td>
</tr>
`;


Plantilla.plantillaTablaPersonas.cuerpoNombres = `
<tr title="${Plantilla.plantillaTags.ID}">
      
     <td>${Plantilla.plantillaTags.NOMBRE}</td>
   
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
        const url = Frontend.API_GATEWAY + ruta
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


Plantilla.recupera = async function (callBackFn,campo) {
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/Automovilismo/getTodos"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todas las persoans que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        callBackFn(vectorPersonas.data,campo)

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
        <li><b>Autor/a</b>: ${datosDescargados.mensaje}</li>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}


Plantilla.imprimeMuchasPersonas = function (vector){
    let msj = Plantilla.plantillaTablaPersonas.cabecera

    if( vector && Array.isArray(vector)){
        vector.forEach(e => msj = msj + Plantilla.plantillaTablaPersonas.actualiza(e))
    }

    msj += Plantilla.plantillaTablaPersonas.pie
    Frontend.Article.actualizar("Listado de personas con todos los datos ", msj)

}

Plantilla.listadoNombres = function (vector){
    let msj = Plantilla.plantillaTablaPersonas.cabeceranNombres

    if (vector && Array.isArray(vector)) {
        vector.forEach(e => msj = msj + Plantilla.plantillaTablaPersonas.actualizaNombres(e))
    }

    msj += Plantilla.plantillaTablaPersonas.pie
    Frontend.Article.actualizar("Lista con unicamente el nombre de los corredores", msj)
}



Plantilla.listadoNombresOrdenados = function (vector) {
    let msj = Plantilla.plantillaTablaPersonas.cabeceranNombres;
    let listaNombres = [];
  
    if (vector && Array.isArray(vector)) {
      listaNombres = vector.slice();
      listaNombres.sort(function (a, b) {
        let campoA = a.data.Nombre.toUpperCase();
        let campoB = b.data.Nombre.toUpperCase();
  
        if (campoA < campoB) {
          return -1;
        }
        if (campoA > campoB) {
          return 1;
        }
        return 0;
      });
    }
  
    listaNombres.forEach((e) => {
      msj += Plantilla.plantillaTablaPersonas.actualizaNombres(e);
    });
  
    msj += Plantilla.plantillaTablaPersonas.pie;
    Frontend.Article.actualizar(
      "Lista con únicamente el nombre de los corredores ordenados",
      msj
    );
  
    return listaNombres;
  };
  

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

Plantilla.plantillaTablaPersonas.actualizaNombres = function (persona) {
    return Plantilla.sustituyeTagsNombres(this.cuerpoNombres, persona)
}

Plantilla.sustituyeTags = function (plantilla, persona) {
    return plantilla
        .replace(new RegExp(Plantilla.plantillaTags.ID, 'g'), persona.ref['@ref'].id)
        .replace(new RegExp(Plantilla.plantillaTags.NOMBRE, 'g'), persona.data.Nombre)
        .replace(new RegExp(Plantilla.plantillaTags.TIPO_COMBUSTIBLE, 'g'), persona.data.Tipo_Combustible)
        .replace(new RegExp(Plantilla.plantillaTags.COLOR, 'g'), persona.data.Color)
        .replace(new RegExp(Plantilla.plantillaTags.HP, 'g'), persona.data.HP)
        .replace(new RegExp(Plantilla.plantillaTags.VELOCIDAD_MAXIMA, 'g'), persona.data.Velocidad_Maxima)
        .replace(new RegExp(Plantilla.plantillaTags.FECHA_NACIMIENTO, 'g'), persona.data.Fecha_Nacimiento.anio + "/" + persona.data.Fecha_Nacimiento.mes + "/" + persona.data.Fecha_Nacimiento.dia)
        .replace(new RegExp(Plantilla.plantillaTags.ANIOS_GANADOR, 'g'), persona.data.Anios_Ganador)
        .replace(new RegExp(Plantilla.plantillaTags.NUMERO, 'g'), persona.data.Numero)
        .replace(new RegExp(Plantilla.plantillaTags.COEFICIENTE_AERODINAMICO, 'g'), persona.data.Coeficiente_Aerodinámico)
        .replace(new RegExp(Plantilla.plantillaTags.PATROCINADOR, 'g'), persona.data.Patrocinador)
}

Plantilla.sustituyeTagsNombres = function (plantilla, persona) {
    return plantilla
        .replace(new RegExp(Plantilla.plantillaTags.NOMBRE, 'g'), persona.data.Nombre)
}

Plantilla.lista = function () {
    Plantilla.recupera(Plantilla.imprimeMuchasPersonas);
}

Plantilla.listaNombres = function () {
    Plantilla.recupera(Plantilla.listadoNombres);
}

Plantilla.listaNombresOrdenados = function () {
    Plantilla.recupera(Plantilla.listadoNombresOrdenados);
}