import {
  Component,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EventsListComponent {
  @Input() events: string[];
}
