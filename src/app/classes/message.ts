import { Timestamp } from '@firebase/firestore-types';
import { Sender } from './sender';

export class Message {
    message: string;
    createDt: Date;
    sender: Sender;

    constructor(message, createDt: Timestamp, sender: Sender) {
        this.message = message;
        this.createDt = createDt.toDate();
        this.sender = new Sender(sender);
    }
}
