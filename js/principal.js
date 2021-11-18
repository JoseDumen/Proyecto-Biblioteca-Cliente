"use strict";
var biblioteca = new Biblioteca();

datosIniciales();
//ocultarTodo();
//gestionFormularios("areaHome");
document.getElementById("mensaje").style.display = "none";

function datosIniciales(){
    biblioteca.altaArticulo(new Libro(1,"El Quijote I","Miguel Cervantes",100,false));
    biblioteca.altaArticulo(new Libro(2,"El Quijote II","Miguel Cervantes",100,false));
    biblioteca.altaArticulo(new Libro(3,"El Quijote III","Miguel Cervantes",100,false));
    biblioteca.altaArticulo(new Libro(4,"El Quijote IV","Miguel Cervantes",100,false));
    biblioteca.altaArticulo(new Libro(5,"El Quijote V","Miguel Cervantes",100,true));
    biblioteca.altaArticulo(new DVD(6,"La Macarena I","2021-01-25",true,false));
    biblioteca.altaArticulo(new DVD(7,"La Macarena II","2021-02-06",true,false));
    biblioteca.altaArticulo(new DVD(8,"La Macarena III","2021-03-09",false,false));
    biblioteca.altaArticulo(new DVD(9,"La Macarena IV","2021-04-03",true,true));
    biblioteca.altaArticulo(new DVD(10,"La Macarena V","2021-05-03",true,false));
    biblioteca.altaUsuario(new Usuario(1,"Manolo","Lopez","123456789"));
    biblioteca.altaUsuario(new Usuario(2,"Maria","Lopez","123456789"));
}

cargarOptions();
function cargarOptions(){
    frmAltaPrestamo.lstDVD1.innerHTML = biblioteca.optionsLibros();
    frmAltaPrestamo.lstDVD2.innerHTML = biblioteca.optionsLibros();
    frmAltaPrestamo.lstLibro1.innerHTML = biblioteca.optionsDVD();
    frmAltaPrestamo.lstLibro2.innerHTML = biblioteca.optionsDVD();
}

function gestionFormularios(areaVisible) {
    for(let area of document.getElementsByClassName("areaFrm")){
        area.hidden = true;
        document.getElementById("mensaje").style.display = "none";
    }
        
    document.getElementById(areaVisible).hidden=false;
}

function ocultarTodo(){
    let oFormularios = document.getElementsByClassName("areaFrm");
    for(let i = 0;i<oFormularios.length ; i++){
        oFormularios[i].hidden = true;
    }
    document.getElementById("mensaje").style.display = "none";
}

function ocultarAreaLibro() {
document.getElementById("areaFrmLibro").hidden=true;
document.getElementById("areaFrmDvd").hidden=false;
}

function ocultarAreaDvd() {
    document.getElementById("areaFrmDvd").hidden=true;
    document.getElementById("areaFrmLibro").hidden=false;
}

function nuevoUsuario() {
    let tempUsuario;
    let sMensaje = "Rellene correctamente los campos.";
    if (comprobarCamposAltaUsuario()){
    let nuevoUsuarioId = parseInt(frmAltaUsuario.txtIdAltaUsuario.value);
    let nuevoUsuarioNombre = frmAltaUsuario.txtNombreUsuario.value;
    let nuevoUsuarioApellidos = frmAltaUsuario.txtApellidosUsuario.value;
    let nuevoUsuarioTelefono = parseInt(frmAltaUsuario.txtTelefono.value);

    tempUsuario = new Usuario(nuevoUsuarioId,nuevoUsuarioNombre,nuevoUsuarioApellidos,nuevoUsuarioTelefono); 
    sMensaje = biblioteca.altaUsuario(tempUsuario);
    }

    if(sMensaje == "Usuario dado de alta correctamente"){
        document.getElementById("mensaje").style.display = "block";
        document.getElementById("mensaje").innerHTML = sMensaje;
        document.getElementById("areaAltaUsuario").hidden = true;
        frmAltaUsuario.reset();
    } else {
        document.getElementById("mensaje").style.display = "block";
        document.getElementById("mensaje").innerHTML = sMensaje;
    }
    


}

function comprobarCamposAltaUsuario() {
    let camposRellenos = true;
    if(frmAltaUsuario.txtIdAltaUsuario.value=="" || frmAltaUsuario.txtNombreUsuario.value== ""
    || frmAltaUsuario.txtApellidosUsuario.value=="" || frmAltaUsuario.txtTelefono.value=="")
    camposRellenos = false;

    return camposRellenos;
}

