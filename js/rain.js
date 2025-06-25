let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

class Drop {
  // toda gota tem posição, velocidade, largura e cor
  constructor(posX, posY, speed, width, height, color) {
    this.posX = posX;
    this.posY = posY;
    this.speed = speed;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  // desenhando a gotinha
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.posX, this.posY, this.width, this.height);
  }
}

// guardando as gotinhas
let raindrops = [];

// loop para criar várias gotinhas

function createDrops(numDrops) {
  for(let i = 0; i < numDrops; i++) {

    // posição aleatoria dentro da largura do canvas
    // math.random para deixar o movimento mais suave
    let posX = Math.random() * canvas.width;
    let posY = Math.random() * canvas.height;
    let speed = Math.random() * 3 + 1;
    let width = Math.random() *  2 + 2;
    let height = Math.random() * 5 + 5;
    let color = "blue";

    // criando uma nova gota
    let drop = new Drop(posX, posY, speed, width, height, color);
    raindrops.push(drop);
    drop.draw(ctx)
  }
}

// animação das gotas caindo
function animateDrop() {
  let start;

  // função interna de animação
  function animate(time) {
    if (!start) start = time;

    const slapsedTime = time - start;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    raindrops.forEach(drop => {
      drop.posY += drop.speed;

      drop.draw(ctx)

      // se a gota sair do canvas, reinicia a posição
      if (drop.posY > canvas.height) {
        drop.posY = 0;
      }
    });
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

// canvas style
canvas.style.border = "1px dotted rgb(255, 255, 255)"
canvas.style.background = "#0d1029"

// chama as gotinhas
createDrops(30);
animateDrop()
