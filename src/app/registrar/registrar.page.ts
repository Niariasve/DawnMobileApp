import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
  IonInput,
  IonLabel, IonList, IonItem
} from '@ionic/angular/standalone';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { arrowBack } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonIcon,
     IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
    IonInput,
    IonLabel, IonList, IonItem]
})
export class RegistrarPage implements OnInit {

  constructor(private navCtrl: NavController) {
    addIcons({ arrowBack });
  }

  ngOnInit() {
  }

}
