import { Component, Input, OnInit, ViewChild } from '@angular/core';
import * as confetti from 'canvas-confetti';

interface balotas {
  numero: number;
  estado: boolean;
  letra: string;
}

interface GameMode {
  name: string;
  id: number;
}

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css'],
})
export class TableroComponent implements OnInit {
  balotas: balotas[] = [];
  letters: string[] = [];
  classBingo: string;
  hidenBingo: boolean;
  blockButton: boolean;
  soundBalls: any;
  soundSuspense: any;
  soundBingo: any;
  soundFail: any;
  soundTransition: any;
  @Input() gameMode: any;
  imgMode: string;

  constructor() {
    for (let i = 1; i <= 75; i++) {
      this.balotas.push({ numero: i, estado: false, letra: this.getLetter(i) });
    }
    this.classBingo = 'animate__animated animate__pulse animate__infinite';
    this.blockButton = false;
    this.letters = ['B', 'I', 'N', 'G', 'O'];

    this.imgMode =
      localStorage.getItem('img') || 'https://i.ibb.co/7S85XhZ/inter-Logo.jpg';
    this.hidenBingo = false;
    this.soundBalls = new Audio('../../../assets/sounds/spin.mp3');
    this.soundSuspense = new Audio('../../../assets/sounds/suspense.mp3');
    this.soundBingo = new Audio('../../../assets/sounds/bingo.mp3');
    this.soundTransition = new Audio('../../../assets/sounds/transition.mp3');
    this.soundFail = new Audio('../../../assets/sounds/fail.mp3');
  }

  printBalotas() {
    const b = document.getElementById('b');
    const i = document.getElementById('i');
    const n = document.getElementById('n');
    const g = document.getElementById('g');
    const o = document.getElementById('o');
    const style = `style="border-radius:300px;background-color: white;height: 40px;width: 40px; font-size: 20px; font-weight: bold; text-align: center; line-height: 40px;"`;
    const classBalota = ` class="balota center-align animate__animated animate__pulse animate__infinite"`;
    this.balotas.forEach((balota) => {
      if (b && i && n && g && o) {
        if (balota.numero >= 1 && balota.numero <= 15) {
          b.innerHTML += `<td><div ${style}  id="b${balota.numero}" ${classBalota} >${balota.numero}</div></td>`;
        }
        if (balota.numero >= 16 && balota.numero <= 30) {
          i.innerHTML += `<td><div ${style}  id="b${balota.numero}" ${classBalota} >${balota.numero}</div></td>`;
        }
        if (balota.numero >= 31 && balota.numero <= 45) {
          n.innerHTML += `<td><div ${style}  id="b${balota.numero}" ${classBalota} >${balota.numero}</div></td>`;
        }
        if (balota.numero >= 46 && balota.numero <= 60) {
          g.innerHTML += `<td><div ${style}  id="b${balota.numero}" ${classBalota} >${balota.numero}</div></td>`;
        }
        if (balota.numero >= 61 && balota.numero <= 75) {
          o.innerHTML += `<td><div ${style}  id="b${balota.numero}" ${classBalota} >${balota.numero}</div></td>`;
        }
      }
    });
  }

  getLetter(number: number): string {
    if (number >= 1 && number <= 15) {
      return 'B';
    }
    if (number >= 16 && number <= 30) {
      return 'I';
    }
    if (number >= 31 && number <= 45) {
      return 'N';
    }
    if (number >= 46 && number <= 60) {
      return 'G';
    }
    if (number >= 61 && number <= 75) {
      return 'O';
    }
    return '';
  }

  spin() {
    this.blockButton = true;

    // this.soundBalls.play(); comezar este audio desde el inicio
    this.soundBalls.currentTime = 0;
    this.soundBalls.play();

    this.balotas.forEach((balota) => {
      const balotaElement = document.getElementById(`b${balota.numero}`);
      if (balotaElement) {
        balotaElement.style.backgroundColor = 'yellow';
        balotaElement.classList.remove('animate__pulse');
        balotaElement.classList.add('animate__swing');
      }
    });
    setTimeout(() => {
      this.selectBalota();
      this.balotas.forEach((balota) => {
        const balotaElement = document.getElementById(`b${balota.numero}`);
        if (balotaElement) {
          balotaElement.classList.remove('animate__swing');
          balotaElement.classList.add('animate__pulse');
          this.blockButton = false;
          balotaElement.style.backgroundColor = 'white';
          this.soundBalls.pause();
        }
      });
    }, 3000);
  }

