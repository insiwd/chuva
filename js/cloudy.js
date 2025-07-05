let canvasElement;
let ctx;

// guardando as particulas nubladas...
let cloudyParticlesList = [];

class CloudyParticle {
  // toda partícula tem posição, velocidade, largura e cor. a particula de clima nublado tem radius em especifico.
  constructor(posX, posY, speed, color, radius) {
    this.posX = posX;
    this.posY = posY;
    this.speed = speed;
    this.color = color;
    this.radius = radius;
    
    // opacidade da particula
    // this.alpha = 0.05 + Math.random() * 0.1; 
    // velocidade do fade
    this.fadeSpeed = (Math.random() * 0.0005) + 0.0001;
    this.direction = (Math.random() > 0.5 ? 1 : -1);
  }

  // desenhando a particula
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}

export function initializeCloudyParticles(canvasId) {
  canvasElement = document.getElementById(canvasId);
  if (canvasElement) {
    ctx = canvasElement.getContext("2d");
    canvasElement.style.border = "1px dotted rgb(255, 255, 255)";
    canvasElement.style.background = "#122534";
  }
  else {
    console.error("Canvas not found")
  }
}

// loop para criar várias particulas
export function createCloudyParticles(numDrops) {
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
    let width = Math.random() * 20 + 20;
    let height = Math.random() * 20 + 20;
    let color = `hsl(0, 0%, ${Math.random() * 30 + 70}%)`;
    let radius = Math.random() * 10;

    // criando uma nova particula de sol
    let cloudPart = new CloudyParticle(posX, posY, speed, color, radius);
    cloudyParticlesList.push(cloudPart);
    cloudPart.draw(ctx);
  }
}

// animação das gotas caindo
export function animateCloudyParticles() {
  let start;

  // função interna de animação
  function animate(time) {
    if (!start) start = time;
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    cloudyParticlesList.forEach((cloudPart) => {
      cloudPart.posY += cloudPart.speed;
      cloudPart.draw(ctx);
      // se a gota sair do canvas, reinicia a posição
      if (cloudPart.posY > canvasElement.height) {
        cloudPart.posY = 0;
      }
    });
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}