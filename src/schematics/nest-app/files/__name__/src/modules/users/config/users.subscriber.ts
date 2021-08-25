import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from "typeorm";
import { User } from "../entities/user.entity";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(connection: Connection) {
    if (connection && connection.subscribers) {
      connection.subscribers.push(this);
    }
  }

  listenTo() {
    return User;
  }

  afterInsert(event: InsertEvent<User>) {
    console.log(`AFTER USER INSERTED: `, event.entity);
  }
}
