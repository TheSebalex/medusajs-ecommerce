import {
  OrderService,
  CustomerGroupService,
  SubscriberArgs,
  SubscriberConfig,
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
  const customerGroupService: CustomerGroupService = container.resolve(
    "customerGroupService"
  );

  const order = await orderService.retrieve(data.id, {
    relations: ["discounts"],
  });

  const redeemCodes = order.discounts;;

  redeemCodes?.forEach((dis) => {
    try {
      if (dis.metadata.OnlyOneRedeem) {
        customerGroupService.addCustomers(
          dis.metadata.OnlyOneRedeem as string,
          [order.customer_id]
        );
      }
    } catch (error) {
      console.log(error);
    }
  });
}

export const config: SubscriberConfig = {
  event: OrderService.Events.COMPLETED,
};
