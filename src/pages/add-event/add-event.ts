import { Component } from '@angular/core';
import { FormBuilder, Control, ControlGroup, Validators, FORM_DIRECTIVES } from '../@angular/common';
import { Platform, NavController, App, ViewController, ModalController, NavParams } from 'ionic-angular';

import { EventsService } from '../../models/events.service';
/*
  Generated class for the AddEvent page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
    selector: 'page-add-event',
    templateUrl: 'add-event.html',
    providers: [EventsService],
  })
  export class AddEventPage {
    inputTitle: any
    inputDate: any

    inputStdId: any
    inputStdName: any 

    inputStdList = [] 
    events = []

    constructor(public navCtrl: NavController, public navParams: NavParams, private eventsService: EventsService) {
      // this.events = this.eventsService.getEvents();
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad AddEventPage');
    }

    addNewEvent() {
      console.log(this.eventsService.getIdCount())
      this.eventsService.addEvent({
        id: this.eventsService.getIdCount() + 1,
        students: this.inputStdList,
        title: this.inputTitle,
        date: new Date(this.inputDate),
        isSendData: false
      })
      console.log(this.eventsService.getEvents())
      this.cancle()
    }

    addMoreStudent() {
      // console.log(this.inputStdId)
      // console.log(this.inputStdName)
      this.inputStdList.push({
        id: '',
        name: '',
        isCheck: false
      });

      console.log(this.inputStdList)

    }

    cancle() {
      this.navCtrl.pop();
    }

  }
