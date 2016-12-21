import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { EmailComposer, File } from 'ionic-native';
/*
  Generated class for the EventDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  declare var cordova: any;


  @Component({
    selector: 'page-event-detail',
    templateUrl: 'event-detail.html'
  })
  export class EventDetailPage { 
    selectedEvent: any;
    checkedStd: number
    totalStd: number

    jsonString: any;
    csvData: any;
    filePath: any;
    fileName: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
      // If we navigated to this page, we will have an item available as a nav param
      this.selectedEvent = navParams.get('event');
      this.fileName = this.selectedEvent.title + '.csv';

      this.checkedStd = navParams.get('checkedStd');
      this.totalStd = navParams.get('totalStd');

    }   

    ionViewDidLoad() {
      console.log('ionViewDidLoad EventDetailPage');
    }

    createCSVFile(){
      this.jsonString = JSON.stringify(this.selectedEvent.students);
      var csv = this.ConvertToCSV(this.jsonString);
      this.csvData = csv;

      File.writeFile(cordova.file.externalDataDirectory, this.fileName, csv, true).then(() => console.log("created")).catch((err) => console.log(err));
      this.filePath = cordova.file.externalDataDirectory + this.fileName;
      console.log(cordova.file.externalDataDirectory + this.fileName)
    }

    sendData() {
      this.createCSVFile();

      //Send Email
      EmailComposer.isAvailable().then((available: boolean) =>{
        if(available) {
          //Now we know we can send
        }
      });      

      var bodyText = 'CSV file of Students Attentdance in PSU Event! ' + this.selectedEvent.title + ' ' + this.selectedEvent.date;
      
      let email = {
        to: 'pawitra.gin@hotmail.com',
        cc: ['rainbow.prae@gmail.com', 'prae@pupasoft.com'],
        attachments: [this.filePath],
        subject: 'PSU Event! ' + this.selectedEvent.title,
        body: bodyText,
        isHtml: true
      };

      // Send a text message using default options
      EmailComposer.open(email);

      this.sendDataCompletedAlert()
    }

    sendDataCompletedAlert() {
      this.selectedEvent.isSendData = true;
      console.log(this.selectedEvent)
      let alert = this.alertCtrl.create({
        title: 'Complete!',
        subTitle: 'File is store in your device and sent to Email. Please Check Your Email!',
        buttons: [
        {
          text: 'OK',
          handler: () => {
            alert.dismiss().then( () => {
              this.navCtrl.pop();
            });
            return false;
          }
        }
        ]

      });
      alert.present();
    }


    ConvertToCSV(objArray) {
      var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      var str = '';
      var row = "";

      for (var index in objArray[0]) {
        //Now convert each value to string and comma-separated
        row += index + ',';
      }
      row = row.slice(0, -1);
      //append Label row with line break
      // Header
      str += this.selectedEvent.title + '\r\n' + this.selectedEvent.date + '\r\n';


      for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
          if (line != '') line += ','

            line += array[i][index];
        }
        str += line + '\r\n';
      }
      return str;
    }

    


  }
