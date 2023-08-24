import { Component, Input, OnInit } from '@angular/core';


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
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {


  balotas: balotas[] = [];
  letters: string[] = [];
  blockButton: boolean;
  @Input() gameMode: any;

  constructor() {
    for (let i = 1; i <= 75; i++) {
      this.balotas.push({ numero: i, estado: false, letra: this.getLetter(i) });
    }
    this.blockButton = false;
    this.letters = ['B', 'I', 'N', 'G', 'O'];
  }

  printBalotas() {
    const b = document.getElementById('b');
    const i = document.getElementById('i');
    const n = document.getElementById('n');
    const g = document.getElementById('g');
    const o = document.getElementById('o');
    const style = `style="border-radius:300px;background-color: white;height: 40px;width: 40px;"`;
    const classBalota = ` class="balota center-align animate__animated animate__pulse animate__infinite"`;
    this.balotas.forEach(balota => {
      if (b && i && n && g && o) {
        if (balota.numero >= 1 && balota.numero <= 15) {
          b.innerHTML += `<td><div ${style}  id="b${balota.numero}" ${classBalota} >${balota.numero}</div></td>`
        }
        if (balota.numero >= 16 && balota.numero <= 30) {
          i.innerHTML += `<td><div ${style}  id="b${balota.numero}" ${classBalota} >${balota.numero}</div></td>`
        }
        if (balota.numero >= 31 && balota.numero <= 45) {
          n.innerHTML += `<td><div ${style}  id="b${balota.numero}" ${classBalota} >${balota.numero}</div></td>`
        }
        if (balota.numero >= 46 && balota.numero <= 60) {
          g.innerHTML += `<td><div ${style}  id="b${balota.numero}" ${classBalota} >${balota.numero}</div></td>`
        }
        if (balota.numero >= 61 && balota.numero <= 75) {
          o.innerHTML += `<td><div ${style}  id="b${balota.numero}" ${classBalota} >${balota.numero}</div></td>`
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

    this.balotas.forEach(balota => {
      const balotaElement = document.getElementById(`b${balota.numero}`);
      if (balotaElement) {
        balotaElement.style.backgroundColor = 'yellow';
        balotaElement.classList.remove('animate__pulse');
        balotaElement.classList.add('animate__swing');
      }

    });
    setTimeout(() => {
      this.selectBalota();
      this.balotas.forEach(balota => {
        const balotaElement = document.getElementById(`b${balota.numero}`);
        if (balotaElement) {
          balotaElement.classList.remove('animate__swing');
          this.blockButton = false;
          balotaElement.style.backgroundColor = 'white';

        }
      });
    }, 3000);
  }


  selectBalota() {
    if (this.gameMode.id == 1 || this.gameMode.id == 4 || this.gameMode.id == 5 || this.gameMode.id == 6 || this.gameMode.id == 7 || this.gameMode.id == 8 || this.gameMode.id == 9) {
      const balota = this.balotas[Math.floor(Math.random() * this.balotas.length)];
      const balotaElement = document.getElementById(`b${balota.numero}`);
      this.balotas = this.balotas.filter(b => b.numero !== balota.numero);
      if (balotaElement) {
        balotaElement.style.backgroundColor = 'green';
        balotaElement.style.color = 'white';
        balotaElement.style.fontSize = '20px';
        balotaElement.style.fontWeight = 'bold';
      }
    } else if (this.gameMode.id == 2) {
      this.balotas.forEach(balota => {
        const balotaElement = document.getElementById(`b${balota.numero}`);
        if (balotaElement) {
          if (balota.letra == 'I' || balota.letra == 'N' || balota.letra == 'G') {
            balotaElement.style.backgroundColor = 'red';
            balotaElement.style.color = 'red';
          }
        }
      });
      this.balotas = this.balotas.filter(b => b.letra !== 'I' && b.letra !== 'N' && b.letra !== 'G');
      const balota2 = this.balotas[Math.floor(Math.random() * this.balotas.length)];
      const balotaElement2 = document.getElementById(`b${balota2.numero}`);
      this.balotas = this.balotas.filter(b => b.numero !== balota2.numero);
      if (balotaElement2) {
        balotaElement2.style.backgroundColor = 'green';
        balotaElement2.style.color = 'white';
        balotaElement2.style.fontSize = '20px';
        balotaElement2.style.fontWeight = 'bold';
      }
    } else if (this.gameMode.id == 3) {
      this.balotas.forEach(balota => {
        const balotaElement = document.getElementById(`b${balota.numero}`);
        if (balotaElement) {
          if (balota.letra == 'I' || balota.letra == 'G') {
            balotaElement.style.backgroundColor = 'red';
            balotaElement.style.color = 'red';
          }
        }
      });
      this.balotas = this.balotas.filter(b => b.letra !== 'I' && b.letra !== 'G');
      const balota3 = this.balotas[Math.floor(Math.random() * this.balotas.length)];
      const balotaElement3 = document.getElementById(`b${balota3.numero}`);
      this.balotas = this.balotas.filter(b => b.numero !== balota3.numero);
      if (balotaElement3) {
        balotaElement3.style.backgroundColor = 'green';
        balotaElement3.style.color = 'white';
        balotaElement3.style.fontSize = '20px';
        balotaElement3.style.fontWeight = 'bold';
      }
    }
  }

  ngOnInit(): void {
    this.printBalotas();
  }

}
