import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';

import { EventsService } from '../../models/events.service';

/*
  Generated class for the CheckIn page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
@Component({
    selector: 'page-check-in',
    templateUrl: 'check-in.html',
    providers: [EventsService]
})
export class CheckInPage {
    
    enteredStdId: any;
    selectedActId: any;

    selectedActObj = [];
    macth = false;
    alreadyChecked = false;

    events: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private eventsService: EventsService) {
      this.events = this.eventsService.getEvents();
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad CheckInPage');
    }

    checkIfMacth() {
      // console.log(this.enteredStdId);
      // console.log(this.selectedActId);
      
      console.log(this.events);

      this.selectedActObj = this.events.filter(element => {
        return element.id == this.selectedActId;
      });
      // console.log(this.selectedActObj);

      this.selectedActObj.filter(element => {
        if(element.students){
            element.students.filter(element => {
            if(element.id == this.enteredStdId){
              if(!element.isCheck) {
                this.macth = true;
                this.alreadyChecked = false;
                element.isCheck = true;
              }
              else {
                this.alreadyChecked = true;
                this.macth = true;
              }
              
              // console.log(element);
            }
          })
        }        
        
      });

      if(this.macth){
        if(this.alreadyChecked){
          this.showAlreadyCheckAlert();
        }
        else {
          this.showMatchAlert();
        }
        
        this.macth = false;
        this.enteredStdId = "";
        this.selectedActId = "";

      }
      else {
        this.showDisMatchAlert();
        this.macth = false;
        this.enteredStdId = "";
        this.selectedActId = "";
      }

    }

    showMatchAlert() {
      let alert = this.alertCtrl.create({
        subTitle: 'Check In Completed',
        buttons: ['OK']
      });
      alert.present();
    }

    showDisMatchAlert() {
      let alert = this.alertCtrl.create({
        subTitle: 'NO this STUDENT ID in this ACTIVITY',
        buttons: ['OK']
      });
      alert.present();
    }

    showAlreadyCheckAlert() {
      let alert = this.alertCtrl.create({
        subTitle: 'Already Check',
        buttons: ['OK']
      });
      alert.present();
    }

    public scanQR() {
      //this.buttonText = "Loading..";
      //this.loading = true;

      BarcodeScanner.scan().then((barcodeData) => {
        if (barcodeData.cancelled) {
          console.log("User cancelled the action!");
          //this.buttonText = "Scan";
          //this.loading = false;
          return false;
        }
        console.log("Scanned successfully!");
        console.log(barcodeData);

        this.enteredStdId = barcodeData.text;


        // this.goToResult(barcodeData);
      }, (err) => {
        console.log(err);
      });
    }

  }
