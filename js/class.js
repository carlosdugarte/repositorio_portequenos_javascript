//1. Clase Producto
class Producto{
    constructor(codigo, nombre, descripcion, precio){
        this.codigo = codigo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = parseFloat(precio);
        this.vendido = false;
    }   

//vender productos
    vender(){
        this.vendido = "true";
    }
}

//2. Clase Item
class Item{
    constructor(codigo, descripcion, precio){
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.precio = parseFloat(precio);
        this.cantidad = 1;
    } 
    //Calcular el IVA de 21%
    calcularIva() {
        this.precio = this.precio * 1.21;
    }  

}