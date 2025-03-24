import { Error } from '../../../../shared';

export class DuplicatedUser extends Error<'DuplicatedUser'> {
constructor() {
super('DuplicatedUser');
}
}