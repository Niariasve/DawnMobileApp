import { Component, OnInit } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';


@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss'],
  standalone: true,
  imports:[QRCodeModule],
})
export class QrcodeComponent  implements OnInit {
  qrString: string = "default";
  constructor() {
    this.qrString="La string dependerá de la reserva o algo así pa que no se repita"
   }

  ngOnInit() {}

}
