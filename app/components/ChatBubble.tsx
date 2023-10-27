import { FC } from 'react';
import { Message } from '../utils/Message';

export const ChatBubble: FC<{
  message: Message;
}> = ({ message }) => {
  return (
    <div
      className={`p-2 rounded-lg my-2 whitespace-pre-wrap ${
        message.type === 'user'
          ? 'bg-primary text-foreground-on-primary ml-10 text-right'
          : message.type === 'assistant'
          ? 'bg-grey-light text-grey-darker mr-10'
          : 'bg-red-200 mr-auto'
      }`}
    >
      <p>{message.content}</p>
    </div>
  );
};
