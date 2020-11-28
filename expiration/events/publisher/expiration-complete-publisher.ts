import { Subjects, Publisher, ExpirationCompleteEvent } from "@jlgittix/common";
export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
