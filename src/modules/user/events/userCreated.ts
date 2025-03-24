import { EventEmitter } from "../../../shared";

export type UserCreated = {
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  vat?: string;
  isAutomotive?: boolean;
  pec?: string;
  sdi?: string;
};

const UserCreatedEmitter = EventEmitter<UserCreated>("UserCreated");

export default UserCreatedEmitter;
