export enum OrderStatus {
  // When the order has been created, but the
  //ticket it is trying to order not reserved
  Created = 'created',

  // The ticket the order is trying to reserve has already
  // been reserved, or when the user has cancelled the order
  // The order expires before the payment
  Cancelled = 'cancelled',

  // The order has successfully reserved the ticket
  AwaitingPayment = 'awaiting:payment',

  // The order has received the ticket and the user has
  // provided payment successfully
  Complete = 'complete',
}