function nuevoArticulo() {
    let tempArticulo;
    let sMensaje = "Rellene correctamente los campos";
    if (comprobarCamposAltaArticulo()){
    let nuevoArticuloId = parseInt(frmAltaArticulo.txtIdArticulo.value);
    let nuevoArticuloTitulo = frmAltaArticulo.txtTitulo.value;
    let nuevoArticuloTipo = frmAltaArticulo.radioArticulo.value;
    if(nuevoArticuloTipo == "libro"){
        let nuevoArticuloNombreAutor = frmAltaArticulo.txtNombreAutor.value;
        let nuevoArticuloNumeroPaginas = frmAltaArticulo.iNumeroPaginas.value;
        tempArticulo = new Libro(nuevoArticuloId,nuevoArticuloTitulo,nuevoArticuloNombreAutor,nuevoArticuloNumeroPaginas);
        sMensaje = biblioteca.altaArticulo(tempArticulo);

    }
    else {
        let nuevoArticuloFechaEstreno = new Date(frmAltaArticulo.dtFechaEstreno.value);
        let nuevoArticuloSubtitulada;
        if(frmAltaArticulo.radioSubtitulado.value == "subtituladoSi")
        nuevoArticuloSubtitulada = true;
        else
        nuevoArticuloSubtitulada = false;
        tempArticulo = new DVD(nuevoArticuloId,nuevoArticuloTitulo,nuevoArticuloFechaEstreno,nuevoArticuloSubtitulada);
        sMensaje = biblioteca.altaArticulo(tempArticulo);
    }
    }
    if(sMensaje == "Artículo dado de alta correctamente"){
        document.getElementById("mensaje").style.display = "block";
        document.getElementById("mensaje").innerHTML = sMensaje;
        document.getElementById("areaAltaArticulo").hidden = true;
        frmAltaArticulo.reset();
    } else {
        document.getElementById("mensaje").style.display = "block";
        document.getElementById("mensaje").innerHTML = sMensaje;
    }
    

}

function comprobarCamposAltaArticulo() {
let camposRellenos = true;
if(frmAltaArticulo.txtIdArticulo.value=="" || frmAltaArticulo.txtTitulo.value=="")
camposRellenos=false;
if(frmAltaArticulo.radioArticulo.value == "libro") {
    if(frmAltaArticulo.txtNombreAutor.value=="" || frmAltaArticulo.iNumeroPaginas.value =="") {
    camposRellenos=false;
    }
}
else {
    
        if(frmAltaArticulo.dtFechaEstreno.value == "") {
        camposRellenos = false
        }
    }

return camposRellenos;
}

function aceptarAltaPrestamo(){
    let oLibro1;
    let oLibro2;
    let oDVD1;
    let oDVD2;
    let sMensaje = validarCamposAltaPrestamo();
    
    if (sMensaje == ""){
        let iIdPrestamo = parseInt(frmAltaPrestamo.txtIdPrestamo.value.trim());
        let articulos = [];
        if (parseInt(frmAltaPrestamo.lstLibro1.value.trim()) != -1 ){
            oLibro1 = biblioteca.buscarArticulo(parseInt(frmAltaPrestamo.lstLibro1.value.trim()));
            articulos.push(oLibro1);
        }
        if (parseInt(frmAltaPrestamo.lstLibro2.value.trim()) != -1 ){
            oLibro2 = biblioteca.buscarArticulo(parseInt(frmAltaPrestamo.lstLibro2.value.trim()))
            articulos.push(oLibro2);
        }
        if (parseInt(frmAltaPrestamo.lstDVD1.value.trim()) != -1 ){
            oDVD1 = biblioteca.buscarArticulo(parseInt(frmAltaPrestamo.lstDVD1.value.trim()));
            articulos.push(oDVD1);
        }
        if (parseInt(frmAltaPrestamo.lstDVD2.value.trim()) != -1 ){
            oDVD2 = biblioteca.buscarArticulo(parseInt(frmAltaPrestamo.lstDVD2.value.trim()));
            articulos.push(oDVD2);
        }

        let idUsuario = parseInt(frmAltaPrestamo.txtIdUsuario.value.trim());

        let oUsuario = biblioteca.buscarUsuario(idUsuario);

        console.log("oUsuario "+ oUsuario);

        if(oUsuario != undefined){

            let dtFechaInicio = new Date(frmAltaPrestamo.txtFechaInicio.value);

            let oPrestamo = new Prestamo(iIdPrestamo,articulos,oUsuario,dtFechaInicio,null);
    
            let sMensajeAlta = biblioteca.altaPrestamo(oPrestamo);
    
            if(sMensajeAlta == "Préstamo aceptado correctamente"){   
                document.getElementById("mensaje").style.display = "block";
                document.getElementById("mensaje").innerHTML = sMensajeAlta;
                document.getElementById("areaAltaPrestamo").hidden = true;            
                frmAltaPrestamo.reset();
            } else {
                document.getElementById("mensaje").style.display = "block";
                document.getElementById("mensaje").innerHTML = sMensajeAlta;
            }       
        } else {
            sMensaje = "Ese usuario no existe";
            document.getElementById("mensaje").style.display = "block";
            document.getElementById("mensaje").innerHTML = sMensaje;
        }
    } else {
        document.getElementById("mensaje").style.display = "block";
        document.getElementById("mensaje").innerHTML = sMensaje;
    }         
}

