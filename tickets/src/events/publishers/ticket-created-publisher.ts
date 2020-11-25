import { Publisher, Subjects, TicketCreatedEvent } from '@jlgittix/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
