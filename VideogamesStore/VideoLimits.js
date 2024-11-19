window.addEventListener('load', () => {
    // Obtén las secciones
    const videoSection = document.getElementById('VideoSection');
    const videoBoundries = document.querySelectorAll('.VideoBoundry');

    // Obtén el contenedor principal
    const mainSection = document.getElementById('MainSection');

    // Calcula el ancho en porcentaje de VideoSection con respecto al contenedor
    const videoSectionWidthPercentage = (videoSection.offsetWidth / mainSection.offsetWidth) * 100;

    // Calcula el ancho de VideoBoundry como el 50% del espacio restante
    const videoBoundryWidthPercentage = (100 - videoSectionWidthPercentage) / 2;

    // Establece el ancho calculado en porcentaje a todas las secciones laterales
    videoBoundries.forEach(videoBoundry => {
        videoBoundry.style.width = `${videoBoundryWidthPercentage}%`;
    });
});