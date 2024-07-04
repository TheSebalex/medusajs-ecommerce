  import {
    OrderService,
    CustomerGroupService,
    SubscriberArgs,
    SubscriberConfig,
    PaymentStatus
  } from "@medusajs/medusa";
  
  type OrderPlacedEvent = {
    id: string;
    no_notification: boolean;
  };

  export default async function orderPlacedHandler({
    data,
    eventName,
    container,
  }: SubscriberArgs<OrderPlacedEvent>) {
    const orderService: OrderService = container.resolve("orderService");
    
    const order = await orderService.retrieve(data.id, {
      relations: ["items", "items.variant", "items.variant.product"],
    });
  
    const isPaymentCaptured = order.payment_status === PaymentStatus.CAPTURED;

    const areAllItemsShipped = order.items.every(
      (i) => i.fulfilled_quantity === i.quantity
    );

    if (isPaymentCaptured && areAllItemsShipped) {
      orderService.completeOrder(order.id);
    }
  }
  
  export const config: SubscriberConfig = {
    event: [OrderService.Events.PAYMENT_CAPTURED, OrderService.Events.SHIPMENT_CREATED],
  };
  