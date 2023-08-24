import { Component } from '@angular/core'; 4

interface GameMode {
  name: string;
  id: number;
}


@Component({
  selector: 'app-bingo',
  templateUrl: './bingo.component.html',
  styleUrls: ['./bingo.component.css']
})
export class BingoComponent  {

  gameModes: GameMode[]
  selectedValue: GameMode | undefined;


  constructor() {

    this.gameModes = [
      { name: 'Selecciona un modo de juego', id: 0 },
      { name: 'Completo', id: 1 },
      { name: 'Solo esquinas', id: 2 },
      { name: 'Solo esquinas y centro', id: 3 },
      { name: 'L', id: 4 },
      { name: 'T', id: 5 },
      { name: 'B', id: 6 },
      { name: 'X', id: 7 },
      { name: 'Cruz', id: 8 },
      { name: 'Cuadrado', id: 9 },
    ]
    const queryString = window.location.search.split('=')[1];
    this.selectedValue = this.gameModes.find(x => x.id == parseInt(queryString));
  }


  redirectHome() {
    window.location.href = '/';
  }


}
