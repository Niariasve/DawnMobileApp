import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow } from '@ionic/angular/standalone';
import { QRCodeModule } from 'angularx-qrcode';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { ProviderService } from '../services/provider.service';
import { Data } from '../interfaces/data';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, QRCodeModule, IonGrid, IonRow, HttpClientModule],
  providers: [ProviderService]
})
export class Tab2Page implements OnInit{
  qrString: string = "default";
  private providerService = inject(ProviderService);


  constructor() {
    this.qrString="La string dependerá de la reserva o algo así pa que no se repita"
  }

  ngOnInit() {

    const now = new Date();
    const formattedDateTime = now.toLocaleString(); // Formatea la fecha y hora según la configuración regional
    console.log(`Fecha y hora actuales para validar la visita mas reciente: ${formattedDateTime}`);

    this.providerService.getResponse().subscribe({
      next: (data: Data) => {
        console.log('Fetched Data:', data);
        // Additional logic to process data
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      }
    });
  }


}
