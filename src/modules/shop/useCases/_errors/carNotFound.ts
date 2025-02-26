import { Error } from '../../../../shared';

export class CarNotFound extends Error<'CarNotFound'> {
constructor() {
super('CarNotFound');
}
}