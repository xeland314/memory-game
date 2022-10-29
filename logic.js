class TableroDeJuego {

    #iconos = [];
    #selecciones = [];
    #numeroDeTarjetas;
    #numeroDeIntentos = 0;
    #paresEncontrados = 0;

    constructor(numeroDeTarjetas = 12) {
        this.#numeroDeTarjetas = numeroDeTarjetas;
    }

    #cargarIconos() {
        this.#iconos = [
            '<i class="fas fa-star"></i>',
            '<i class="far fa-star"></i>',
            '<i class="fas fa-chess"></i>',
            '<i class="fas fa-dice-d20"></i>',
            '<i class="fas fa-star-of-life"></i>',
            '<i class="fas fa-star-and-crescent"></i>',
            '<i class="fab fa-old-republic"></i>',
            '<i class="fab fa-galactic-republic"></i>',
            '<i class="fas fa-sun"></i>',
            '<i class="fas fa-stroopwafel"></i>',
            '<i class="fas fa-dice"></i>',
            '<i class="fas fa-chess-knight"></i>',
        ]
    }

    generarTablero() {
        this.#resetNumeroDeIntentos();
        this.#resetParesEncontrados();
        this.#cargarIconos();
        this.#selecciones = [];
        let tablero = document.getElementById("tablero");
        let tarjetas = [];
        for (let n = 0; n < this.#numeroDeTarjetas; n++) {
            tarjetas.push(`
                    <div class="tarjeta-container" onclick="tableroDeJuego.seleccionarTarjeta(${n})">
                        <div class="tarjeta" id="tarjeta${n}">
                            <div class="cara-posterior" id="cara-posterior${n}">
                                ${this.#iconos[0]}
                            </div>
                            <div class="cara-frontal">
                                <i class="far fa-question-circle"></i>
                            </div>
                        </div>
                    </div>        
                    `)
            if (n % 2 == 1) {
                this.#iconos.splice(0, 1);
            }
        }
        tarjetas.sort(() => Math.random() - 0.5);
        tablero.innerHTML = tarjetas.join(" ");
    }

    seleccionarTarjeta(i) {
        let tarjeta = document.getElementById("tarjeta" + i);
        if (tarjeta.style.transform != "rotateY(180deg)") {
            tarjeta.style.transform = "rotateY(180deg)";
            this.#selecciones.push(i);
        }
        if (this.#selecciones.length == 2) {
            this.#deseleccionar(this.#selecciones);
            this.#selecciones = [];
        }
    }

    #deseleccionar(selecciones) {
        setTimeout(() => {
            let caraPosterior1 = document.getElementById("cara-posterior" + selecciones[0]);
            let caraPosterior2 = document.getElementById("cara-posterior" + selecciones[1]);
            if (caraPosterior1.innerHTML != caraPosterior2.innerHTML) {
                let tarjeta1 = document.getElementById("tarjeta" + selecciones[0]);
                let tarjeta2 = document.getElementById("tarjeta" + selecciones[1]);
                tarjeta1.style.transform = "rotateY(0deg)";
                tarjeta2.style.transform = "rotateY(0deg)";
                this.#aumentarNumeroDeIntentos();
            } else {
                caraPosterior1.style.background = "plum";
                caraPosterior2.style.background = "plum";
                this.#aumentarNumeroDeIntentos();
                this.#aumentarParesEncontrados();
                this.#elJuegoHaFinalizado();
            }
        }, 500);
    }

    #elJuegoHaFinalizado() {
        let pares = this.#numeroDeTarjetas / 2;
        if(pares === this.#paresEncontrados) {
            let alertText = "El juego ha finalizado.\n\n";
            alertText += "Intentos realizados: ";
            alertText += this.#numeroDeIntentos;
            alert(alertText);
        }
    }

    #aumentarParesEncontrados() {
        let pares = document.getElementById("pares");
        this.#paresEncontrados += 1;
        pares.innerText = this.#paresEncontrados;
    }

    #resetParesEncontrados() {
        let pares = document.getElementById("pares");
        this.#paresEncontrados = 0;
        pares.innerText = this.#paresEncontrados;
    }

    #aumentarNumeroDeIntentos() {
        let puntuacion = document.getElementById("intentos");
        this.#numeroDeIntentos += 1;
        puntuacion.innerText = this.#numeroDeIntentos;
    }

    #resetNumeroDeIntentos() {
        let puntuacion = document.getElementById("intentos");
        this.#numeroDeIntentos = 0;
        puntuacion.innerText = this.#numeroDeIntentos;
    }

}

class CreadorDeTableros {

    crearJuegoFacil() {
        return new TableroDeJuego(12);
    }

    crearJuegoNormal() {
        return new TableroDeJuego(18);
    }

    crearJuegoDificil() {
        return new TableroDeJuego(24);
    }
}

const creadorDeTableros = new CreadorDeTableros();
var tableroDeJuego = creadorDeTableros.crearJuegoNormal();

function setJuegoFacil() {
    tableroDeJuego = creadorDeTableros.crearJuegoFacil();
    tableroDeJuego.generarTablero();
}

function setJuegoNormal() {
    tableroDeJuego = creadorDeTableros.crearJuegoNormal();
    tableroDeJuego.generarTablero();
}

function setJuegoDificil() {
    tableroDeJuego = creadorDeTableros.crearJuegoDificil();
    tableroDeJuego.generarTablero();
}
