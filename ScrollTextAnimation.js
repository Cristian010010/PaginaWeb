let paragraphs = [...document.querySelectorAll('.TextReader')];
let spans = [];

// Envolver cada carácter en un span, preservando los espacios
paragraphs.forEach(paragraph => {
    let htmlString = '';
    let pArray = paragraph.textContent.split('');
    pArray.forEach(char => {
        // Asegurar que los espacios se mantienen correctamente
        if (char === ' ') {
            htmlString += `<span style="white-space: pre;">${char}</span>`;
        } else {
            htmlString += `<span>${char}</span>`;
        }
    });
    paragraph.innerHTML = htmlString;
});

spans = [...document.querySelectorAll('.TextReader span')];

function revealSpans() {
    const scrollThreshold = window.innerHeight * 0.3; // Ajusta este valor para hacer que el efecto ocurra a una altura menor

    for (let i = 0; i < spans.length; i++) {
        const rect = spans[i].getBoundingClientRect();
        const spanTop = rect.top;

        // Calcular la opacidad según la posición del span en la pantalla
        if (spanTop < window.innerHeight - scrollThreshold) {
            // La opacidad se convierte en completa cuando está dentro del umbral
            spans[i].style.opacity = '1';
        } else {
            // La opacidad se convierte en mínima cuando está fuera del umbral
            spans[i].style.opacity = '0.5';
        }
    }
}

// Ejecutar la función en scroll y al cargar la página
window.addEventListener('scroll', revealSpans);
revealSpans();