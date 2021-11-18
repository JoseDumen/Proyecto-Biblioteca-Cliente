//Function Biblioteca

"use strict";

function Biblioteca(){
    this.usuarios = [];
    this.catalogo = [];
    this.prestamos = [];
}

Biblioteca.prototype.optionsLibros = function(){

    let sOptions = '<option value="-1">Ninguno</option>';

    for(let articulo of this.catalogo){
        if (articulo.prestado == false && articulo instanceof Libro){
            sOptions += '<option value="' + articulo.idArticulo + '">' + articulo.titulo + '</option>';
        }
    }

    return sOptions;
}

Biblioteca.prototype.optionsDVD = function(){

    let sOptions = '<option value="-1">Ninguno</option>';

    for(let articulo of this.catalogo){ 
        if (articulo.prestado == false && articulo instanceof DVD){ 
            sOptions += '<option value="' + articulo.idArticulo + '">' + articulo.titulo + '</option>';
        }
    }

    return sOptions;
}

Biblioteca.prototype.altaUsuario = function(oUsuario){

    let sMensaje = "Los datos del usuario están incompletos";
    let bEncontrado = false;

    if(oUsuario != undefined){
                // Busco el usuario en la lista
                if (this.buscarUsuario(oUsuario.idUsuario) != undefined){ 
                    bEncontrado = true;
                }
                if(bEncontrado == true) {
                    sMensaje = "Ese usuario ya existe";
                }
                else {
                    this.usuarios.push(oUsuario);
                    sMensaje = "Usuario dado de alta correctamente";
                }  
     }

    return sMensaje; 
}

Biblioteca.prototype.altaArticulo = function(oArticulo){

    let sMensaje = "Los datos del artículo están incompletos";
    let bEncontrado = false;

    if(oArticulo != undefined){
            if(this.buscarArticulo(oArticulo.idArticulo) != undefined){  // Busco el artículo en la lista
                    bEncontrado = true;
            }
                if(bEncontrado == true) {
                    sMensaje = "Ese artículo ya existe";
                }
                else {
                    this.catalogo.push(oArticulo);
                    sMensaje = "Artículo dado de alta correctamente";
                }  
     }
    
    return sMensaje;
}

Biblioteca.prototype.altaPrestamo = function(oPrestamo){

    let sMensaje = "Los datos del préstamo están incompletos";
    let bEncontrado = false;

    if(oPrestamo != undefined){                                        
                if (this.buscarPrestamo(oPrestamo.idPrestamo) != undefined){ 
                    bEncontrado = true;
                }
                if(bEncontrado == true) {
                    sMensaje = "Ese préstamo ya existe";
                }
                else {                    
                    for(let i = 0; i<oPrestamo.articulos.length; i++){
                        oPrestamo.articulos[i].prestado = true;
                    }
                    this.prestamos.push(oPrestamo);
                    sMensaje = "Préstamo aceptado correctamente";
                }  
     }
    
    return sMensaje; 
}

Biblioteca.prototype.buscarUsuario = function(idTempUsuario) {
    let tempUsuario = undefined;
    for(let i=0;i<this.usuarios.length;i++) {
        if(this.usuarios[i].idUsuario == idTempUsuario)
        tempUsuario = this.usuarios[i];
    }
    return tempUsuario;
}

Biblioteca.prototype.buscarArticulo = function(idTempArticulo) {
    let tempArticulo = undefined;
    for(let i=0;i<this.catalogo.length;i++) {
        if(this.catalogo[i].idArticulo == idTempArticulo)
        tempArticulo = this.catalogo[i];
    }
    return tempArticulo;
}

Biblioteca.prototype.buscarPrestamo = function(idTempPrestamo) {
    let tempPrestamo = undefined;
    for(let i=0;i<this.prestamos.length;i++) {
        if(this.prestamos[i].idPrestamo == idTempPrestamo)
        tempPrestamo = this.prestamos[i];
    }
    return tempPrestamo;
}

