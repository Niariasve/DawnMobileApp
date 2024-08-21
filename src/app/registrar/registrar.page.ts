import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, Validators } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
  IonInput,
  IonLabel, IonList, IonItem, IonGrid, IonRow, IonCol
} from '@ionic/angular/standalone';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { arrowBack } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { HttpClientModule } from '@angular/common/http';
import { ProviderService } from '../services/provider.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonIcon,
     IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
    IonInput,
    IonLabel, IonList, IonItem, HttpClientModule, ReactiveFormsModule, IonGrid, IonRow, IonCol],
  providers: [ProviderService],
})
export class RegistrarPage implements OnInit {

  checkoutForm = this.formBuilder.group({
    actividad: ['', Validators.required],
    fecha: [null, Validators.required],
    extras: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
    extrasData: Array([])
  })

  extraColumns: number[] = [];

  constructor(private navCtrl: NavController, private dataProvider: ProviderService, private formBuilder: FormBuilder) {
    addIcons({ arrowBack });
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      console.log(this.checkoutForm.value);
      for (let i = 1; i <= Number(this.checkoutForm.value.extras); i++) {
        const nombre = document.querySelector(`#nombre-${i}`) as HTMLInputElement;
        const apellido = document.querySelector(`#apellido-${i}`) as HTMLInputElement;
        const cedula = document.querySelector(`#cedula-${i}`) as HTMLInputElement;
        console.log(nombre.value);
        console.log(apellido.value);
        console.log(cedula.value);

        const data: any = {
          nombre: nombre.value,
          apellido: apellido.value,
          cedula: cedula.value
        }
        console.log(this.checkoutForm.value.extrasData);
      }
    } else {
      this.checkoutForm.markAllAsTouched();
    }
  }

  ngOnInit() {
    this.checkoutForm.get('extras')?.valueChanges.subscribe((value) => {
      this.updateExtraColumns(value);
    })
  }

  updateExtraColumns(extras: number | null) {
    this.extraColumns = [];
    if(extras && extras > 0 && extras < 10) {
      this.extraColumns = Array(extras).fill(0).map((_,index) => index + 1);
    }
  }
}
