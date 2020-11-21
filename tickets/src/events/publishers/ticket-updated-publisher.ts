import { Publisher, Subjects, TicketUpdatedEvent } from '@jlgittix/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
