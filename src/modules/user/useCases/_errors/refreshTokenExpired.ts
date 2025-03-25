import { Error } from '../../../../shared';

export class RefreshTokenExpired extends Error<'RefreshTokenExpired'> {
constructor() {
super('RefreshTokenExpired');
}
}