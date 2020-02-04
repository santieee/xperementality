import { Chat } from "./chat.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Chat)
export class ChatRepository extends Repository<Chat> {}
