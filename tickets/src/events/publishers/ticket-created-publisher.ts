import { Publisher, Subjects, TicketCreatedEvent } from '@jlgittix/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
