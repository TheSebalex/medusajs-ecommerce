    // import {
    //     OrderService,
    //     SubscriberArgs,
    //     SubscriberConfig,
    // } from "@medusajs/medusa";
    
    // type OrderPlacedEvent = {
    //     id: string;
    //     no_notification: boolean;
    // };
    
    // export default async function orderPlacedHandler({
    //     data,
    //     eventName,
    //     container,
    // }: SubscriberArgs<OrderPlacedEvent>) {
    //     const orderService: OrderService = container.resolve("OrderService");
    
    //     const order = await orderService.retrieve(data.id, {
    //     relations: ["items", "items.variant", "items.variant.product"],
    //     });
    
    //     // Do something with the order
    // }
    
    // export const config: SubscriberConfig = {
    //     event: OrderService.Events.PLACED,
    // };