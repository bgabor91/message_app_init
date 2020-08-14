import { Message } from '../models/message';

interface MessageSerializer {
    title: string;
    content: string;
}

const show = (message: Message): MessageSerializer => {
    return {
        title: message.title,
        content: message.content
    };
};

const index = (messages: Array<Message>): Array<MessageSerializer> => {
    return messages.map(message => show(message));
};

export default {
    show,
    index
};
