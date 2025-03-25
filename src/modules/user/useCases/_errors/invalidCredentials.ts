import { Error } from '../../../../shared';

export class InvalidCredentials extends Error<'InvalidCredentials'> {
constructor() {
super('InvalidCredentials');
}
}