import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow } from '@ionic/angular/standalone';
import { QRCodeModule } from 'angularx-qrcode';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, QRCodeModule, IonGrid, IonRow]
})
export class Tab2Page {
  qrString: string = "default";
  constructor() {
    this.qrString="La string dependerá de la reserva o algo así pa que no se repita"
  }

}
