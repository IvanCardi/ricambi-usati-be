import { Error } from '../../../../shared';

export class OrderNotFound extends Error<'OrderNotFound'> {
constructor() {
super('OrderNotFound');
}
}