import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, Platform, NavController } from '@ionic/angular';
import { AddNameComponent } from '../add-name/add-name.component';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy{

  backSubscription: Subscription;

  constructor(private modalController: ModalController,
              private navController: NavController,
              private location: Location,
              private platform: Platform) {                
              }
  
  ngOnInit(){
    this.backSubscription = this.platform.backButton.subscribe(
      _=>{         
        console.log('home page')
        if(this.location.path() == "/home"){
          console.log('home page')
          navigator['app'].exitApp()
        }           
        this.navController.back()
      }
    )
  }

  ngOnDestroy(){
    this.backSubscription.unsubscribe()
  }

  async addName() {
    const modal = await this.modalController.create({
      component: AddNameComponent
    });
    return await modal.present();
  }

  back(){
    console.log('back to previsou')
    this.navController.back();
  }
}
