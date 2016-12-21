import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CheckInPage } from '../pages/check-in/check-in';
import { AdminPage } from '../pages/admin/admin';
import { TabsPage } from '../pages/tabs/tabs';
import { EventsPage } from '../pages/events/events';
import { AddEventPage } from '../pages/add-event/add-event';
import { EventDetailPage } from '../pages/event-detail/event-detail';

@NgModule({
  declarations: [
    MyApp,
    AdminPage,
    CheckInPage,
    TabsPage,
    EventsPage,
    EventDetailPage,
    AddEventPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AdminPage,
    CheckInPage,
    TabsPage,
    EventsPage,
    EventDetailPage,
    AddEventPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
