let figuras = [];
let distanciaEntreFiguras = 50; // distancia fija entre las figuras
let escalaMinima = 0.5; // escala mínima de las figuras
let escalaMaxima = 2; // escala máxima de las figuras

let formaActual = "circulo";

let angle = 0; // VARIABLE QUE SERVIRÁ PARA DEFINIR EL ÁNGULO DE ROTACIÓN DE LAS FIGURAS


function setup() {
  createCanvas(windowWidth, windowHeight);
   // LAS FIGURAS TIENEN COMO PUNTO DE ORIGEN SU CENTRO


   


  // Creamos la primera y última figura con tamaños definidos
  let primeraFigura = new Figura(0, 0, 30);
  let ultimaFigura = new Figura(0, 0, 60);

  // Calculamos la escala máxima y mínima de las figuras intermedias
  let escalaMinimaIntermedia = escalaMinima * primeraFigura.size / ultimaFigura.size;
  let escalaMaximaIntermedia = escalaMaxima * primeraFigura.size / ultimaFigura.size;

  // Creamos las figuras intermedias con una escala que varía entre la mínima y máxima calculadas
  for(let i = 1; i < 20; i++) {
    let escalaIntermedia = map(i, 1, 20, escalaMinimaIntermedia, escalaMaximaIntermedia);
    let nuevaFigura = new Figura(0, 0, primeraFigura.size * escalaIntermedia * i);
    figuras.push(nuevaFigura);
  }

  rectMode( CENTER );
  // ANGULO EN GRADOS
  angleMode( DEGREES );
  frameRate( 60 ); // DEFINO UN NUMERO ESTABLECIDO DE FOTOGRAMAS

 
}

function draw() {
  background(220);
  translate(width/2, height/2);
  for(let i = 0; i < figuras.length; i++) {
    figuras[i].update(mouseY);
    figuras[i].display(i, figuras.length);
  }
}


function keyPressed() {
  if (key == "1") { // Tecla 1
    formaActual = "cuadrado";
  } else if (key == "2") { // Tecla 2
    formaActual = "circulo";
  } else if (key == "3") { // Tecla 3
    formaActual = "triangulo";
  } else if (key == "4") { // Tecla 3
    formaActual = "pentagono";
  }
}


class Figura {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.originalSize = size;
  }

  update(mouseY) {
    // cambiamos el tamaño de la figura basado en la posición del mouse en el eje Y
    let escala = map(mouseY, 0, height, escalaMinima, escalaMaxima);
    this.size = this.originalSize * escala;
  }

  display(indice, cantidad) {
    // calculamos el valor de transparencia de la figura
    let transparencia = map(indice, 0, cantidad-1, 255, 0);
    let colorDeFondo = color(80, 150, 200, transparencia);
    let colorDeBorde = lerpColor(colorDeFondo, color(255), 0.5);

    // dibujamos la figura con el gradiente de color cele
  // dibujamos la figura con el gradiente de color celeste
  noStroke();
  fill(colorDeFondo);
  ellipseMode(CENTER);
  
  
  
  switch (formaActual) {
    case "cuadrado":
      rotate(angle + 5 * (width/2 +- mouseX) / width)
      rectMode(CENTER);
      rect(this.x, this.y, this.size, this.size);
      break;
    case "circulo":
      rotate(angle + 5 * (width/2 +- mouseX) / width)
      ellipseMode(CENTER);
      ellipse(this.x, this.y, this.size, this.size + 150);
      break;
    case "triangulo":
      rotate(angle + 5 * (width/2 +- mouseX) / width)
      
      triangle(this.x, this.y - this.size / 2, this.x - this.size / 2, this.y + (this.size +15) / 2, this.x + this.size / 2, this.y + (this.size +15) / 2);
      break;

      case "pentagono":
        rotate(angle + 5 * (width/2 +- mouseX) / width)

        beginShape();
        let radio = 500 / 2;
        for (let i = 0; i < 5; i++) {
          let angulo = 100  * i - HALF_PI;
          let x = this.x + cos(angulo) * radio;
          let y = this.y + sin(angulo) * radio;
          vertex(x, y);
        }
        endShape(CLOSE);
        break;  
      }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}