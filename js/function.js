//1. Listar productos con jquery agregando cards
function ListarProductos(){

    //URL con JSON de productos
    const URLGET = "https://my-json-server.typicode.com/carlosdugarte/repositorio_portequenos/productos"

    $.get(URLGET, function (respuesta, estado) {
        if(estado === "success"){
          let productos = respuesta;

            console.log(productos);

            for (const producto of productos) {
                    $(".divProductos").append( `
                                            <div class="card text-center" style="width: 15rem;">
                                                <img class="card-img-top" src="../img/teque${producto.codigo}.png"  alt="Combo de 6 Tequeños regulares">
                                                <div class="card-body">
                                                    <h1 class="titulos4">${producto.nombre}</h1>
                                                    <p>${producto.precio} ARS</p>                                            
                                                </div>
                                                <div>
                                                    <button type="button" id="botonComprar${producto.codigo}" class="btn btn btn-dark">Agregar al carrito</button>
                                                </div>
                                                <br><br>
                                            </div>                                            
                                            `);

                    //evento on click para agregar item al carrito
                    $(`#botonComprar${producto.codigo}`).on('click', function () {
                        agregarAlCarrito(producto.codigo, producto.nombre, producto.precio);
                    });  
            }
        }
    });
}

//2. llenar el carrito
function llenarCarrito(){

    blanquearElemento(".bodyTabla");
  
    //recorro el carrito
    Object.values(carrito).forEach(item =>{
            $(".bodyTabla").append( `  
                                    <tr>
                                        <td scope="row">
                                            <img class="card-img-top" id="imgCarrito" src="../img/teque${item.codigo}.png"  alt="Combo de 6 Tequeños regulares">
                                        </td>
                                        <td>${item.descripcion}</td>
                                        <td>${item.cantidad}</td>
                                        <td>
                                        <button id="botonMasItem${item.codigo}" class="btn btn-info btn-sm">
                                        +
                                        </button>
                                        <button id="botonMenosItem${item.codigo}" class="btn btn-danger btn-sm">
                                        -
                                        </button>
                                        </td>
                                        <td>$ <span>${item.precio}</span></td>
                                    </tr>
                                    `);
            
            //evento on click para agregar item al carrito
            $(`#botonMasItem${item.codigo}`).on('click', function () {
                accionarItem(item.codigo, 'Adicionar');
            });  
            $(`#botonMenosItem${item.codigo}`).on('click', function () {
                accionarItem(item.codigo, 'Restar');
            });  

    })

    //Calculamos el total de la compra
    armarFooterCarrito();

    //setear local storage del carrito
    setStorageCarrito();



}

//3. Aviso para notificar que se lleno el carrito
function avisarllenarCarrito(item){

    blanquearElemento(".avisoAgregarCarrito");  

    $(".avisoAgregarCarrito").prepend( `
                                        <div class="divItem" style="background-color: rgb(144, 223, 167); display: none;">
                                            <h4>Agregado al carrito: ${item.descripcion}</h4>
                                            <div>
                                                <img id= "imgProductos" src="../img/teque${item.codigo}.png" style="width: 100px; height: 100px;" alt="teque${item.codigo}" alt="${item.descripcion}" >
                                            </div>
                                            <div>
                                                <a href="./carrito.html">
                                                <button type="button" class="btn btn btn-dark" style="text-align: center;">Ir al carrito</button>
                                                </a>
                                            </div>
                                        </div>
                                    `);

    //función para que muestre el aviso por unos segundos
    animarAvisoAgregarCarrito();

}

