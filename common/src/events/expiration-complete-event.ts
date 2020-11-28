import { Subjects } from "./subjects";

export default interface ExpirationCompleteEvent {
  subject: Subjects.ExpirationComplete;
  data: {
    orderId: string;
  };
}
