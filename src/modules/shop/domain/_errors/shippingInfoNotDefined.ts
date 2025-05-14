import { Error } from '../../../../shared';

export class ShippingInfoNotDefined extends Error<'ShippingInfoNotDefined'> {
constructor() {
super('ShippingInfoNotDefined');
}
}