Biblioteca.prototype.listadoUsuarios = function()
{
    let sTabla = '<table class="table table-bordered">';

      sTabla += '<thead>';
      sTabla +=  '<tr>';
      sTabla +=  '<th scope="col">Id Usuario</th>';
      sTabla +=  '<th scope="col">Nombre</th>';
      sTabla +=  '<th scope="col">Apellidos</th>';
      sTabla +=  '<th scope="col">Teléfono</th>';
      sTabla += '</tr>';
      sTabla += '</thead>';
      sTabla += '<tbody>';
    
      for(let i = 0 ; i<this.usuarios.length ; i++)
      {
        sTabla += this.usuarios[i].toHTMLRow;
      }
    
  sTabla +=  '</tbody>';
  sTabla += '</table>';

  return sTabla;

}

Biblioteca.prototype.listadoArticulos = function()
{
    let sTablas = '<table class="table table-bordered">';

      sTablas += '<thead>';
      sTablas +=  '<tr>';
      sTablas +=  '<th scope="col">Id Articulo</th>';
      sTablas +=  '<th scope="col">Titulo</th>';
      sTablas +=  '<th scope="col">Fecha de estreno</th>';
      sTablas +=  '<th scope="col">Subtitulada</th>';
      sTablas +=  '<th scope="col">Prestada</th>';
      sTablas += '</tr>';
      sTablas += '</thead>';
      sTablas += '<tbody>';
    
      for(let i = 0 ; i<this.catalogo.length ; i++)
      {
          if(this.catalogo[i] instanceof DVD){
            sTablas += this.catalogo[i].toHTMLRow;
          }
        
      }
    
  sTablas +=  '</tbody>';
  sTablas += '</table>';
  
  sTablas +='<br>';

  sTablas += '<table class="table table-bordered">';

  sTablas += '<thead>';
  sTablas +=  '<tr>';
  sTablas +=  '<th scope="col">Id Articulo</th>';
  sTablas +=  '<th scope="col">Titulo</th>';
  sTablas +=  '<th scope="col">Autor</th>';
  sTablas +=  '<th scope="col">Páginas</th>';
  sTablas +=  '<th scope="col">Prestada</th>';
  sTablas += '</tr>';
  sTablas += '</thead>';
  sTablas += '<tbody>';

  for(let i = 0 ; i<this.catalogo.length ; i++)
  {
      if(this.catalogo[i] instanceof Libro){
        sTablas += this.catalogo[i].toHTMLRow;
      }
    
  }

sTablas +=  '</tbody>';
sTablas += '</table>';

  return sTablas;

}

Biblioteca.prototype.listadoPrestamos = function(fechaInicial, fechaFinal)
{
    //Indices de la tabla
    let sTabla = '<table class="table" border="1">';
    sTabla += '<thead>';
    sTabla += '<tr>';
    sTabla += '<th scope="col">ID Préstamo</th>';
    sTabla += '<th scope="col">ID Usuario</th>';
    sTabla += '<th scope="col">Nombre</th>';
    sTabla += '<th scope="col">Apellidos</th>';
    sTabla += '<th scope="col">Articulos</th>';
    sTabla += '<th scope="col">Fecha Inicial</th>';
    sTabla += '<th scope="col">Fecha Finalizacion</th>';
    sTabla += '</tr>';
    sTabla += '</thead>';
    sTabla += '<tbody>';

    //Body de la tabla. 
    for(let i=0 ; i<this.prestamos.length ; i++)
    {
        //Seleccionamos solo los prestamos que esten entre las fechas
        if (this.prestamos[i].fechaInicio >= fechaInicial && this.prestamos[i].fechaInicio <= fechaFinal)
        {
            sTabla += '<tr><td>' + this.prestamos[i].idPrestamo + '</td>';
            sTabla += '<td>' + this.prestamos[i].usuario.idUsuario +'</td>';
            sTabla += '<td>' + this.prestamos[i].usuario.nombre +'</td>';
            sTabla += '<td>' + this.prestamos[i].usuario.apellidos +'</td>';
            sTabla += '<td>';
            //For para los articulos
            for (let j = 0 ; j<this.prestamos[i].articulos.length ; j++)
            {
                sTabla += this.prestamos[i].articulos[j].titulo +'<br>';
            }
            sTabla += '</td>';

            sTabla += '<td>' + this.prestamos[i].fechaInicio.toDateString() +'</td>';

            if(this.prestamos[i].fechaFin==null)
                sTabla += '<td>No devuelto</td>';
            else
                sTabla += '<td>' + this.prestamos[i].fechaFin.toDateString() +'</td>';

                sTabla += '</tr>';

        }
    }
    sTabla += '</tbody>';

    return sTabla;
}

