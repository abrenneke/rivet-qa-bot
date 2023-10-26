import { Dispatch, SetStateAction } from 'react';
import { fetchJSONEventStream } from '../utils/clientStreaming';
import { Message } from '../utils/Message';
import { useRecoilValue } from 'recoil';
import { openaiApiKeyState } from '../state/settings';

export function useSubmitMessage({
  setWorking,
  messages,
  setMessages,
  setStreamingMessage,
}: {
  messages: Message[];
  setWorking: Dispatch<SetStateAction<boolean>>;
  setMessages: Dispatch<SetStateAction<Message[]>>;
  setStreamingMessage: Dispatch<SetStateAction<string | undefined>>;
}) {
  const apiKey = useRecoilValue(openaiApiKeyState);

  const handleSubmit = async (message: string) => {
    setWorking(true);

    const userMessage = { type: 'user', content: message } as const;
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);

    const apiMessages = newMessages.filter(
      (message) => message.type !== 'error'
    );
    const chunks = fetchJSONEventStream('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: apiMessages }),
      headers: {
        'openai-api-key': apiKey,
      },
    });

    let completeMessage = '';
    for await (const chunk of chunks) {
      completeMessage += chunk.data as string;
      setStreamingMessage(completeMessage);
    }

    setMessages((messages) => [
      ...messages,
      { type: 'assistant', content: completeMessage },
    ]);
    setStreamingMessage(undefined);

    setWorking(false);
  };

  return handleSubmit;
}
