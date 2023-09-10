import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


interface GameMode {
  name: string;
  id: number;
}

interface imagesModes{
  name: string;
  url: string;
  id: number;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  selectedValue: number;
  images: imagesModes[];
  imageSelected: string | undefined;
  gameModes: GameMode[]
  showImage: boolean;
  @ViewChild('logo') logo!: ElementRef;

  constructor(private toastr: ToastrService) {

    this.gameModes = [
      { name: 'Selecciona un modo de juego', id: 0 },
      { name: 'Completo', id: 1 },
      { name: 'Solo esquinas', id: 2 },
      { name: 'Solo esquinas y centro', id: 3 },
      { name: 'Solo letra B', id: 4 },
      { name: 'Solo letra I', id: 5 },
      { name: 'Solo letra N', id: 6 },
      { name: 'Solo letra G', id: 7 },
      { name: 'Solo letra O', id: 8 },
    ]

    this.images = [
      {name: 'logo', url: 'https://i.ibb.co/7S85XhZ/inter-Logo.jpg', id: 0},
      { name: 'Completo', url: 'https://i.ibb.co/Z6HPLb5/completo-removebg-preview.png', id: 1 },
      { name: 'Solo esquinas', url: 'https://i.ibb.co/MZs7wvz/Esquinas-removebg-preview.png', id: 2 },
      {name: 'Solo esquinas y centro', url: 'https://i.ibb.co/0GcBxpS/Esquinas-y-centro-removebg-preview.png', id: 3},
      { name: 'Solo letra B', url: 'https://i.ibb.co/Z2sxc3r/B-removebg-preview.png', id: 4 },
      { name: 'Solo letra I', url: 'https://i.ibb.co/ZcMGQxx/I-removebg-preview.png', id: 5 },
      { name: 'Solo letra N', url: 'https://i.ibb.co/RBfN3db/N-removebg-preview.png', id: 6 },
      { name: 'Solo letra G', url: 'https://i.ibb.co/gWSp2wC/G-removebg-preview.png', id: 7 },
      { name: 'Solo letra O', url: 'https://i.ibb.co/R0RKZDd/O-removebg-preview.png', id: 8 },
    ]
    this.selectedValue = this.gameModes[0].id;
    this.imageSelected = "";
    this.showImage = true;
    this.changeOption(0);
  }


  changeOption(valor: number) {
    this.selectedValue = valor;
    if (valor == 0 ){
     this.showImage = true;
     return;
    }
    this.imageSelected = this.images.find(x => x.id == valor)?.url;
    this.showImage = false;
  }

  selectMode() {
    if (this.selectedValue == this.gameModes[0].id) {
      this.toastr.warning('Selecciona un modo de juego', 'Alerta');
      return;
    }
    this.toastr.success('Modo de juego seleccionado', 'Correcto');
    //cargar la imagen del modo de juego
    localStorage.setItem('img', this.imageSelected!);
    window.location.href = '/bingo?mode=' + this.selectedValue;

  }


}
