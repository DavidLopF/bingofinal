import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


interface GameMode {
  name: string;
  id: number;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

  selectedValue: number;


  gameModes: GameMode[]

  constructor(private toastr: ToastrService) {

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
      { name: 'U', id: 10 },
    ]

    this.selectedValue = this.gameModes[0].id;
  }


  changeOption(valor: number) {
    console.log(valor);
    this.selectedValue = valor;
  }

  selectMode() {
    if (this.selectedValue == this.gameModes[0].id) {
      this.toastr.warning('Selecciona un modo de juego', 'Alerta');
      return;
    }

    this.toastr.success('Modo de juego seleccionado', 'Correcto');
    window.location.href = '/bingo?mode=' + this.selectedValue;

  }


}
