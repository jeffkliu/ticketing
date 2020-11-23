import { Publisher, OrderCreatedEvent, Subjects } from '@jlgittix/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
