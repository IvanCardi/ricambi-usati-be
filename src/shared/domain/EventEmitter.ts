import EventEmitter from "events";

export function EventEmitterBuilder<T>(eventName: string) {
  abstract class EventEmitterClass {
    private static emitter = new EventEmitter();

    static readonly eventName = eventName;

    static emit(event: T) {
      this.emitter.emit(eventName, event);
      console.log(`Event Emitted => ${eventName}`);
    }

    static on(listener: (event: T) => void) {
      this.emitter.on(eventName, listener);
    }
  }

  return EventEmitterClass;
}
