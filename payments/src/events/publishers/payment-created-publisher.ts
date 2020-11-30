import { Subjects, Publisher, PaymentCreatedEvent } from "@jlgittix/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
