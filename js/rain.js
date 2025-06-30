let canvasElement;
let ctx;

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

export function initializeRainCanvas(canvasId) {
  canvasElement = document.getElementById(canvasId);
  if (canvasElement) {
    ctx = canvasElement.getContext("2d");
    canvasElement.style.border = "1px dotted rgb(255, 255, 255)";
    canvasElement.style.background = "#0d1029";
  }
  else {
    console.error("Canvas not found")
  }
}

// loop para criar várias gotinhas
export function createDrops(numDrops) {

  if (!ctx || !canvasElement) {
    console,error("Canvas error")
    return;
  }


  for (let i = 0; i < numDrops; i++) {
    // posição aleatoria dentro da largura do canvas
    // math.random para deixar o movimento mais suave
    let posX = Math.random() * canvasElement.width;
    let posY = Math.random() * canvasElement.height;
    let speed = Math.random() * 3 + 1;
    let width = Math.random() * 2 + 2;
    let height = Math.random() * 5 + 5;
    let color = "blue";

    // criando uma nova gota
    let drop = new Drop(posX, posY, speed, width, height, color);
    raindrops.push(drop);
    drop.draw(ctx);
  }
}

// animação das gotas caindo
export function animateDrop() {
  let start;

  // função interna de animação
  function animate(time) {
    if (!start) start = time;
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    raindrops.forEach((drop) => {
      drop.posY += drop.speed;
      drop.draw(ctx);
      // se a gota sair do canvas, reinicia a posição
      if (drop.posY > canvasElement.height) {
        drop.posY = 0;
      }
    });
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}


// // chama as gotinhas
// createDrops(30);
// animateDrop()
