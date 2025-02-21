export abstract class Mapper<T> {
  abstract toPersistance(object: T): object;
  abstract toDomain(object: ReturnType<typeof this.toPersistance>): T;
  abstract toDTO(object: T): object;
}
