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
  public data: Data[] = [];
  public meses: { [key: string]: Data[] } = {};
  constructor(private dataProvider: ProviderService, private formBuilder: FormBuilder, private router: Router) { }


  ngOnInit() {
    this.loadData(true)
  }

  loadData(estado: boolean) {
    this.dataProvider.getResponse().subscribe(response => {
      if (response != null) {
        this.data = Object.values(response) as Data[]
        this.data.forEach(item => {

          if (!(item.fecha instanceof Date)) {
            item.fecha = new Date(item.fecha);

          }
        });
        this.meses = this.ordenarPorMes(this.data,estado);
        console.log(this.meses)

        Object.keys(this.meses).forEach((mes) => {
          this.meses[mes] = this.ordenarPorDia(this.meses[mes], estado);
        });

      }

    });
  }



  

  
ordenarPorMes(data: Data[], ascendente: boolean): { [key: string]: Data[] } {
    return data.reduce((acc, item) => {
      //const yearMonth = item.fecha.toISOString().slice(0, 7); // Formato 'YYYY-MM'
      const yearMonth = item.fecha.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }); // Formato 'mes año'
    if (!acc[yearMonth]) {
      acc[yearMonth] = [];
    }
    acc[yearMonth].push(item);
    return acc;
    }, {} as { [key: string]: Data[] });
  }
  
  ordenarPorDia(data: Data[], ascendente: boolean): Data[] {
    return data.sort((a, b) => {
      return ascendente ? a.fecha.getTime() - b.fecha.getTime() : b.fecha.getTime() - a.fecha.getTime();
    });
  }


  goToRegistrar() {
    this.router.navigate(['/registrar']);
  }


  cambioRecientes() {
    this.loadData(false);
  }
  cambioAntiguas() {
    this.loadData(true);
  }


  validarEstado(fecha: Date, hora: string): string {
    const fechaReserva = new Date(fecha);
    const [horas, minutos] = hora.split(':').map(Number);
    fechaReserva.setHours(horas, minutos);

    const fechaActual = new Date();
    const resta = (fechaActual.getTime() - fechaReserva.getTime()) / (1000 * 60 * 60);

    if (resta <= 2 && resta >= 0) {
      return 'Activo';
    } else {
      return 'Inactivo';
    }
  }


  

}

