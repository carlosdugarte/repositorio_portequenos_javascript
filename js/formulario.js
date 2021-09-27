//listener para el botòn submit
let miFormulario = document.getElementById("formularioContacto");
miFormulario.addEventListener("submit", validarFormulario);

function validarFormulario(e){
    //detenemos el evento
    e.preventDefault();
    //Obtenemos el elemento desde el cual se disparó el evento
    let formulario = e.target
    //valido los campos
    if(formulario.children[0].children[0].children[1].value == ''){ //input nombre
        alert("Debe completar el nombre");
        return;
    }else if(formulario.children[0].children[1].children[1].value == ''){//input apellido
        alert("Debe completar el apellido");
        return;
     }else if(formulario.children[0].children[2].children[1].value == ''){//input edad
        alert("Debe completar la edad");
        return;
     }else if(formulario.children[0].children[3].children[1].value == ''){ //text area consulta
        alert("Debe completar la consulta");
        return;
     }

    //si completan los campos hago submit
    formulario.submit();
}
