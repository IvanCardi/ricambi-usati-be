import { Error } from '../../../../shared';

export class EmptyCarPartNumbers extends Error<'EmptyCarPartNumbers'> {
constructor() {
super('EmptyCarPartNumbers');
}
}