Biblioteca.prototype.listadoPrestamosUsuario = function(iIdUsuario)
{
    //Indices de la tabla
    let sTabla = '<table class="table" border="1">';
    sTabla += '<thead>';
    sTabla += '<tr>';
    sTabla += '<th scope="col">ID Prestamo</th>';
    sTabla += '<th scope="col">Articulos</th>';
    sTabla += '<th scope="col">Fecha Inicio</th>';
    sTabla += '<th scope="col">Fecha Finalizacion</th>';
    sTabla += '</tr>';
    sTabla += '</thead>';
    sTabla += '<tbody>';

    //Body de la tabla
    if(this.prestamos.length >0){
        for (let i=0; i<this.prestamos.length ; i++)
        {
            if (this.prestamos[i].usuario.idUsuario == iIdUsuario)
            {
                sTabla += '<tr><td>'+this.prestamos[i].idPrestamo+'</td>';
                
                sTabla += '<td>';
                for (let j = 0 ; j<this.prestamos[i].articulos.length ; j++)
                {
                    sTabla += this.prestamos[i].articulos[j].titulo +'<br>';
                }
                sTabla += '</td>';
    
                sTabla += '<td>'+this.prestamos[i].fechaInicio.toDateString()+'</td>';
    
                if(this.prestamos[i].fechaFin==null)
                    sTabla += '<td>No devuelto</td>';
                else
                    sTabla += '<td>' + this.prestamos[i].fechaFin.toDateString() +'</td>';
    
                sTabla += '</tr>';
            }
            else
            {
                sTabla = '<h1>No se ha encontrado al usuario</h1>';
            }
        } 
    } else {
        sTabla = '<h1>No se han registrado ningun prestamo</h1>';
    }
    
    
    return sTabla;
}

Biblioteca.prototype.listadoTiposArticulos = function(txtTipoArticulo)
{
    //  libros instance of articulo

    //Indices de la tabla
    let sTabla = '<table class="table">';
    sTabla += '<thead>';
    sTabla += '<tr>';
    sTabla += '<th scope="col">ID Artículo</th>';
    sTabla += '<th scope="col">Título</th>';

    switch (txtTipoArticulo)
    {
        case 'Libro':
            sTabla += '<th scope="col">Autor</th>';
            sTabla += '<th scope="col">Páginas</th>';
            sTabla += '<th scope="col">Prestado</th>';
            sTabla += '</tr>';
            sTabla += '</thead>';
            sTabla += '<tbody>';
            for (let i=0; i<this.catalogo.length ; i++)
            {
                if (this.catalogo[i] instanceof Libro)
                {
                    sTabla += this.catalogo[i].toHTMLRow;
                }
            }
            break;
        case 'DVD':
            sTabla += '<th scope="col">Fecha de Estreno</th>';
            sTabla += '<th scope="col">Subtitulada</th>';
            sTabla += '<th scope="col">Prestado</th>';
            sTabla += '</tr>';
            sTabla += '</thead>';
            sTabla += '<tbody>';
            for (let i=0; i<this.catalogo.length ; i++)
            {
                if (this.catalogo[i] instanceof DVD)
                {
                    sTabla += this.catalogo[i].toHTMLRow;
                }
            }
            break;
    }
    return sTabla;
}




