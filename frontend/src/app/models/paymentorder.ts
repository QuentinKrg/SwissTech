import { ShoppingCart } from './shopping-cart';

export class PaymentOrder {
    id_user: number;
    paymentMethodCode: string;
    shoppingCart: ShoppingCart[];
    FK_Order_ShippingAddress: string;
    FK_Order_BillingAddress: string;
}