import { ShoppingCart } from './shopping-cart';

export class PaymentOrder {
    id_user: number;
    paymentMethodCode: string;
    shoppingCart: ShoppingCart[];
}