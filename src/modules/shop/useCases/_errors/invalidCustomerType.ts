import { Error } from '../../../../shared';

export class InvalidCustomerType extends Error<'InvalidCustomerType'> {
constructor() {
super('InvalidCustomerType');
}
}