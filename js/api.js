var reserva = false;        //Valor de reserva Figura "Ocupada" de forma predeterminada.
var estado = "";           //Valor "estado" para definir el Lugar 
var precioDia = 0;          //Valor de Precio por dia del Lugar a reservar
var nombreZona = "Ninguo";  //Valor de Nombre del Lugar a reservar

function consultar(){

    let arrfi = document.querySelector('#entrada').value.split("-");    //Crea Array de la fecha Incio
    let arrff = document.querySelector('#salida').value.split("-");     //Crea Array de la fecha Final
    let arrdif = arrff[2] - arrfi[2];   //Calcula la diferencia entre las dos fechas (Solo dias)

    //console.log("Dias de hospedaje: " + arrdif)

    //Define el valor seleccionado de Hospedaje
    $("#hospedaje").ready(function(){
        estado = $("#hospedaje").val();
    });

    //Toma los datos almacenados en .json para confirmar fechas de reserva, precios y ubicaciones.
    $.get("../pages/json/datos.json",function(data){

    precioDia = data.lugares[estado].precio;    //Precio por dia
    nombreZona = data.lugares[estado].nombre;   //Nombre del lugar

    let intreservas = data.lugares[estado].fechaInicio.length; //Valor por cantidad de reservas

    var respuesta = document.querySelector('#respuesta');

    for (i = 0; i < intreservas ; i++){  //Verifica que ninguna reserva se superponga con la solicitud
        var DResInc = (data.lugares[estado].fechaInicio[i]).split("-"); //Crea Array de incio de reserva(ya ocupada) [Año, mes, dia]
        var DResFin = (data.lugares[estado].fechaFinal[i]).split("-"); //Crea Array de fin de reserva(ya ocupada) [Año, mes, dia]
        

        if ((arrfi[2] >= DResFin[2]) || ((arrfi[2] < DResInc[2]) && (arrff[2] < DResInc[2])) 
         && (arrff[2] >= DResFin[2]) || ((arrfi[2] < DResInc[2]) && (arrff[2] < DResInc[2])))
            {
            reserva = true;             //Si esta libre, se reserva
            }
        else
            {reserva = false; 
                respuesta.innerHTML = "No hay lugar disponible entre el " + DResInc[2] + "/" + DResInc[1] + " hasta el " + DResFin[2] + "/" + DResFin[1];
                break;}   //Si esta ocupado, se cancela y se cierra
        }

        if (reserva == true){

                let url = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';

                const api = new XMLHttpRequest();
                api.open('GET', url, true);
                api.send();

                api.onreadystatechange = function(){
                    if (this.status == 200 && this.readyState == 4){

                        let aUrl = JSON.parse(this.responseText); //Array de Api
                        let valorDolar = parseInt(aUrl[0].casa.compra); //Valor del dolar compra
                        let precioFinal = valorDolar * arrdif * precioDia;

                        document.querySelector('#precio').innerHTML = "$ "+precioFinal;
                        document.querySelector('#zona').innerHTML = nombreZona;
                        
                        respuesta.innerHTML = "La estadia en la zona de " + nombreZona + ", tiene un valor final de $" + precioFinal; 
                    }
                }
        }
    })

}

//CREAR PDF COMPROBANTE
function cPDF(){
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let email = document.getElementById('email').value;
    let hospedaje = document.getElementById('zona').innerHTML;
    let entrada = document.getElementById('entrada').value;
    let salida = document.getElementById('salida').value;
    let numero = document.getElementById('cel').value;
    let precio = document.getElementById('precio').innerHTML;

    let doc = new jsPDF();

    //Exportar datos al PDF
    doc.text(20, 20, 'Comprobante de Hospedaje');
    doc.text(20, 30, 'Nombre: ' + nombre);
    doc.text(20, 40, 'Apellido: ' + apellido);
    doc.text(20, 50, 'Email: ' + email);
    doc.text(20, 60, 'Telefono de contacto: ' + numero);
    doc.text(20, 70, 'Informacion de la reserva:')
    doc.text(20, 80, 'Lugar: ' + hospedaje);
    doc.text(20, 90, 'entrada: ' + entrada + ' salida: ' + salida);
    doc.text(20, 100, 'precio final: ' + precio);

    //Guardar PDF
    doc.save('comprobante.pdf');
}

//Validar Tarjeta (Para simular)
 function validarTarjeta(){
    let num = document.querySelector("#numcard").value;
    let clv = document.querySelector("#clavecard").value;
    let fv = document.querySelector("#fecha").value.toString();

    console.log(num + "-" + clv + "-" + fv);

    console.log(fv);
    console.log(typeof(fv));

    
    //console.log(typeof(pay.tarjetas[0].fv));

    $.get("../pages/json/datos.json",function(pay){
    
        let intTarjetas = pay.tarjetas;
        console.log(pay.tarjetas[0].fv);
        for (i = 0; i < intTarjetas.length; i++){

        if ((intTarjetas[i].num == num) && (intTarjetas[i].clv = clv) && (intTarjetas[i].fv == fv)){
            cPDF(); break;
        }else
        {alert("Tarjeta Rechazada"); break;}

    }

    })


 }


$.get("../pages/json/datos.json",function(data){
    let precioDia = data.lugares[0].precio;
    let url = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';

    const api = new XMLHttpRequest();
    api.open('GET', url, true);
    api.send();

    api.onreadystatechange = function(){
        if (this.status == 200 && this.readyState == 4){

            let aUrl = JSON.parse(this.responseText); //Array de Api
            let valorDolar = parseInt(aUrl[0].casa.compra); //Valor del dolar compra
            var precioFinal = valorDolar * precioDia;
      
            document.querySelector("#p1").textContent = "Precio por Dia/Noche $" +precioFinal;
          }
  }

})

$.get("../pages/json/datos.json",function(data){
    let precioDia = data.lugares[1].precio;
    let url = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';

    const api = new XMLHttpRequest();
    api.open('GET', url, true);
    api.send();

    api.onreadystatechange = function(){
        if (this.status == 200 && this.readyState == 4){

            let aUrl = JSON.parse(this.responseText); //Array de Api
            let valorDolar = parseInt(aUrl[0].casa.compra); //Valor del dolar compra
            var precioFinal = valorDolar * precioDia;
      
            document.querySelector("#p2").textContent = "Precio por Dia/Noche $" +precioFinal;
          }
  }

})

$.get("../pages/json/datos.json",function(data){
    let precioDia = data.lugares[2].precio;
    let url = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';

    const api = new XMLHttpRequest();
    api.open('GET', url, true);
    api.send();

    api.onreadystatechange = function(){
        if (this.status == 200 && this.readyState == 4){

            let aUrl = JSON.parse(this.responseText); //Array de Api
            let valorDolar = parseInt(aUrl[0].casa.compra); //Valor del dolar compra
            var precioFinal = valorDolar * precioDia;
      
            document.querySelector("#p3").textContent = "Precio por Dia/Noche $" +precioFinal;
          }
  }

})
