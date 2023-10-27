import { FC } from 'react';
import { Message } from '../utils/Message';
import { ChatInput } from './ChatInput';
import { ChatArea } from './ChatArea';

export const ChatBox: FC<{
  working: boolean;
  messages: Message[];
  streamingMessage: string | undefined;
  onSubmit: (message: string) => void;
}> = ({ messages, streamingMessage, working, onSubmit }) => {
  return (
    <div className="h-screen bg-grey-darkest flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto bg-grey-darkish rounded-xl shadow-md overflow-hidden md:max-w-4xl">
        <ChatArea messages={messages} streamingMessage={streamingMessage} />
        <ChatInput working={working} onSubmit={onSubmit} />
      </div>
    </div>
  );
};