  selectBalota() {
    if (this.gameMode.id == 1) {
      const balota =
        this.balotas[Math.floor(Math.random() * this.balotas.length)];
      const balotaElement = document.getElementById(`b${balota.numero}`);
      this.balotas = this.balotas.filter((b) => b.numero !== balota.numero);
      if (balotaElement) {
        balotaElement.style.backgroundColor = 'green';
        balotaElement.style.color = 'white';
        balotaElement.style.fontSize = '20px';
        balotaElement.style.fontWeight = 'bold';
        balotaElement.classList.remove('animate__swing');
        balotaElement.classList.remove('animate__pulse');
      }
    } else if (this.gameMode.id == 2) {
      this.balotas.forEach((balota) => {
        const balotaElement = document.getElementById(`b${balota.numero}`);
        if (balotaElement) {
          if (
            balota.letra == 'I' ||
            balota.letra == 'N' ||
            balota.letra == 'G'
          ) {
            balotaElement.style.backgroundColor = 'red';
            balotaElement.style.color = 'red';
            balotaElement.classList.remove('animate__swing');
            balotaElement.classList.add('animate__pulse');
          }
        }
      });
      this.balotas = this.balotas.filter(
        (b) => b.letra !== 'I' && b.letra !== 'N' && b.letra !== 'G'
      );
      const balota2 =
        this.balotas[Math.floor(Math.random() * this.balotas.length)];
      const balotaElement2 = document.getElementById(`b${balota2.numero}`);
      this.balotas = this.balotas.filter((b) => b.numero !== balota2.numero);
      if (balotaElement2) {
        balotaElement2.style.backgroundColor = 'green';
        balotaElement2.style.color = 'white';
        balotaElement2.style.fontSize = '20px';
        balotaElement2.style.fontWeight = 'bold';
      }
    } else if (this.gameMode.id == 3) {
      this.balotas.forEach((balota) => {
        const balotaElement = document.getElementById(`b${balota.numero}`);
        if (balotaElement) {
          if (balota.letra == 'I' || balota.letra == 'G') {
            balotaElement.style.backgroundColor = 'red';
            balotaElement.style.color = 'red';
            balotaElement.classList.remove('animate__swing');
            balotaElement.classList.add('animate__pulse');
          }
        }
      });
      this.balotas = this.balotas.filter(
        (b) => b.letra !== 'I' && b.letra !== 'G'
      );
      const balota3 =
        this.balotas[Math.floor(Math.random() * this.balotas.length)];
      const balotaElement3 = document.getElementById(`b${balota3.numero}`);
      this.balotas = this.balotas.filter((b) => b.numero !== balota3.numero);
      if (balotaElement3) {
        balotaElement3.style.backgroundColor = 'green';
        balotaElement3.style.color = 'white';
        balotaElement3.style.fontSize = '20px';
        balotaElement3.style.fontWeight = 'bold';
      }
    } else if (this.gameMode.id == 4) {
      this.balotas.forEach((balota) => {
        const balotaElement = document.getElementById(`b${balota.numero}`);
        if (balotaElement) {
          if (
            balota.letra == 'I' ||
            balota.letra == 'N' ||
            balota.letra == 'G' ||
            balota.letra == 'O'
          ) {
            balotaElement.style.backgroundColor = 'red';
            balotaElement.style.color = 'red';
            balotaElement.classList.remove('animate__swing');
            balotaElement.classList.add('animate__pulse');
          }
        }
      });
      this.balotas = this.balotas.filter(
        (b) =>
          b.letra !== 'I' &&
          b.letra !== 'N' &&
          b.letra !== 'G' &&
          b.letra !== 'O'
      );
      const balota4 =
        this.balotas[Math.floor(Math.random() * this.balotas.length)];
      const balotaElement4 = document.getElementById(`b${balota4.numero}`);
      this.balotas = this.balotas.filter((b) => b.numero !== balota4.numero);
      if (balotaElement4) {
        balotaElement4.style.backgroundColor = 'green';
        balotaElement4.style.color = 'white';
        balotaElement4.style.fontSize = '20px';
        balotaElement4.style.fontWeight = 'bold';
      }
    } else if (this.gameMode.id == 5) {
      this.balotas.forEach((balota) => {
        const balotaElement = document.getElementById(`b${balota.numero}`);
        if (balotaElement) {
          if (
            balota.letra == 'B' ||
            balota.letra == 'N' ||
            balota.letra == 'G' ||
            balota.letra == 'O'
          ) {
            balotaElement.style.backgroundColor = 'red';
            balotaElement.style.color = 'red';
            balotaElement.classList.remove('animate__swing');
            balotaElement.classList.add('animate__pulse');
          }
        }
      });
      this.balotas = this.balotas.filter(
        (b) =>
          b.letra !== 'B' &&
          b.letra !== 'N' &&
          b.letra !== 'G' &&
          b.letra !== 'O'
      );
      const balota5 =
        this.balotas[Math.floor(Math.random() * this.balotas.length)];
      const balotaElement5 = document.getElementById(`b${balota5.numero}`);
      this.balotas = this.balotas.filter((b) => b.numero !== balota5.numero);
      if (balotaElement5) {
        balotaElement5.style.backgroundColor = 'green';
        balotaElement5.style.color = 'white';
        balotaElement5.style.fontSize = '20px';
        balotaElement5.style.fontWeight = 'bold';
      }
    } else if (this.gameMode.id == 6) {
      this.balotas.forEach((balota) => {
        const balotaElement = document.getElementById(`b${balota.numero}`);
        if (balotaElement) {
          if (
            balota.letra == 'B' ||
            balota.letra == 'I' ||
            balota.letra == 'G' ||
            balota.letra == 'O'
          ) {
            balotaElement.style.backgroundColor = 'red';
            balotaElement.style.color = 'red';
            balotaElement.classList.remove('animate__swing');
            balotaElement.classList.add('animate__pulse');
          }
        }
      });
      this.balotas = this.balotas.filter(
        (b) =>
          b.letra !== 'B' &&
          b.letra !== 'I' &&
          b.letra !== 'G' &&
          b.letra !== 'O'
      );
      const balota6 =
        this.balotas[Math.floor(Math.random() * this.balotas.length)];
      const balotaElement6 = document.getElementById(`b${balota6.numero}`);
      this.balotas = this.balotas.filter((b) => b.numero !== balota6.numero);
      if (balotaElement6) {
        balotaElement6.style.backgroundColor = 'green';
        balotaElement6.style.color = 'white';
        balotaElement6.style.fontSize = '20px';
        balotaElement6.style.fontWeight = 'bold';
      }
    } else if (this.gameMode.id == 7) {
      this.balotas.forEach((balota) => {
        const balotaElement = document.getElementById(`b${balota.numero}`);
        if (balotaElement) {
          if (
            balota.letra == 'B' ||
            balota.letra == 'I' ||
            balota.letra == 'N' ||
            balota.letra == 'O'
          ) {
            balotaElement.style.backgroundColor = 'red';
            balotaElement.style.color = 'red';
            balotaElement.classList.remove('animate__swing');
            balotaElement.classList.add('animate__pulse');
          }
        }
      });
      this.balotas = this.balotas.filter(
        (b) =>
          b.letra !== 'B' &&
          b.letra !== 'I' &&
          b.letra !== 'N' &&
          b.letra !== 'O'
      );
      const balota7 =
        this.balotas[Math.floor(Math.random() * this.balotas.length)];
      const balotaElement7 = document.getElementById(`b${balota7.numero}`);
      this.balotas = this.balotas.filter((b) => b.numero !== balota7.numero);
      if (balotaElement7) {
        balotaElement7.style.backgroundColor = 'green';
        balotaElement7.style.color = 'white';
        balotaElement7.style.fontSize = '20px';
        balotaElement7.style.fontWeight = 'bold';
      }
    } else if (this.gameMode.id == 8) {
      this.balotas.forEach((balota) => {
        const balotaElement = document.getElementById(`b${balota.numero}`);
        if (balotaElement) {
          if (
            balota.letra == 'B' ||
            balota.letra == 'I' ||
            balota.letra == 'N' ||
            balota.letra == 'G'
          ) {
            balotaElement.style.backgroundColor = 'red';
            balotaElement.style.color = 'red';
            balotaElement.classList.remove('animate__swing');
            balotaElement.classList.add('animate__pulse');
          }
        }
      });
      this.balotas = this.balotas.filter(
        (b) =>
          b.letra !== 'B' &&
          b.letra !== 'I' &&
          b.letra !== 'N' &&
          b.letra !== 'G'
      );
      const balota8 =
        this.balotas[Math.floor(Math.random() * this.balotas.length)];
      const balotaElement8 = document.getElementById(`b${balota8.numero}`);
      this.balotas = this.balotas.filter((b) => b.numero !== balota8.numero);
      if (balotaElement8) {
        balotaElement8.style.backgroundColor = 'green';
        balotaElement8.style.color = 'white';
        balotaElement8.style.fontSize = '20px';
        balotaElement8.style.fontWeight = 'bold';
      }
    }
  }

