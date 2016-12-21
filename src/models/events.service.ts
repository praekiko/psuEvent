import { Injectable } from '@angular/core';


import { EVENTS } from './mock-events';

@Injectable()
export class EventsService {
	getEvents()	{
		return EVENTS.sort((a, b) => {
			if (a.date > b.date) {
				return -1;
			}
			if (a.date < b.date) {
				return 1;
			}
			return 0;
		});
	}

	addEvent(obj) {
		EVENTS.push(obj);
	}

	getIdCount() {
		return EVENTS.length;
	}
}