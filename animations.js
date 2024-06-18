

//Animación desvanecimiento de fondo inicial (tanto fondo como logo)

document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('initialLogo');
    const Logo = document.getElementById('Logo');

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