import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow } from '@ionic/angular/standalone';
import { QRCodeModule } from 'angularx-qrcode';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { ProviderService } from '../services/provider.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, QRCodeModule, IonGrid, IonRow, HttpClientModule],
  providers: [ProviderService]
})
export class Tab2Page implements OnInit {
  private providerService = inject(ProviderService);

  qrString: string = "default";
actividad: string ="No hay reservas pendientes";
fechaHora: Date=new Date();


  constructor() {
    this.qrString = '${actividad}${fechaHora}';
  }

  ngOnInit() {
    let dateItem = new Date();

    // Obtener datos del servicio
    this.providerService.getResponse().subscribe({
      next: (response: { [key: string]: any }) => {
      // descomentar para ver el recurso completo |
      //                                          v
      // console.log('Fetched Data:', response);

        // Recorrer el objeto de datos
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            const item = response[key];
            const resourceDateStr = `${item.fecha}T${item.hora}:00Z`; // Formato ISO 8601
            dateItem = new Date(resourceDateStr);
            console.log('Fecha del recurso:', dateItem.toLocaleString());
            if(dateItem>=  new Date() && dateItem> this.fechaHora){
              console.log("dateitem: ", dateItem.toLocaleString(), ", es mayor a la hora actual", new Date().toLocaleString());
              this.actividad=item.actividad;
              this.fechaHora=dateItem;
            }
            else{
              console.log("no hay reservas disponibles para la hora ", dateItem.toLocaleString());
            }

          }
        }
        console.log("La hora mas cercana a la actual de las horas del recurso json es: ",this.fechaHora.toLocaleString());

      },
      error: (err) => {
        console.error('Error fetching data:', err);
      }
    });
  }


}
