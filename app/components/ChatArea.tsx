import { FC, useLayoutEffect, useRef, useState } from 'react';
import { Message } from '../utils/Message';
import { FiSettings } from 'react-icons/fi';
import { ChatSettings } from './ChatSettings';
import { ChatBubble } from './ChatBubble';

export const ChatArea: FC<{
  messages: Message[];
  streamingMessage: string | undefined;
}> = ({ messages, streamingMessage }) => {
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const [showSettings, setShowSettings] = useState(false);
  useLayoutEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [streamingMessage, messages]);

  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div>
      <div>
        <div className="uppercase tracking-wide text-sm text-primary font-semibold p-8 flex justify-between items-center">
          <div className="text-primary">
            Rivet Q&A Bot - Ask any question about Rivet!
          </div>
          <div>
            <FiSettings
              onClick={handleSettingsClick}
              className="cursor-pointer text-primary"
            />
          </div>
        </div>
        {showSettings && <ChatSettings />}
        <div
          ref={chatAreaRef}
          className="block mt-1 text-lg leading-tight font-medium text-foreground break-words overflow-y-auto h-150 p-4 bg-grey-darker"
        >
          {messages.map((message, index) => (
            <ChatBubble key={index} message={message} />
          ))}
          {streamingMessage && (
            <ChatBubble
              message={{ type: 'assistant', content: streamingMessage }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
