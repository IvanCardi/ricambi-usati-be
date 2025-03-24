import { Error } from '../../../../shared';

export class InvalidFiscalCode extends Error<'InvalidFiscalCode'> {
constructor() {
super('InvalidFiscalCode');
}
}