function validarCamposAltaPrestamo(){
    let iIdPrestamo = parseInt(frmAltaPrestamo.txtIdPrestamo.value.trim());
    let iLibro1 = parseInt(frmAltaPrestamo.lstLibro1.value.trim());
    let iLibro2 = parseInt(frmAltaPrestamo.lstLibro2.value.trim());
    let iDVD1 = parseInt(frmAltaPrestamo.lstDVD1.value.trim());
    let iDVD2 = parseInt(frmAltaPrestamo.lstDVD2.value.trim());
    let idUsuario = parseInt(frmAltaPrestamo.txtIdUsuario.value.trim());
    let dtFechaInicio = new Date(frmAltaPrestamo.txtFechaInicio.value);
    let sMensajeValidacion = "";

    if(isNaN(iIdPrestamo)){
        sMensajeValidacion += "El campo de Id esta vacio <br>";
    } 
     if(iLibro1 != -1 && iLibro2 != -1 && iLibro1 == iLibro2){
        sMensajeValidacion += "Los libros estan repetidos <br>";
    } 
     if(iDVD1 != -1 && iDVD2 != -1 && iDVD1 == iDVD2){
        sMensajeValidacion += "Los DVDs estan repetidos <br>";
    } 
     if(iDVD1 == -1 && iLibro1 == -1 && iDVD2 == -1 && iLibro2 == -1){
        sMensajeValidacion += "No ha seleccionado ningun articulo <br>";
    } 
     if(isNaN(idUsuario)){
        sMensajeValidacion += "El campo de usuario esta vacio <br>";
    } 
    
    return sMensajeValidacion;    
}

function devolverPrestamo(){
    let iIdPrestmao = parseInt(frmDevolverPrestamo.txtIdDevolverPrestamo.value.trim());
    let oPrestamo = biblioteca.buscarPrestamo(iIdPrestmao);
    let iPosicion = biblioteca.prestamos.lastIndexOf(oPrestamo);
    let sMensaje;
    let dtFechaFin = new Date();

    if(iPosicion > -1){
        oPrestamo.fechaFin = dtFechaFin;
        for(let i = 0; i < oPrestamo.articulos.length; i++){
            oPrestamo.articulos[i].prestado = false
        }
        sMensaje = "Préstamo devuelto";
        frmDevolverPrestamo.reset();
    } else {
        sMensaje = "Préstamo no existente";
    }
    
    document.getElementById("mensaje").style.display = "block";
    document.getElementById("mensaje").innerHTML = sMensaje;


}

function abrirVentanaListado(titulo, sTablaHtml) { //**LOS ABRIR LISTADO NO FUNCIONAN SI SE ABRE LA PÁGINA CON CTRL+1 DESDE VISUAL STUDIO CODE. HAY QUE HACER DOBLE CLICK SOBRE EL index.html**/
    let sTabla = "<h1>"+titulo+"</h1>"+sTablaHtml;
    let jsonTabla = JSON.stringify(sTabla);
    let sURL = encodeURI("plantillalistados.html?jsTabla="+ jsonTabla);
    let oVentana = open(sURL,"_blank","");
    oVentana.document.title=titulo;
}

function abrirVentanaListadoUsuarios() 
{

abrirVentanaListado("Listado de usuarios",biblioteca.listadoUsuarios());

}

function abrirVentanaListadoArticulos()  
{

abrirVentanaListado("Listado de artículos",biblioteca.listadoArticulos());

}

function aceptarListadoPrestamos(){ //Listado de préstamos entre dos fechas
    let fechaInicial = new Date (frmListadoPrestamos.dtListadoPrestamosFechaInicial.value);
    let fechaFinal = new Date (frmListadoPrestamos.dtListadoPrestamosFechaFinal.value);
    let sTabla = biblioteca.listadoPrestamos(fechaInicial,fechaFinal);
    
    abrirVentanaListado("Listado de préstamos",sTabla);
  
}

function aceptarListadoPrestamosUsuario(){
    let iIdUsuario = parseInt(document.getElementById("iIdUsuario").value.trim());
    let sTabla = biblioteca.listadoPrestamosUsuario(iIdUsuario);
    let sTitulo = "Listado de Préstamos del usuario "+iIdUsuario;
    
    abrirVentanaListado(sTitulo,sTabla);
}

function aceptarListadoTiposArticulos(){
    var txtTipoArticulo = document.getElementById("tipoArchivo").value;
    let sTabla = biblioteca.listadoTiposArticulos(txtTipoArticulo);

   abrirVentanaListado("Listado de artículos",sTabla);
}