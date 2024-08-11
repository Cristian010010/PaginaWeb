//Script que oculta la barra superior mientras se escrollea hacia abajo

let prevScrollPos = window.scrollY;
const barra = document.getElementById("barraSuperior");

window.onscroll = function() {
    let currentScrollPos = window.scrollY;
    if (prevScrollPos > currentScrollPos) {
        barra.style.top = "0"; // Mostrar la barra
    } else {
        barra.style.top = "-10vh"; // Ocultar la barra
    }
    prevScrollPos = currentScrollPos;
}