import * as Rivet from '@ironclad/rivet-node';
import { resolve } from 'node:path';
import { readFile } from 'node:fs/promises';

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

  const dataset = await readFile(
    resolve('./app/Rivet Docs Analyzer.rivet-data'),
    'utf8'
  );
  const datasetProvider = new Rivet.InMemoryDatasetProvider(
    Rivet.deserializeDatasets(dataset)
  );

  const project = await Rivet.loadProjectFromFile(
    // Resolve is necessary so that Vercel includes this file in the deployment
    resolve('./app/Rivet Docs Analyzer.rivet-project')
  );

  const processor = Rivet.createProcessor(project, {
    graph: 'RAG Query Plus (Subgraph)',
    inputs: {
      input: {
        type: 'string',
        value: chatMessages[chatMessages.length - 1].message,
      },
    },
    openAiKey: apiKeyToUse,
    openAiOrganization: process.env.OPENAI_ORG_ID,
    datasetProvider,
  });

  processor.run();

  return new Response(processor.streamNode('a65X6fcItmiROiBa0l05S'), {
    headers: {
      'content-type': 'text/event-stream; charset=utf-8',
    },
  });
}