  bingo() {
    //bajar el volumen del audio de las suspenso
    this.soundSuspense.volume = 0.6;
    this.soundSuspense.loop = true;
    this.soundSuspense.play();
    this.blockButton = true;
    this.hidenBingo = true;
    let bingo = document.getElementById('bingo');
    if (bingo) {
      bingo.classList.remove('animate__pulse');
    }
  }

  confirmBingo() {
    this.soundSuspense.pause();
    this.soundTransition.play();
    this.soundBingo.play();
    let divEncima = document.getElementById('divEncima');
    divEncima?.classList.add('absolute', 'z-50');
    console.log(divEncima);
    if (divEncima) {
      divEncima.innerHTML = `<div class="div mb-80">
        <canvas id="canvas" class="w-screen h-screen"></canvas>
      </div>`;
    }

    let canvas = document.getElementById('canvas') as HTMLCanvasElement;
    if (canvas) {
      confetti.create(canvas, {
        useWorker: true,
      })({ particleCount: 500, spread: 100 });
    }

    //hacer in
  }

  noBingo() {
    this.soundSuspense.pause();
    //que el soundFail se reproduzca desde el segundo 3
    this.soundFail.currentTime = 1.2;

    this.soundFail.play();

    this.soundFail.onended = () => {
      this.blockButton = false;
      //eliminar el div divEncima
      let divEncima = document.getElementById('divEncima');
      divEncima?.classList.remove('absolute', 'z-50');
      if (divEncima) {
        divEncima.innerHTML = '';
      }
      this.hidenBingo = false;
      let bingo = document.getElementById('bingo');
      if (bingo) {
        bingo.classList.add('animate__pulse');
      }
      this.spin();
    };
  }
  ngOnInit(): void {
    this.printBalotas();
  }
}
