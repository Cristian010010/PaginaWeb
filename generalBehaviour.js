
//Constantes

const ContactButton = document.getElementById('ContactButton');
const ContactSection = document.getElementById('ContactSection');
const overlay = document.getElementById('initialLogo');
const Logo = document.getElementById('Logo');
const EmptyWindow = document.getElementById('EmptyWindow');
const AnimationsSection = document.getElementById('AnimationWindow');
const Gallery = document.getElementById('Gallery');


//Variables

let sectionHeight, viewportHeight, topOculto, topVisible, TopVisibleCheck;


//Animación desvanecimiento de fondo inicial (tanto fondo como logo)

document.addEventListener('DOMContentLoaded', function() {
    
    GalleryIsUsed();

    ContactSection.classList.add('ContactoOculto');

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




//Pasamos la pulsacion a las capas inferiores para detectar si estamos pulsando encima de un videojuego antes de que la seccion superior se haya cerrado del todo

document.getElementById('EmptyWindow').addEventListener('click', (e) => {
    const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        clientX: e.clientX, // Mantener la posición del clic
        clientY: e.clientY
    });

    document.getElementById('BackGallery').dispatchEvent(clickEvent);
});

document.getElementById('BackGallery').addEventListener('click', (e) => {
    const container = document.querySelector('#BackGallery');
    const clickX = e.clientX;
    const clickY = e.clientY;

    // Obtener todos los enlaces <a> dentro de #BackGallery
    const links = container.querySelectorAll('a');

    // Verificar si el clic ocurrió dentro de alguno de los enlaces
    for (let link of links) {
        const rect = link.getBoundingClientRect();  // Obtener las dimensiones del enlace

        // Comprobar si las coordenadas del clic están dentro de las dimensiones del enlace
        if (clickX >= rect.left && clickX <= rect.right && clickY >= rect.top && clickY <= rect.bottom) {
            // Si el clic está dentro de un enlace, redirigir el clic al enlace
            console.log("Clic dentro del enlace:", link);
            link.dispatchEvent(new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                clientX: clickX,
                clientY: clickY
            }));
            return;  // Salir del bucle después de hacer clic en el enlace
        }
    }

    // Si el clic no fue dentro de ningún enlace
    console.log("Clic fuera de los enlaces");
});





//DETECCIÓN DE SCROLL, LO MÁS SIMILAR A UN UPDATE

window.addEventListener('scroll', function() {
    GalleryIsUsed();
});


//----------------------------------------------------------------------------------------------------------------------------------------

// Detectamos en todo momento cual es el centro de la pantalla para la seccion de contacto teniendo en cuenta su altura dinamica

//----------------------------------------------------------------------------------------------------------------------------------------

// Función para calcular posiciones
function calcularPosiciones() {
    TopVisibleCheck = topVisible;

    sectionHeight = ContactSection.offsetHeight;
    viewportHeight = window.innerHeight;

    topOculto = -sectionHeight + 'px';
    topVisible = ((viewportHeight - sectionHeight) / 2) + 'px';

    if(ContactSection.style.top === TopVisibleCheck){ //Aseguramos que escale cuando la sección está abierta y se redimensiona la pantalla
        ContactSection.style.top = topVisible;
    }
}

// Esperamos a que cargue la página
window.addEventListener('load', function () {
    if (!ContactSection || !ContactButton) {
        console.error('No se encontraron los elementos necesarios en el DOM.');
        return;
    }

    calcularPosiciones();

    // Establecer el top inicial a oculto
    ContactSection.style.top = topOculto;
});

// Actualizamos las posiciones en cada redimensionamiento
window.addEventListener('resize', calcularPosiciones);

// Agregamos el evento al botón
ContactButton.addEventListener('click', function (e) {
    e.preventDefault(); // Evitar el comportamiento por defecto del enlace

    if (ContactSection.style.top === topOculto) {
        ContactSection.style.top = topVisible; // Muestra la sección centrada
    } else {
        ContactSection.style.top = topOculto; // Oculta la sección
    }
});

//----------------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------------------------

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
        section.classList.remove('ContactoVisible');
        section.classList.add('ContactoOculto');
    }
}

//Comprobamos si la galería es completamente visible, es decir, si la sección anterior no se vé

//NOTA: La solución para que podamos movernos libremente por la galería ha sido eliminar el display de la EmptyWindow para que la galería ocupe su lugar.

function GalleryIsUsed(){
    var bounds = AnimationsSection.getBoundingClientRect();

    if (bounds.bottom < 0) {
        Gallery.classList.remove('HiddenGallery');
        Gallery.classList.add('OpenedGallery');
        EmptyWindow.style.display = 'none';
        console.log("Galeria abierta");
    } else {
        Gallery.classList.remove('OpenedGallery');
        Gallery.classList.add('HiddenGallery');
        EmptyWindow.style.display = 'flex';
    }

}

//Descargar un archivo

function descargarArchivo() {
    // URL del archivo que deseas descargar
    const url = 'cv/CV.pdf'; // Cambia la ruta a tu archivo

    // Crear un enlace invisible
    const link = document.createElement('a');
    link.href = url;
    link.download = 'CV_CristianHernándezDelgado.pdf'; // Nombre del archivo a descargar

    // Agregar el enlace al cuerpo del documento
    document.body.appendChild(link);

    // Simular el clic en el enlace para iniciar la descarga
    link.click();

    // Eliminar el enlace del cuerpo del documento después de la descarga
    document.body.removeChild(link);
}

//Cerrar secciones

function ContactClose() {
    ContactButton.click();
}


//funcion para chequear el contacto de los elementos de la pagina web

function IsTouching() {
    console.log('esta tocando');
}