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
    hora: [null, Validators.required],
    extras: [null, [Validators.required, Validators.min(0), Validators.max(11)]],
    extrasData: this.formBuilder.array([])
  })

  get extrasData() {
    return this.checkoutForm.get('extrasData') as FormArray;
  }

  extraColumns: number[] = [];

  constructor(private navCtrl: NavController, private dataProvider: ProviderService, private formBuilder: FormBuilder) {
    addIcons({ arrowBack });
  }

  onSubmit() {
    console.log(this.checkoutForm.value);
    if (this.checkoutForm.valid) {
      const extrasArray = this.checkoutForm.value.extrasData;
      console.log('Datos extra: ', extrasArray);
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
    this.extrasData.clear();
    if(extras && extras > 0 && extras <= 10) {
      this.extraColumns = Array(extras).fill(0).map((_,index) => index + 1);
      for (let i = 0; i < extras; i++) {
        this.extrasData.push(this.createExtraForm());
      }
    }
  }

  createExtraForm(): FormGroup {
    return this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cedula: ['', Validators.required],
    })
  }
}
