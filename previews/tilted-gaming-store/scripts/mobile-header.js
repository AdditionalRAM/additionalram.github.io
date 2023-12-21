$(document).ready(callOnReady);


function callOnReady() {
    $("#mobile-hamburger").on("click", () => {
        $("#menu-burger-icon").toggleClass("open");
        $("#menu-close-icon").toggleClass("open");

        $("#mobile-nav-menu").toggleClass("open");
    });
}