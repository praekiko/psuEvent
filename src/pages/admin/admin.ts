import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { EventsPage } from '../events/events';
/*
  Generated class for the Admin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})
export class AdminPage {
  enteredPin = "";
  pin = "1234";
  // pin = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }

  enterToEventPage() {
    console.log(this.enteredPin);
    if(this.enteredPin == this.pin){
      this.navCtrl.push(EventsPage);
    }
    else {
      this.showMistakeAlert()
    }
  	
  }

  showMistakeAlert() {
    let alert = this.alertCtrl.create({
      subTitle: 'PIN IS NOT CORRECT',
      buttons: [
        {
          text: 'OK'          
        }
      ]
    });
    alert.present();
  }

}
