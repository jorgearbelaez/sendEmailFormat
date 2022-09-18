// variables
const btnEnviar = document.querySelector("#enviar");
const btnResetear = document.querySelector("#resetBtn");
const formulario = document.querySelector("#enviar-mail");
// variables para campos
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");

const er =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();
function eventListeners() {
  //cuando arranca la funcion
  document.addEventListener("DOMContentLoaded", iniciarApp); // esto tiene una funcio que me dispara todo lo que se tiene que hacer una vez que cargue todo el documento
  email.addEventListener("blur", validarFormulario);
  asunto.addEventListener("blur", validarFormulario);
  mensaje.addEventListener("blur", validarFormulario);
  // envio de email
  formulario.addEventListener("submit", enviarEmail);

  //reincia el formulario
  btnResetear.addEventListener("click", resetearFormulario);
}

//funciones
function iniciarApp() {
  btnEnviar.disable = true; // de entrada deshabilito el boton
  btnEnviar.classList.add("cursor-not-allowed", "opacity-50"); // con esto desahibilito el cursor cuando se posa sobre el boton
}

//valida el formulario
function validarFormulario(e) {
  //e.target.value es lo que escribamos en ese input
  if (e.target.value.length > 0) {
    //elimina errores una vez que valide positivo
    const error = document.querySelector("p.error");
    if (error) {
      error.remove();
    }

    e.target.classList.remove("border", "border-red-500");
    e.target.classList.add("border", "border-green-500");
  } else {
    //si no escribe nada y se sale del input le añadimos estas clases de tailwind
    //para resaltar el input
    e.target.classList.remove("border", "border-green-500");
    e.target.classList.add("border", "border-red-500");
    mostrarError("Todos los campos son obligatorios");
  }
  if (e.target.type === "email") {
    if (er.test(e.target.value)) {
      const error = document.querySelector("p.error");
      if (error) {
        error.remove();
      }

      e.target.classList.remove("border", "border-red-500");
      e.target.classList.add("border", "border-green-500");
    } else {
      // e.target.classList.remove("border", "border-green-500");
      e.target.classList.remove("border", "border-green-500");
      e.target.classList.add("border", "border-red-500");

      mostrarError("Email no valido");
    }
  }
  if (er.test(email.value) && asunto.value !== "" && mensaje.value !== "") {
    btnEnviar.disable = false;
    btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
  } else {
    mostrarError("hay campos por validar");
  }
}

function mostrarError(mensaje) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = mensaje;
  mensajeError.classList.add(
    "border",
    "border-red-500",
    "background-red-100",
    "text-red",
    "p-3",
    "mt-5",
    "text-center",
    "error"
  );

  //creamos una nueva constante para poderla condicionar
  const errores = document.querySelectorAll(".error");
  //seleccionamos queryselectorAll para poder evaluar una propiedad (.length) que
  //solo existe en querySelectorAll
  if (errores.length === 0) {
    formulario.appendChild(mensajeError);
  }
}
function enviarEmail(e) {
  e.preventDefault();

  // como el spiner se encuentra oculto en el css, lo seleccionamos
  const spinner = document.querySelector("#spinner");
  spinner.style.display = "flex";

  //ocultar el sppiner despues de 3 segundosy mostrar el mensaje

  setTimeout(() => {
    spinner.style.display = "none";

    // mensaje para decir que se envio correctamente
    const parrafo = document.createElement("p");
    parrafo.textContent = "El mensaje se ha enviado exitosamente";
    parrafo.classList.add(
      "p-2",
      "bg-green-500",
      "text-center",
      "my-10",
      "text-white",
      "font-bold",
      "uppercase"
    );
    formulario.insertBefore(parrafo, spinner);
    setTimeout(() => {
      //para elminar el parrafo despues de 5 segundos
      parrafo.remove();
      resetearFormulario();
    }, 5000);
  }, 3000); // este 3000 son ms, es decir 3 segundos despues de que el sppiner se active, se debe de ocultar
}

// resetear el formulario
function resetearFormulario() {
  formulario.reset();

  iniciarApp();
}
