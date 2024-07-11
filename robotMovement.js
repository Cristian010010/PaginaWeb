// Movimiento del robot

const images = [
    'robot/1.png',
    'robot/2.png',
    'robot/3.png',
    'robot/4.png',
];

const RobotBox = document.getElementById('Robot');
let currentIndex = 0;

RobotEyesOpened();

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
    RobotBox.style.backgroundImage = `url('${images[i]}')`;
}




/*
function RobotEyesOpen() {
    RobotBox.style.backgroundImage = `url('${images[currentIndex]}')`;
    currentIndex = (currentIndex + 1) % images.length; // Avanzar al siguiente índice circularmente
}
*/