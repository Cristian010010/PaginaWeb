let interval = null;

// Función que solo se ejecutará en dispositivos móviles
function executeMobileJS() {
  if (window.matchMedia("(min-width: 1px)").matches) {

    if (!interval) {
      animation();
    }

  }
  else {
    // Limpia el intervalo si el tamaño de la pantalla cambia a más de 800px
    clearInterval(interval);
    interval = null;
  }
}

// Llama a la función cuando la ventana se carga
window.onload = executeMobileJS;

// O bien, escucha el evento resize para ejecutar el código si el tamaño de la ventana cambia
window.onresize = executeMobileJS;



function animation() {

  let animationText = [
      ["P", "e", "r", "s", "i", "s", "t", "e", "n", "t"],
      ["D", "e", "c", "i", "s", "i", "v", "e"],
      ["O", "p", "t", "i", "m", "i", "s", "t", "i", "c"],
      ["P", "e", "r", "f", "e", "c", "t", "i", "o", "n", "i", "s", "t"],
      ["O", "b", "s", "e", "r", "v", "a", "n", "t"],
      ["C", "r", "e", "a", "t", "i", "v", "e"]
  ];

  let LetterCount = -1;
  let ArrayPosition = 0;

  const AdjectivesContainer = document.querySelector(".Adjectives_container");

  function drawText() {
      LetterCount++;
      AdjectivesContainer.innerHTML += animationText[ArrayPosition][LetterCount];

      if (LetterCount === animationText[ArrayPosition].length - 1) {
          clearInterval(interval);

          setTimeout(() => {

              interval = setInterval(() => {
                  AdjectivesContainer.innerHTML = "> ";
                  LetterCount--;
                  animationText[ArrayPosition].pop();
                  animationText[ArrayPosition].forEach((element) => {
                      AdjectivesContainer.innerHTML += element;
                  });

                  if(LetterCount < 0){
                      clearInterval(interval);
                      ArrayPosition++;
                      interval = setInterval(drawText, 150);

                      if(ArrayPosition > animationText.length - 1){
                          clearInterval(interval);
                          ArrayPosition = 0;
                          animation();
                      }
                  }
              }, 150);

          }, 1000);
      }
  }
  interval = setInterval(drawText, 150);
}

// SI hay algún error, el codigo original era lo que hay desde la linea 15 y al final estaba esta línea: window.addEventListener("load", animation);
//También habría que establecer let en la linea 76 a la variable interval