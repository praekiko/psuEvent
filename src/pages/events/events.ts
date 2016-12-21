import { Component } from '@angular/core';

import { NavController, App, ViewController, ModalController, NavParams, AlertController} from 'ionic-angular';


import { EventDetailPage } from '../event-detail/event-detail';
import { AddEventPage } from '../add-event/add-event';

import { EventsService } from '../../models/events.service';

/*
  Generated class for the Events page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */

@Component({
  	selector: 'page-events',
  	templateUrl: 'events.html',
    providers: [EventsService],
})
export class EventsPage {
  	
    events: any
    originalEvents: any;
    selectingEvent: any

    checkedStd = 0
    totalStd = 0

    constructor(public navCtrl: NavController, public navParams: NavParams, private eventsService: EventsService, public modalCtrl: ModalController) {
  		// If we navigated to this page, we will have an item available as a nav param
      this.events = this.eventsService.getEvents();
      // this.events = this.events
      this.originalEvents = this.events;
      this.selectingEvent = this.events;
  	}

  	showEventDetail(event, item) {
      this.checkedStd = 0
      this.totalStd = 0
      if(item.students){
        item.students.filter(element => {
          if(element.isCheck){
                // console.log(element.id);
            this.checkedStd = this.checkedStd + 1;
          }
          this.totalStd = this.totalStd + 1;     
          
        });
      }
      

  		this.navCtrl.push(EventDetailPage, {
  			event: item,
        checkedStd: this.checkedStd,
        totalStd: this.totalStd
  		});
  	}

  	ionViewDidLoad() {
  		console.log('ionViewDidLoad EventsPage');
  	}

    getItems(ev: any) {
      // Reset items back to all of the items
      // this.initializeItems();
      this.selectingEvent = this.originalEvents;

      // set val to the value of the searchbar
      let val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.selectingEvent = this.selectingEvent.filter((item) => {
          return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }

    onChange(selectingEvent) {
      console.log(selectingEvent.id);
      this.selectingEvent = this.originalEvents;
      if(selectingEvent.id){
        this.selectingEvent = this.events.filter(element => {
          return element.id == selectingEvent.id;
        });
      }
      
      // console.log(this.selectingEvent);
    }

    resetAllCriteria() {
      this.selectingEvent = this.originalEvents;
    }

    showAddEvent(){
      let modal = this.modalCtrl.create(AddEventPage);
      modal.present();
    }

    
  }