//4. Armar footer carrito
function armarFooterCarrito(){

    blanquearElemento(".footerTabla");  

    //Si no hay nada en el carrito mostrar mensaje para comprar
    if (Object.keys(carrito).length === 0) {
        $(".footerTabla").append(`<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`);
        $('#totalPagar').val(0);
        $("#botonComprar").hide();
        return;
    }

    //Realizamos los calculos
    const totalCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0);
    const totalPrecio = Object.values(carrito).reduce((acc, {precio}) => acc +  precio ,0);

    blanquearElemento(".footerTabla");  

    //Asingo total del valor del precio
    $('#totalPagar').val(totalPrecio);

    $(".footerTabla").append( `
                                <tr>
                                    <td scope="row" colspan="2">Total productos</td>
                                    <td>${totalCantidad}</td>
                                    <td>
                                        <button class="btn btn-danger btn-sm" id="vaciarCarrito">
                                            vaciar todo
                                        </button>
                                    </td>
                                    <td class="font-weight-bold" >$ <span id="totalPrecio">${totalPrecio}</span></td>
                                </tr>
                            `);

    //evento on click para vaciar al carrito
    $(`#vaciarCarrito`).on('click', function () {
        carrito = {}
        llenarCarrito()
    });  
}

//5. Guardar storage carrito
function setStorageCarrito(){
    //guardar en el storage lo que tenga el carrito
    localStorage.setItem("carritoGuardado",JSON.stringify(carrito));
}

//6. Obtener el storage carrito
function getStorageCarrito(){
    //chequear el storage para mostrar los items del carrito
    if(localStorage.getItem("carritoGuardado")){
        carrito = JSON.parse(localStorage.getItem("carritoGuardado"));
        llenarCarrito();
    }else{
        carrito = {};
    }

}

//7. Blanquear elemento 
function blanquearElemento(idElemento){
    const elemento = document.querySelector(idElemento);
    elemento.innerHTML = "";
}

//8. Animar Titulo del Nuestros productos
function animarTituloNuestrosProductos(){
    //Animamos sus propiedades CSS con animate
    $("#tituloNuestrosProductos").animate({ margin: '50px',  }, //1er parámetro propiedades
                                            "slow",            //2do parámetro duración 
                                            function(){        //3er parámetro callback
                                                        $("#tituloNuestrosProductos").animate({ margin: '20px',  }, //1er parámetro propiedades
                                                        "slow",            //2do parámetro duración 
                                                        function(){        //3er parámetro callback
                                                            console.log("Fin de la animación");
                                                        });
                                            });
}

//9. animar Aviso de agregar carrito
function   animarAvisoAgregarCarrito(){  
    
    //FadeIn para que aparezca el elemento
    $(".divItem").fadeIn(1500, function(){
        //Cuando termina de aparecer el elemento lo ocultamos nuevamente
        $(".divItem").fadeOut(1500);
    });  
}

//10. Calcular el precio de n productos
function calcularPrecioItem(cantidad, precio){
    precio = cantidad * precio;
    return precio;
}

//11. Agregar items al carrito
function agregarAlCarrito(codigo, descripcion, precio){

        //creo un nuevo objeto item => items del carrito
        const item = new Item(codigo, descripcion, precio);

        //verifico si ya agregué un item con el mismo id. si es así aumento la cantidad
        if (carrito.hasOwnProperty(item.codigo)) {
             item.cantidad = carrito[item.codigo].cantidad + 1
        }
        
        //item.calcularIva();

        //calculo el precio
        item.precio = calcularPrecioItem(item.cantidad, item.precio);
        
        //agrego el producto al carrito
        carrito[item.codigo] = { ...item }

        //lleno el carrito
        llenarCarrito();

        //muestro el aviso
        avisarllenarCarrito(item);
}

