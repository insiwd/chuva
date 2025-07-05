let canvasElement;
let ctx;

// guardando as particulas nubladas...
let cloudyParticlesList = [];

class CloudyParticle {
  // toda partícula tem posição, velocidade, largura e cor. a particula de clima nublado tem radius em especifico.
  constructor(posX, posY, speed, width, height, color, radius) {
    this.posX = posX;
    this.posY = posY;
    this.speed = speed;
    this.width = width;
    this.height = height;
    this.color = color;
    this.radius = radius;
    
    // opacidade da particula
    this.alpha = 0.05 + Math.random() * 0.1; 
  }

  // desenhando a particula
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.posX, this.posY, this.width, this.height);
  }
}

export function initializeSunParticles(canvasId) {
  canvasElement = document.getElementById(canvasId);
  if (canvasElement) {
    ctx = canvasElement.getContext("2d");
    canvasElement.style.border = "1px dotted rgb(255, 255, 255)";
    canvasElement.style.background = "#5d8884";
  }
  else {
    console.error("Canvas not found")
  }
}

// loop para criar várias particulas
export function createSunParticles(numDrops) {
  if (!ctx || !canvasElement) {
    console.error("Canvas error")
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
    let color = "yellow";

    // criando uma nova particula de sol
    let sunPart = new SunParticle(posX, posY, speed, width, height, color);
    sunParticlesList.push(sunPart);
    sunPart.draw(ctx);
  }
}

// animação das gotas caindo
export function animateSunParticles() {
  let start;

  // função interna de animação
  function animate(time) {
    if (!start) start = time;
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    sunParticlesList.forEach((sunPart) => {
      sunPart.posY += sunPart.speed;
      sunPart.draw(ctx);
      // se a gota sair do canvas, reinicia a posição
      if (sunPart.posY > canvasElement.height) {
        sunPart.posY = 0;
      }
    });
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}


// // chama as gotinhas
// createDrops(30);
// animateDrop()
