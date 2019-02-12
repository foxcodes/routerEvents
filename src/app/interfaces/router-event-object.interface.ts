import { RouterEventType } from '../enums/router-event-type.enum';

export interface RouterEventObject {
  name: string;
  type: RouterEventType;
  isActive: boolean;
}
