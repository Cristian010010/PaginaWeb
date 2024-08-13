//Funcion correspondiente a imagenes

document.addEventListener("DOMContentLoaded", function() {
    // Seleccionar los elementos por sus IDs
    const animatedSections = [
        document.getElementById('ModelExplorator'),
        document.getElementById('AnimExplorator'),
        document.getElementById('GamesExplorator')
    ];

    // Mantendremos un estado de posición y opacidad para suavizar el movimiento
    const state = animatedSections.map(() => ({
        currentY: 20, // Se refiere a 50vh
        targetY: 20,  // Se refiere a 50vh
        currentOpacity: 0,
        targetOpacity: 0,
    }));

    // Función de interpolación (lerp)
    function lerp(start, end, factor) {
        return start * (1 - factor) + end * factor;
    }

    // Función para manejar el scroll
    function handleScroll() {
        animatedSections.forEach((section, index) => {
            if (section) {
                const rect = section.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                // Calcular el porcentaje de visibilidad del elemento
                // Ajustar el cálculo para que el elemento llegue a su posición final antes de salir
                const elementTop = rect.top;
                const elementBottom = rect.bottom;
                const distanceToTop = windowHeight - elementTop;
                const distanceToBottom = elementBottom - windowHeight;
                const visibilityPercent = Math.min(1, Math.max(0, (distanceToTop - distanceToBottom) / (windowHeight + rect.height)));

                // Actualizar los objetivos de la posición y opacidad
                state[index].targetY = (1 - visibilityPercent) * 20; // Trabajando con 50vh
            }
        });
    }

    // Función para aplicar suavidad en cada frame
    function smoothMove() {
        animatedSections.forEach((section, index) => {
            if (section) {
                // Aplicar interpolación para suavizar, con un factor menor para más suavidad
                state[index].currentY = lerp(state[index].currentY, state[index].targetY, 0.05); // Factor de suavidad reducido
                state[index].currentOpacity = lerp(state[index].currentOpacity, state[index].targetOpacity, 0.05); // Factor de suavidad reducido

                // Aplicar estilos suavizados con vw
                section.style.transform = `translateY(${state[index].currentY}vw)`;
            }
        });

        // Continuar el ciclo de animación
        requestAnimationFrame(smoothMove);
    }

    // Llamar la función handleScroll al hacer scroll
    window.addEventListener('scroll', handleScroll);

    // Ejecutar la función al cargar la página
    handleScroll();

    // Iniciar la animación suave
    smoothMove();
});
