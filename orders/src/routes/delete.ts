import express, { Request, Response, Router } from 'express';
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from '@jlgittix/common';
import { Order, OrderStatus } from '../models/order';
import { NotBeforeError } from 'jsonwebtoken';
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher';
import { natsWrapper } from '../nats-wrapper';
import { version } from 'mongoose';

const router = express.Router();

router.delete(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate('ticket');

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    order.status = OrderStatus.Cancelled;

    await order.save();

    // publishing an event saying this was cancelled
    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
        version: order.ticket.version,
      },
    });

    res.status(204).send(order);
  },
);

export { router as deleteOrderRouter };
