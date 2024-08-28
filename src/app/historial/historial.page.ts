import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormArray, FormGroup, FormsModule, Validators } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
  IonInput,
  IonLabel, IonList, IonItem, IonGrid, IonRow, IonCol
} from '@ionic/angular/standalone';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Data } from '../interfaces/data';
import { arrowBack } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { HttpClientModule } from '@angular/common/http';
import { ProviderService } from '../services/provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonIcon,
     IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
    IonInput,
    IonLabel, IonList, IonItem, HttpClientModule, ReactiveFormsModule, IonGrid, IonRow, IonCol],
  providers: [ProviderService],
})
export class Historialpage {
    public data : Data[] = [];
    public meses: { [key: string]: Data[]} = {};

    constructor(private dataProvider: ProviderService , private formBuilder: FormBuilder,private router: Router) { }


    ngOnInit() {
        this.loadData()
      }
  
      loadData() {
        this.dataProvider.getResponse().subscribe( response => {
          if( response != null) {
            this.data = Object.values(response) as Data[]
            this.data.forEach(item => {
              if (!(item.fecha instanceof Date)) {
                item.fecha = new Date(item.fecha);
              }
            });

            this.meses = this.ordenarPorMes(this.data);

          }
              
        });
      }



      ordenarPorMes(data: Data[]): { [key: string]: Data[] } {
        return data.reduce((acc, item) => {
          const month = item.fecha.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }); // Formato 'mes año'
          if (!acc[month]) {
            acc[month] = [];
          }
          acc[month].push(item);
          return acc;
        }, {} as { [key: string]: Data[] });
      }


      goToRegistrar() {
        this.router.navigate(['/registrar']);
      }

      



      }

      



//no te olvides de la validacion del qr activo o no 