//12. Accionar item
function accionarItem(codigo, accion){

    //URL con JSON de productos
    const URLGET = "https://my-json-server.typicode.com/carlosdugarte/repositorio_portequenos/productos"

    $.get(URLGET, function (respuesta, estado) {
        if(estado === "success"){
            // la respuesta la dejamos en la variable producto
            let productos = respuesta;

            //console.log(productos.find(producto => producto.codigo === codigo));

            //obtenermos el precio unitario del objeto producto haciendo un find
            let precioUnitario = productos.find(producto => producto.codigo === codigo).precio;
            
            //almacenamos en la variable item
            const item = carrito[codigo];

            //Dependiendo de la accion que querramos hacer restamos o sumamos la cantidad
            if (accion == 'Adicionar'){
                item.cantidad++;

            }else{
                item.cantidad--;
            }

            //Calculamos el precio
            item.precio = calcularPrecioItem(item.cantidad, precioUnitario);

            //agrego al carrito 
            carrito[codigo] = { ...item }

            //si la cantidad es cero eliminamos el objeto del carrito
            if (item.cantidad === 0) {
                delete carrito[codigo];
            }

            //lleno el carrito
            llenarCarrito();
            
        }
    });


}

//13. Filtrar buscador de productos
function filtrarProductos(e) {
    e.preventDefault();

    //Valor del input buscador
    const inputBuscador = $('#buscador').val();

    //input filtrado
    const inputFiltrado = $.trim(inputBuscador).toUpperCase();

    if (inputFiltrado != null && inputFiltrado != undefined && inputFiltrado != "") {

        //URL con JSON de productos
        const URLGET = "https://my-json-server.typicode.com/carlosdugarte/repositorio_portequenos/productos"

        $.get(URLGET, function (respuesta, estado) {
            if(estado === "success"){
                let productos = respuesta;

                //resultado de la búsqueda
                const resultadoBusqueda = productos.filter(producto => producto.nombre.toUpperCase().includes(inputFiltrado));

                blanquearElemento(".divProductos");

                if(resultadoBusqueda.length == 0){
                        $(".divProductos").append( `<p>No existen coincidencias en la búsqueda</p>`);
                }else{        
                    resultadoBusqueda.forEach(producto => {
                        $(".divProductos").append( `
                                                <div class="card text-center" style="width: 15rem;">
                                                    <img class="card-img-top" src="../img/teque${producto.codigo}.png"  alt="Combo de 6 Tequeños regulares">
                                                    <div class="card-body">
                                                        <h1 class="titulos4">${producto.nombre}</h1>
                                                        <p>${producto.precio} ARS</p>                                            
                                                    </div>
                                                    <div>
                                                        <button type="button" id="botonComprar${producto.codigo}" class="btn btn btn-dark">Agregar al carrito</button>
                                                    </div>
                                                </div>
                                                `);

                        //evento on click para agregar item al carrito
                        $(`#botonComprar${producto.codigo}`).on('click', function () {
                            agregarAlCarrito(producto.codigo, producto.nombre, producto.precio);
                        });  

                    });
                }

            }
        });


    }
    else
        //Vuelve a cargar la página actual sin la caché del navegador
        location.reload();
};

