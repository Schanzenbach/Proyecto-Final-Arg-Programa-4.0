$(function() {
  
    $("form[name='validacion']").validate({
  
      rules: {
  
        nombre: "required",

        apellido: "required",

        numero: "required",

        email: {
          required: true,
          email: true,
        },

        documento: {
          required: true,
          minlength: 8,
          maxlength: 8,
        }

      },
  
      messages: {
  
        nombre: "Introduzca su nombre",
        apellido: "Introduzca su nombre",
        email: "Introduzca un Email",
        numero: "Introduzca un numero de contacto",
        documento: {

          required: "Introduzca su numero de documento",
  
          minlength: "Debe tener minimo 8 digitos.",
          maxlength: "Documento no valido.",
  
        },
      },
  
  
    });
  
    $("form[name='tarjeta']").validate({
  
      rules: {
  
        numcard: {
          required: true,
          maxlength: 16,
        },

        clavecard:  {
          required: true,
          maxlength: 3,
        },

        fecha: {
          required: true,
        }

      },
  
      messages: {
  
        numcard: {

          required: "Introduzca una tarjeta.",
          maxlength: "tarjeta invalida.",
  
        },
        clavecard: {

          required: "Introduzca una clave.",
          maxlength: "clave invalida.",
  
        },
        fecha: {

          required: "Introduzca una fecha.",
  
        },
      },
  
    });
  


  });
  