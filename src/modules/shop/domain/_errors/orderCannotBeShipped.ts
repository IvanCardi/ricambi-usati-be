import { Error } from '../../../../shared';

export class OrderCannotBeShipped extends Error<'OrderCannotBeShipped'> {
constructor() {
super('OrderCannotBeShipped');
}
}