//14. Aplicar descuento
function aplicarDescuento(e){

    e.preventDefault();
    
    //obtengo el valor del cupon
    let inputValorCupon = $('#cuponDescuento').val();

    //Para conocer si el descuento ya fue aplicado
    var descuentoAplicado = false;
    const totalPrecioCarrito = Object.values(carrito).reduce((acc, {precio}) => acc +  precio ,0);
    const totalPrecioPagar = $('#totalPagar').val();

    if(totalPrecioCarrito != totalPrecioPagar){
        descuentoAplicado = true;    
    }else{
        descuentoAplicado = false;
    }

    console.log("totalPrecioCarrito"+totalPrecioCarrito);
    console.log("totalPrecioPagar"+totalPrecioPagar);

    //sacamos espacios y transformamos a mayusculas
    inputValorCupon = $.trim(inputValorCupon).toUpperCase();
    
    if(!descuentoAplicado){
        switch (inputValorCupon) {
            case "TEQUE1":
                        var totalPrecio = $('#totalPagar').val();
                        $('#totalPagar').val(totalPrecio - totalPrecio*0.50);
                        $('#totalPagar').css("background-color", "rgb(187, 223, 189)");
                        $('#mensajeValidacionCupon').text('50% descuento aplicado');
                        $('#mensajeValidacionCupon').css("color", "#008f39");
                        
                        break;
            case "TEQUE2":
                        var totalPrecio = $('#totalPagar').val();
                        $('#totalPagar').val(totalPrecio - totalPrecio*0.20);
                        $('#totalPagar').css("background-color", "rgb(187, 223, 189)");
                        $('#mensajeValidacionCupon').text('20% descuento aplicado');
                        $('#mensajeValidacionCupon').css("color", "#008f39");
                        break;
            case "TEQUE3":
                        var totalPrecio = $('#totalPagar').val();
                        $('#totalPagar').val(totalPrecio - totalPrecio*0.10);
                        $('#totalPagar').css("background-color", "rgb(187, 223, 189)");
                        $('#mensajeValidacionCupon').text('10% descuento aplicado');
                        $('#mensajeValidacionCupon').css("color", "#008f39");
                        break;
            default:
                        var totalPrecio = Object.values(carrito).reduce((acc, {precio}) => acc +  precio ,0);
                        $('#totalPagar').val(totalPrecio);
                        $('#mensajeValidacionCupon').css("color", "#cb3234");
                        $('#mensajeValidacionCupon').text('Debe ingresar un cupón valido');
            break;
        }
    }else{
        $('#mensajeValidacionCupon').css("color", "#cb3234");
        $('#mensajeValidacionCupon').text('Lo sentimos. sólo puede aplicar 1 sólo descuento');
    }
}

//15. Pagar compra
function pagarCompra(e){

    e.preventDefault();

    let formularioOk = validarCamposFormPagar();

    if(formularioOk){
      //objeto de compra
            compra = {
                nombre: $('#nombre').val(),
                correo: $('#correo').val(),
                productos: carrito, 
                totalPagar: $('#totalPagar').val(), 
                descuento: $('#cuponDescuento').val()
            };

            const URLGET = "https://my-json-server.typicode.com/carlosdugarte/repositorio_portequenos/posts";

            $.post(URLGET, compra ,(respuesta, estado) => {

                // alert("estado"+estado);
                if(estado === "success"){

                    Swal.fire({
                        icon: "success",
                        title: `Muchas gracias ${respuesta.nombre} por tu interés en esta página web! Hemos registrado su compra por un valor de ${respuesta.totalPagar} ARS`,
                        text: `Este es un emprendimiento ficticio. Luego se le enviará a su correo un enlace y se le permitiría pagar tu compra mediante mercado pago u otro método.`,
                        confirmButtonColor: 'rgb(0, 0, 0)',
                        footer: `<a href="../index.html">Volver al inicio</a>`, 
                    });

                    //cerramos la ventana modal
                    $('#compraModal').modal('toggle');

                    //vaciamos el carrito                    
                    carrito = {}
                    llenarCarrito()
                }  
            });
    }    

}

//16. Validar campor de formulario para pagar
function validarCamposFormPagar(){

    let validacion= true;
    const inputCorreo = document.getElementById("correo");
    const inputNombre = document.getElementById("nombre");

    if (!inputCorreo.checkValidity()) {
        $('#mensajeCorreo').text(inputCorreo.validationMessage);
        $('#mensajeCorreo').css("color", "#cb3234");
        validacion = false;
    }else{
        $('#mensajeCorreo').text('Ok');
        $('#mensajeCorreo').css("color", "#008f39");
    }

    if(!inputNombre.checkValidity()){
        $('#mensajeNombre').text(inputNombre.validationMessage);
        $('#mensajeNombre').css("color", "#cb3234");
        validacion = false;
    }else{
        $('#mensajeNombre').text('Ok');
        $('#mensajeNombre').css("color", "#008f39");
    }
    
    return validacion;  
}