//Clase Usuario

class Usuario {
constructor(iIdUsuario, sNombre, sApellidos, iTelefono) {
    this.idUsuario = iIdUsuario;
    this.nombre = sNombre;
    this.apellidos = sApellidos;
    this.telefono = iTelefono;
}


 get toHTMLRow(){
    let sFila = "<tr>";
    sFila += "<th scope='row'>" + this.idUsuario + "</th>";
    sFila += "<td>" + this.nombre + "</td>";
    sFila += "<td>" + this.apellidos + "</td>";
    sFila += "<td>" + this.telefono + "</td></tr>";

    return sFila;
}
}

// Clase Articulo

class Articulo
{
    constructor(iIdArticulo, sTitulo, bPrestado)
    {
        this.idArticulo = iIdArticulo;
        this.titulo = sTitulo;
        this.prestado = bPrestado;
    }

    get toHTMLRow()
    {
        let sFila = "<tr>";
        sFila += "<th scope='row'>" + this.idArticulo + "</th>";
        sFila += "<td>" + this.titulo + "</td>";
        if(this.prestado == true)
        sFila += "<td>Sí</td></tr>";
        else
        sFila += "<td>No</td></tr>";

        return sFila;
    }

}

//Clase Libro

class Libro extends Articulo
{
    constructor(iIdArticulo, sTitulo ,nAutor, iPaginas, bPrestado)
    {
        super(iIdArticulo, sTitulo);
        this.autor = nAutor;
        this.paginas = iPaginas;
        this.prestado = bPrestado;

    }

    get toHTMLRow()
    {
        let sFila = "<tr>";
        sFila += "<th scope='row'>" + this.idArticulo + "</th>";
        sFila += "<td>" + this.titulo + "</td>";
        sFila += "<td>" + this.autor + "</td>";
        sFila += "<td>" + this.paginas + "</td>";
        if(this.prestado == true)
        sFila += "<td>Sí</td></tr>";
        else
        sFila += "<td>No</td></tr>";

        return sFila;
    }
}

//Clase DVD

class DVD extends Articulo
{
    constructor(iIdArticulo,sTitulo,dtFechaEstreno,bSubtitulada,bPrestado) {
    super(iIdArticulo,sTitulo);
    this.fechaEstreno = dtFechaEstreno;
    this.subtitulada = bSubtitulada;
    this.prestado = bPrestado;
}

 get toHTMLRow(){
    let sFila = "<tr>";
    sFila += "<th scope='row'>" + this.idArticulo + "</th>";
    sFila += "<td>" + this.titulo + "</td>";
    sFila += "<td>" + this.fechaEstreno + "</td>";
    if(this.subtitulada == true){
        sFila += "<td>Sí</td>";
    } else{
        sFila += "<td>No</td>";
    }
    
    if(this.prestado == true){
        sFila += "<td>Sí</td></tr>";
    } else{
        sFila += "<td>No</td></tr>";
    }
    

    return sFila;
}
    
}

//Clase Prestamo

class Prestamo{
    constructor(iIdPrestamo, articulos, oUsuario, dtFechaInicio, dtFechaFin){
        this.idPrestamo = iIdPrestamo;
        this.articulos = articulos;
        this.usuario = oUsuario;
        this.fechaInicio = dtFechaInicio;
        this.fechaFin = dtFechaFin;
    }

    get toHTMLRow(){
        let sFila = "<tr>";
        sFila += "<th scope='row'>" + this.idPrestamo + "</th>";
        for(let i = 0; i<this.articulos.length;i++){
            sFila += "<td>" + this.articulos[i].titulo + "</td><br>";    
        }
        sFila += "<td>" + this.articulos + "</td>";
        sFila += "<td>" + this.usuario.nombre + "</td>";
        sFila += "<td>" + this.fechaInicio + "</td>";
        sFila += "<td>" + this.fechaFin + "</td></tr>";
    }
}






