import { Error } from '../../../../shared';

export class UserNotFound extends Error<'UserNotFound'> {
constructor() {
super('UserNotFound');
}
}