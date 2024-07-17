
const images = [
  'robot/1.png',
  'robot/2.png',
  'robot/3.png',
  'robot/4.png',
  'robot/HeadRobot.png'
];

const RobotBox = document.getElementById('Robot');
let currentIndex = 0;
let computerVersion = true;





// Detecta si el navegador está en modo escritorio

function ComputerVersionCheck() {
  if (window.matchMedia("(min-width: 800px)").matches) {
    computerVersion = true;
  }
  else{
    computerVersion = false;
  }
}

// Llama a la función al cargar la página
ComputerVersionCheck();

// Añade un event listener para detectar cambios en el tamaño de la ventana
window.addEventListener('resize', ComputerVersionCheck);



RobotEyesOpened();



// Movimiento del robot

function RobotEyesOpened() {
    SpriteUpdate(0);

    let numeroAleatorio = Math.random();

    if (numeroAleatorio <0.17){
        setTimeout(Greet, 4000);
    }
    else{
        setTimeout(RobotEyesClosed, 4000);
    }
}

function RobotEyesClosed() {
    SpriteUpdate(1);
    setTimeout(RobotEyesOpened, 100);
}

function Greet(){ //Saludo
    SpriteUpdate(2);

    setTimeout(function() {
        SpriteUpdate(3)
      }, 150);
      setTimeout(function() {
        SpriteUpdate(2)
      }, 300);
      setTimeout(function() {
        SpriteUpdate(3)
      }, 450);
      setTimeout(function() {
        SpriteUpdate(2)
      }, 600);
      setTimeout(function() {
        SpriteUpdate(3)
      }, 750);
      setTimeout(function() {
        SpriteUpdate(2)
      }, 900);

    setTimeout(RobotEyesOpened, 1050);
}

function SpriteUpdate(i){
  if(computerVersion){
    RobotBox.style.backgroundImage = `url('${images[i]}')`;
  }
  else{
    RobotBox.style.backgroundImage = `url('${images[4]}')`;
  }
}




/*
function RobotEyesOpen() {
    RobotBox.style.backgroundImage = `url('${images[currentIndex]}')`;
    currentIndex = (currentIndex + 1) % images.length; // Avanzar al siguiente índice circularmente
}
*/