/*
Para esta aplicación se va a realizar una clase
para la interfaz y una clase para el producto
cada uno con sus metodos.
*/

/*Se crea la clase producto con su constructor
que va recibir los parametros
*/
//Clase producto
class producto {
    constructor (nombre, precio, year){
        this.nombre = nombre;
        this.precio = precio;
        this.year = year;
    }
}
//Clase para la interface IU
class UI {
    //Metodo addProduct es la que accede al dom para poder alterarlo
    //Recibe como parametro a la constante definida y se guarda en una constante
    addProduct(productos) {
        const producList = document.getElementById('productolista');
        //se crea un elmento para mostrarlo en el div productolista
        const elemento = document.createElement('div');
        elemento.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Nombre del producto</strong>: ${productos.nombre}
                    <strong>Precio producto</strong>: ${productos.precio}
                    <strong>Año del producto</strong>: ${productos.year}
                    <a href='#' class="btn btn-danger" name="borrar">Borrar</a>
                </div>    
            </div>
        `;
        producList.appendChild(elemento);
        
    } 
    //MEtodo que me pemite limpiar el formulario
    resetForm(){
        document.getElementById('formProduct').reset();
        //this.resetForm();

    }
    
    //Metodo deleteProduct para eliminar un producto 
    deleteProduct(element){
        if (element.name === 'borrar'){
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Producto eliminado correctamente','info');
        }
    }
    //Metodo showMessage Nos permite mostrar un mensaje 
    showMessage(message, cssClass){
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-4`;
        div.appendChild(document.createTextNode(message));
        // Mostrando en el DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 2000);
    }
}

//DOM Events - Para capturar los eventos del usuario sobre el navegador
 //Me permite capturar un elemento por el id dado en el index.html
 //Mas .addEventListener el evento que quiero capturar
document.getElementById('formProduct')
.addEventListener('submit', function (e){
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const year = document.getElementById('year').value;
    
    //valido si esta capturando con console.log
    //console.log(nombre,precio,year);

    //Se llama a la clase creada del producto 
    //console.log(new producto ()) para validar

    const productos = new producto(nombre, precio, year);

    //se crea un nuevo objeto de la interface UI para llamarlo en el cuerpo del div que se esta construyendo en el 
    //metodo addProduct
    const ui = new UI();
    if (nombre ==='' || precio === '' || year === '') {
        return ui.showMessage('Ingresa los datos por favor', 'danger');
    }
    ui.addProduct(productos);
    ui.resetForm();
    ui.showMessage('Producto agregado correctamente','success');

    //Codigo para cancelar el refresco de la pagina
    //que se pasa como parametro dentro de la  funcion del 
    //formProduct
    e.preventDefault();
});

document.getElementById('productolista').addEventListener('click', function(e) {
    const ui = new UI ();
    ui.deleteProduct(e.target);
})