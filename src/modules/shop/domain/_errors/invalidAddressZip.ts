import { Error } from '../../../../shared';

export class InvalidAddressZip extends Error<'InvalidAddressZip'> {
constructor() {
super('InvalidAddressZip');
}
}