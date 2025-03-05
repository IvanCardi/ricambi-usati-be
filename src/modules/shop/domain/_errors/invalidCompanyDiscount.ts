import { Error } from '../../../../shared';

export class InvalidCompanyDiscount extends Error<'InvalidCompanyDiscount'> {
constructor() {
super('InvalidCompanyDiscount');
}
}