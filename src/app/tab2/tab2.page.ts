import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonSkeletonText, IonIcon } from '@ionic/angular/standalone';
import { QRCodeModule } from 'angularx-qrcode';
import { ProviderService } from '../services/provider.service';
import { HttpClientModule } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { calendarClearOutline } from 'ionicons/icons';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, QRCodeModule, IonGrid, IonRow, IonCol,  IonSkeletonText, IonIcon, HttpClientModule],
  providers: [ProviderService]
})
export class Tab2Page implements OnInit {
  private providerService = inject(ProviderService);
  public loaded = false;

  qrString: string = "default";
  actividad: string = "No tienes reservas";
  fechaHora: Date = new Date();


  constructor() {
    addIcons({
      calendarClearOutline
    });
  }

  ngOnInit() {
    /*Aqui cambio la fecha por una maxima hasta un año, para que la del json pueda colocarse */
    let fechaEnUnAno = new Date();
    fechaEnUnAno.setFullYear(fechaEnUnAno.getFullYear() + 1);
    this.fechaHora = fechaEnUnAno;

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
            if (dateItem > new Date() && dateItem < fechaEnUnAno) {
              console.log("dateitem: ", dateItem.toLocaleString(), ", es mayor a la hora actual", new Date().toLocaleString());
              this.actividad = item.actividad;
              this.fechaHora = dateItem;
            }
            else {
              console.log("no hay reservas disponibles para la hora ", dateItem.toLocaleString());
            }

          }
        }


        //  setTimeout(() => {
        this.loaded = true;
        //  }, 500);
        console.log("La hora mas cercana a la actual de las horas del recurso json es: ", this.fechaHora.toLocaleString());
        this.qrString = '${actividad}${fechaHora}';


      },
      error: (err) => {
        console.error('Error fetching data:', err);
      }
    });
  }


}
