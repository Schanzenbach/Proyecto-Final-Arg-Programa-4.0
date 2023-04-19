$(document).ready(function() {
    $(".carousel-container").slideUp();
    let placeOne = document.querySelector("#place-one");
    let placeTwo = document.querySelector("#place-two");
    let placeThree = document.querySelector("#place-three");
    
    $("#drop-btn-one").click(function(){
        if (placeOne.classList.contains("up")) {
            $(placeOne).slideDown();
            placeOne.classList.remove("up");
        } else {
            $(placeOne).slideUp();
            placeOne.classList.add("up");
        }
    });
    $("#drop-btn-two").click(function(){
        if (placeTwo.classList.contains("up")) {
            $(placeTwo).slideDown();
            placeTwo.classList.remove("up");
        } else {
            $(placeTwo).slideUp();
            placeTwo.classList.add("up");
        }
    });
    $("#drop-btn-three").click(function(){
        if (placeThree.classList.contains("up")) {
            $(placeThree).slideDown();
            placeThree.classList.remove("up");
        } else {
            $(placeThree).slideUp();
            placeThree.classList.add("up");
        }
    });




    $('#send-btn').click(function(){
        let nombre = $('#nombre').val();
        let apellido = $('#apellido').val();
        let tel = $('#tel').val();
        let options = $('#options-input').val();
        let email = $('#email').val();
        let contacto = document.querySelector('input[name="contacto"]:checked').value;
        console.log(contacto);
        let mensaje = $('#comments').val();
        $.ajax({
            url: 'https://reqres.in/api/users', 
            method: 'POST', 
            data: {
                first_name: nombre,
                last_name: apellido,
                email: email,
                phone_number: tel,
                options: options,
                contact: contacto,
                mensaje: mensaje
            },
            success: function(response) {
                console.log('Éxito:', response);
                alert('¡Mensaje enviado con éxito!');
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
                alert('Error al enviar el mensaje. Por favor inténtelo nuevamente.');
            }
        });
    });

});

