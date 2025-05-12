export interface Mapper<T> {
  toPersistance(object: T): object;
  toDomain(object: object): T;
  toDTO(object: T): object;
}
