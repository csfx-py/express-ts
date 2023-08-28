import orderModel from '@/models/order.model';

export const uniqueOrderId = async () => {
    const orders = await orderModel.find({}).sort({ orderNumber: -1 }).limit(1);

    if (orders.length === 0) {
        return `C0000001`;
    }

    const lastOrder = orders[0];
    const lastOrderNumber = lastOrder.orderNumber;
    const lastOrderNumberInt = parseInt(lastOrderNumber.slice(1));
    const newOrderNumber = lastOrderNumberInt + 1;
    const newOrderNumberString = newOrderNumber.toString();
    const newOrderNumberLength = newOrderNumberString.length;
    const newOrderNumberStringWithZeros = `C${'0'.repeat(
        7 - newOrderNumberLength
    )}${newOrderNumberString}`;

    return newOrderNumberStringWithZeros;
};
