//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200
let diametro = 25
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis do oponente
let xRaqueteOponente = 585
let yRaqueteOponente = 150
let velocidadeYOponente;

//placar do jogo
let meusPontos = 0
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("Trap Beat.wav");
  ponto = loadSound ("ponto.wav");
  raquetada = loadSound ("raquetada.wav");
}

let colidiu = false;
let chanceDeErrar = 0;


function setup() {
  createCanvas(600,400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda ();
  mostraRaquete (xRaquete, yRaquete);
  movimentaMinhaRaquete ();
  //verificaColisaoRaquete ();
  verificaColisaoRaquete (xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  //movimentaRaqueteOponente();
  movimentaRaqueteOponenteComputador();
  calculaChanceDeErrar();
  verificaColisaoRaquete (xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto ();
  bolinhaNaoFicaPresa();
  }  

function mostraBolinha (){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha (){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda (){
if (xBolinha + raio > width ||
    xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height ||
      yBolinha - raio < 0){
      velocidadeYBolinha *= -1;
  }
}

function mostraRaquete (x,y){
  fill (200,500,700);
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown (87)){
    yRaquete -= 10;
    yRaquete = constrain(yRaquete,10,310)
  }
  if(keyIsDown (83)){
   yRaquete += 10;
   yRaquete = constrain(yRaquete,10,310);
}
} 

function verificaColisaoRaquete (){
 if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){ velocidadeXBolinha *= -1;}
}
  
function verificaColisaoRaquete (x,y){
  colidiu =
  collideRectCircle (x,y, raqueteComprimento,raqueteAltura,xBolinha ,yBolinha,raio);
  if (colidiu){velocidadeXBolinha *= -1;
  raquetada.play();            
    }
}

function movimentaRaqueteOponente(){
  if (keyIsDown (UP_ARROW)){
    yRaqueteOponente -= 10;
    yRaqueteOponente = constrain(yRaqueteOponente,10,310)
  }
  if(keyIsDown (DOWN_ARROW)){
   yRaqueteOponente += 10;
   yRaqueteOponente = constrain(yRaqueteOponente,10,310);
}
}

function movimentaRaqueteOponenteComputador(){
 velocidadeYOponente = yBolinha - yRaqueteOponente -  raqueteComprimento / 2 - 30 ;
  yRaqueteOponente += velocidadeYOponente - raqueteAltura/4 - chanceDeErrar 
  calculaChanceDeErrar ();
  yRaqueteOponente = constrain(yRaqueteOponente,10, 310)
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}


function incluiPlacar(){
  stroke(255);
  text(CENTER);
  textSize(16);
  fill(color(255,140,0))
  rect(150,10,40,20);
  fill(255);
  text(meusPontos,165,26)
  fill(color(255,140,0))
  rect(450,10,40,20);
  fill(255);
  text(pontosDoOponente,465,26)
}

function marcaPonto() {
    if (xBolinha > 582) {
        meusPontos += 1;
    ponto.play();
    }
    if (xBolinha < 17) {
        pontosDoOponente += 1;
    ponto.play();
    }
}


function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    XBolinha = 23
    }
}