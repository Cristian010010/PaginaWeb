
//Constantes

const ContactButton = document.getElementById('ContactButton');
const ContactSection = document.getElementById('ContactSection');
const overlay = document.getElementById('initialLogo');
const Logo = document.getElementById('Logo');


//Animación desvanecimiento de fondo inicial (tanto fondo como logo)

document.addEventListener('DOMContentLoaded', function() {
    

    ContactSection.classList.add('oculto');

    //Espera medio segundo para fade in de logo
    setTimeout(() => {
        Logo.style.opacity = '1';
    }, 100);

    // Esperar 2 segundos antes de iniciar el fade out de ambos
    setTimeout(() => {
        overlay.style.opacity = '0';

        // Removemos el objeto que cubre la pantalla después de terminar de usarlo
        overlay.addEventListener('transitionend', () => {
            Logo.style.display = 'none';
            overlay.style.display = 'none';
        });
    }, 1500); // Ajusta el tiempo de retraso según sea necesario
});


// Hacemos visible la sección de contacto

ContactButton.addEventListener('click', function(e) {
    e.preventDefault(); // Evitar el comportamiento por defecto del enlace

    // Mostrar la sección final
    ContactSection.style.opacity = '1';
    ContactSection.style.pointerEvents = 'auto'; // Permitir interacción con la sección
    ContactSection.classList.remove('oculto');
    ContactSection.classList.add('visible');

    // Desplazar la página hacia abajo para mostrar la sección final
    window.scrollTo({
        top: ContactSection.offsetTop,
        behavior: 'smooth'
    });

    //Tiempo hasta que se comprueba si la sección está oculta, este tiempo se utiliza para que no detecte que no se vé en pantalla antes de terminar el scroll

    setTimeout(() => {
        CheckVisibility(ContactSection);
    }, 3000); // Ajusta el tiempo de retraso según sea necesario

});

//Comprobamos si la sección sigue siendo visible

function CheckVisibility(section) {
    var rect = section.getBoundingClientRect();
    var windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // Verificar si la sección está visible en la ventana actual, se compara rect.top por abajo también porque queremos que hasta que no salga completamente de pantalla no se elimine
    if (rect.top >= 0 && rect.top <= windowHeight) {
        // La sección sigue visible, continuar comprobando
        setTimeout(() => {
            CheckVisibility(section);
        }, 100); // Verificar nuevamente después de 1 segundo
    } else {
        // La sección no está visible, ocultarla
        section.classList.remove('visible');
        section.classList.add('oculto');
    }
}