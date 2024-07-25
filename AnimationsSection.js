const videos = [
    'Content/Animations/Bolera.mp4',
    'Content/Animations/LastBorder.mp4',
    'Content/Animations/Aros.mp4',
    'Content/Animations/Teatro.mp4',
  ];

function Animations(num) {

    if (num < 0 || num >= videos.length) {
        console.error("Índice de video no válido");
        return;
    }

    var videoElement = document.createElement('video');
    videoElement.controls = true;

    var source = document.createElement('source');
    source.src = videos[num]; // Reemplaza con la URL de tu video
    source.type = 'video/mp4';
    videoElement.appendChild(source);

    // Agregar el video al body
    document.body.appendChild(videoElement);

    // Agregar el overlay al body
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'block';

    // Función para manejar la salida de pantalla completa
    function onFullscreenChange() {
        if (!document.fullscreenElement) {
            videoElement.classList.add('video-centered');
            overlay.style.display = 'block';
        } else {
            videoElement.classList.remove('video-centered');
            overlay.style.display = 'none';
        }
    }

    // Solicitar pantalla completa
    function enterFullscreen() {
        if (videoElement.requestFullscreen) {
            videoElement.requestFullscreen();
        } else if (videoElement.mozRequestFullScreen) { // Firefox
            videoElement.mozRequestFullScreen();
        } else if (videoElement.webkitRequestFullscreen) { // Chrome, Safari y Opera
            videoElement.webkitRequestFullscreen();
        } else if (videoElement.msRequestFullscreen) { // IE/Edge
            videoElement.msRequestFullscreen();
        }
    }

    // Manejar salida de pantalla completa
    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('mozfullscreenchange', onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange);
    document.addEventListener('msfullscreenchange', onFullscreenChange);

    // Iniciar reproducción y entrar en pantalla completa
    videoElement.play();
    enterFullscreen();

    // Función para limpiar el video y eventos

    function cleanUp() {
        overlay.style.display = 'none';
        videoElement.classList.remove('video-centered');

        // Eliminar el video solo si sigue siendo hijo del body
        if (document.body.contains(videoElement)) {
            document.body.removeChild(videoElement);
        }

        // Remover eventos
        document.removeEventListener('fullscreenchange', onFullscreenChange);
        document.removeEventListener('mozfullscreenchange', onFullscreenChange);
        document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
        document.removeEventListener('msfullscreenchange', onFullscreenChange);
    }

    // Manejar el cierre del video
    overlay.addEventListener('click', cleanUp);

    videoElement.addEventListener('ended', cleanUp);
};
