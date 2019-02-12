import { Component } from '@angular/core';
import {
  Router,
  RouterEvent,
  NavigationStart
} from '@angular/router';

import { RouterEventObject } from './interfaces/router-event-object.interface';
import { RouterEventType } from './enums/router-event-type.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  public title = 'Router Events';

  public eventsList: RouterEventObject[] = [];

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.updateEventsList(event);
    });
  }

  private updateEventsList(event: RouterEvent): void {
    console.log(event);
    if (event instanceof NavigationStart) {
      this.eventsList = [];
    }
    const eventString: string = event.toString();
    const sliceEnd: number = eventString.indexOf('(');
    const eventName: string = eventString.slice(0, sliceEnd);
    const newEvent: RouterEventObject = {
      name: eventName,
      type: this.mapEventType(eventName),
      isActive: false
    };

    this.eventsList = [...this.eventsList, newEvent];
  }

  private mapEventType(name: string): RouterEventType {
    switch (name) {
      case 'NavigationStart':
      case 'NavigationEnd':
        return RouterEventType.NAVIGATION;
      case 'RoutesRecognized':
        return RouterEventType.ROUTES_RECOGNIZED;
      case 'GuardsCheckStart':
      case 'GuardsCheckEnd':
        return RouterEventType.GUARD_CHECK;
      case 'ChildActivationStart':
      case 'ChildActivationEnd':
        return RouterEventType.CHILD_ACTIVATION;
      case 'ActivationStart':
      case 'ActivationEnd':
        return RouterEventType.ACTIVATION;
      case 'ResolveStart':
      case 'ResolveEnd':
        return RouterEventType.RESOLVE;
      case 'Scroll':
        return RouterEventType.SCROLL;
      default:
        return RouterEventType.UNHANDLED;
    }
  }
}
