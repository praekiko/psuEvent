import { Component } from '@angular/core';

import { CheckInPage } from '../check-in/check-in';
import { AdminPage } from '../admin/admin';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = CheckInPage;
  tab2Root: any = AdminPage;

  constructor() {

  }
}
