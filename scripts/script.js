const formulario = document.getElementById("formulario");
// Se obtiene una referencia al elemento del formulario mediante su id y se guarda en la variable formulario.

const inputs = document.querySelectorAll("#formulario input.formulario__input");
// Se obtienen todas las entradas de texto del formulario mediante el selector CSS #formulario input.formulario__input y se guardan en la variable inputs.

const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{4,16}$/, // Letras y espacios, pueden llevar acentos.
  apellido: /^[a-zA-ZÀ-ÿ\s]{4,16}$/, // Letras y espacios, pueden llevar acentos.
  edad: /^(1[8-9]|[2-7][0-9]|80)$/, // 18 años a 80 años de edad.
  usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  password: /^.{4,12}$/, // 4 a 12 digitos.
};
// Se definen expresiones regulares para validar diferentes campos del formulario, como nombre, apellido, edad, usuario, correo y contraseña.

const campos = {
  nombre: false,
  apellido: false,
  edad: false,
  usuario: false,
  correo: false,
  password: false,
  region: false,
  referencia: false,
};
// Se crea un objeto campos para almacenar el estado de validación de cada campo.

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "nombre":
      validarCampo(expresiones.nombre, e.target, "nombre");
      break;
    case "apellido":
      validarCampo(expresiones.apellido, e.target, "apellido");
      break;
    case "edad":
      validarCampo(expresiones.edad, e.target, "edad");
      break;
    case "usuario":
      validarCampo(expresiones.usuario, e.target, "usuario");
      break;
    case "correo":
      validarCampo(expresiones.correo, e.target, "correo");
      break;
    case "password":
      validarCampo(expresiones.password, e.target, "password");
      break;
  }
};
// Se define la función validarFormulario que se ejecuta cuando se produce un evento en un campo del formulario. Esta función valida el campo correspondiente utilizando la expresión regular adecuada.

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document
      .getElementById(`grupo__${campo}`)
      .classList.remove("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__${campo}`)
      .classList.add("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__${campo} .formulario__input-error`)
      .classList.remove("formulario__input-error-activo");
    campos[campo] = true;
  } else {
    document
      .getElementById(`grupo__${campo}`)
      .classList.add("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__${campo}`)
      .classList.remove("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__${campo} .formulario__input-error`)
      .classList.add("formulario__input-error-activo");
    campos[campo] = false;
  }
};
// Se define la función validarCampo que recibe una expresión regular, un elemento de entrada y el nombre del campo. Esta función aplica la expresión regular al valor del campo y actualiza las clases CSS y el estado en el objeto campos.

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});
// Se agregan event listeners a cada campo de entrada para los eventos keyup y blur (cuando el usuario escribe o sale del campo). Estos listeners llaman a la función validarFormulario.


formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const terminos = document.getElementById("terminos");
  const radio = document.getElementById("solo/duo");
  const radio2 = document.getElementById("5vs5");
  const region = document.getElementById("region").value;
  const referencia = document.getElementById("referencia").value;

  // Se agrega un event listener al formulario para el evento submit (enviar). Cuando se envía el formulario, se ejecuta esta función.

  if (region < 1) {
    campos.region = false;
    document
      .querySelector(`#grupo__region .formulario__input-error`)
      .classList.add("formulario__input-error-activo");
    console.log(campos.region);
  } else {
    campos.region = true;
    document
      .querySelector(`#grupo__region .formulario__input-error`)
      .classList.remove("formulario__input-error-activo");
    console.log(campos.region);
  }

  if (referencia < 1) {
    campos.referencia = false;
    document
      .querySelector(`#grupo__referencia .formulario__input-error`)
      .classList.add("formulario__input-error-activo");
    console.log(campos.referencia);
  } else {
    campos.referencia = true;
    document
      .querySelector(`#grupo__referencia .formulario__input-error`)
      .classList.remove("formulario__input-error-activo");
    console.log(campos.referencia);
  }

  //   Dentro de la función de envío del formulario, se realiza la validación adicional de los campos region y referencia que no están cubiertos por las expresiones regulares. Si los campos son válidos, se muestra un mensaje de éxito y se restablece el formulario. Si hay campos inválidos, se muestra un mensaje de error.

  if (
    campos.region &&
    campos.referencia &&
    (radio.checked || radio2.checked) &&
    campos.nombre &&
    campos.apellido &&
    campos.edad &&
    campos.usuario &&
    campos.correo &&
    campos.password &&
    terminos.checked
  ) {
    formulario.reset();

    // Al final de la función de envío del formulario, se eliminan las clases CSS formulario__grupo-correcto de todos los elementos del formulario que las tengan aplicadas.

    document
      .getElementById("formulario__mensaje-exito")
      .classList.add("formulario__mensaje-exito-activo");
    setTimeout(() => {
      document
        .getElementById("formulario__mensaje-exito")
        .classList.remove("formulario__mensaje-exito-activo");
    }, 5000);

    document
      .querySelectorAll(".formulario__grupo-correcto")
      .forEach((elemt) => {
        elemt.classList.remove("formulario__grupo-correcto");
      });
  } else {
    document
      .getElementById("formulario__mensaje")
      .classList.add("formulario__mensaje-activo");
    setTimeout(() => {
      document
        .getElementById("formulario__mensaje")
        .classList.remove("formulario__mensaje-activo");
    }, 3000);
  }
});


