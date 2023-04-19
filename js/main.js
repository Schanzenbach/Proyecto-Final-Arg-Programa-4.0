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
});

