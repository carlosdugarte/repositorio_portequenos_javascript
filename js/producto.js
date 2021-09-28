//Listar Productos
ListarProductos();

//obtener el storage
getStorageCarrito();

//Para animar titulos nuestros productos
animarTituloNuestrosProductos();

//boton de búsqueda
//autómatico al typear
$('#buscador').on('keyup', filtrarProductos);
//al presionar el botón buscar
$('#botonBuscar').on('click', filtrarProductos);


