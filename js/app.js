// Variables
const email = document.getElementById('email');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');
const btnEnviar = document.getElementById('enviar');
const formularioEnviar = document.getElementById('enviar-email');
const resetBtn = document.getElementById('resetBtn');


// Event Listeners
(function eventListeners(){
    //Inicio de la aplicación y deshabilitar submit
    document.addEventListener('DOMContentLoaded', inicioApp);
    
    //Campos del formulario
    email.addEventListener('blur', validarCampo);
    asunto.addEventListener('blur', validarCampo);
    mensaje.addEventListener('blur', validarCampo);
    
    //Boton de enviar  en el submit
    // formularioEnviar.addEventListener('submit', enviarEmail);
    btnEnviar.addEventListener('click', enviarEmail);
    
    //Boton de reset
    resetBtn.addEventListener('click', resetFormulario);
    
})();



// Funciones
function inicioApp() {
    //deshabilitar el envio
    btnEnviar.disabled = true;
}

//valida que el campo tenga algo escrito
function validarCampo() {
    
    //Se valida la longitud del texto y que no esté vacio
    //el this se refiere a lo que se encargue de ejecutar estas funciones
    validarLongitud(this);
    
    //Validar unicamente el email
    if (this.type === 'email') {
        validarEmail(this);
    }
    
    let errores = document.querySelectorAll('.error');
    if (email.value !=='' && asunto.value !=='' && mensaje.value !==''){
        if (errores.length === 0){
            btnEnviar.disabled = false;
        }
    }
}

//Resetear el formulario
function resetFormulario(e) {
    formularioEnviar.reset();
    e.preventDefault();
}


//Cuando se envia el correo
function enviarEmail(e) {
    e.preventDefault();
    
    //Spinner al presionar Enviar
    const spinnerGif = document.querySelector('#spinner');
    spinnerGif.style.display = 'block';
    
    //Gif que envia email
    const enviado = document.createElement('img');
    enviado.src = 'img/mail.gif';
    enviado.style.display = 'block';
    
    //Ocultar Spinner y mostrar gif de eviad
    
    setTimeout(() => {
        spinnerGif.style.display = 'none';
        document.querySelector('#loaders').appendChild(enviado);
        
        setTimeout(() => {
            enviado.remove();
            formularioEnviar.reset();
        }, 5000);
    }, 3000);
}

//Verifica la longitud del texto en los campos
function validarLongitud(campo) {
    // console.log(campo.value.length);
    
    if (campo.value.length > 0) {
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    } else{
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}

function validarEmail(campo) {
    const mensaje = campo.value;
    if (mensaje.indexOf('@') !== -1) {//si != -1 si existe la @
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    } else{//si es = -1 no existe la @ en el string
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}