import * as Rivet from '@ironclad/rivet-core';

import rivetProject from '../../Rivet Docs Analyzer.rivet-project';
import rivetData from '../../Rivet Docs Analyzer.rivet-data';
import { getSingleNodeStream } from './streaming';

export const runtime = 'edge';

export async function POST(request: Request) {
  const body = await request.json();

  const openAiKey = request.headers.get('openai-api-key');

  // You may specifiy an OPENAI_API_KEY environment variable to use as the default key in
  // your Vercel deployment environment variables (https://vercel.com/docs/environment-variables)
  const apiKeyToUse = openAiKey || process.env.OPENAI_API_KEY;

  if (!apiKeyToUse?.trim()) {
    return new Response('Missing OpenAI API Key', {
      status: 400,
    });
  }

  const chatMessages = (body.messages as unknown[]).map(
    (message: any): Rivet.ChatMessage => ({
      type: message.type as 'user' | 'assistant',
      message: message.content as string,
      name: undefined,
      function_call: undefined,
    })
  );

  const datasetProvider = new Rivet.InMemoryDatasetProvider(
    Rivet.deserializeDatasets(rivetData)
  );

  const [project] = Rivet.deserializeProject(rivetProject);

  const graphId = Object.values(project.graphs).find(
    (p) => p.metadata!.name! === 'RAG Query Plus (Subgraph)'
  )!.metadata!.id!;

  const processor = new Rivet.GraphProcessor(project, graphId);

  processor.processGraph(
    {
      settings: {
        openAiKey: apiKeyToUse,
        openAiOrganization: process.env.OPENAI_ORG_ID,
      },
      datasetProvider,
    },
    {
      input: {
        type: 'string',
        value: chatMessages[chatMessages.length - 1].message,
      },
    }
  );

  return new Response(getSingleNodeStream(processor, 'a65X6fcItmiROiBa0l05S'), {
    headers: {
      'content-type': 'text/event-stream; charset=utf-8',
    },
  });
}
