import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

type RadiumModelIds = 
  | '/models/meta-llama/Llama-2-7b-chat-hf' 
  | (string & {});

/**
 * Radium provider for the custom Llama 2 model server
 * This provider directly connects to the OpenAI-compatible endpoint
 */
export const radiumProvider = createOpenAICompatible<
  RadiumModelIds,
  RadiumModelIds,
  never,
  never
>({
  name: 'radium-llm',
  apiKey: 'empty', // The API uses 'empty' as the token
  baseURL: 'http://llm-inference.radium.cloud:8001/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  fetch: async (input: URL | RequestInfo, init?: RequestInit): Promise<Response> => {
    const url = typeof input === 'string' ? input : input.toString();
    console.log(`[RADIUM] Request URL: ${url}`);
    
    try {
      if (init?.body) {
        // Log the request body for debugging
        const bodyContent = init.body.toString();
        console.log(`[RADIUM] Request body: ${bodyContent}`);
        
        try {
          // Parse the body to ensure model path is correct
          const bodyJson = JSON.parse(bodyContent);
          console.log(`[RADIUM] Request model: ${bodyJson.model}`);
          
          // If this is a chat request, ensure it's properly formatted
          if (url.includes('/chat/completions')) {
            console.log(`[RADIUM] Chat messages:`, bodyJson.messages);
          }
        } catch (parseError) {
          console.error('[RADIUM] Error parsing request body:', parseError);
        }
      }
      
      // Make the direct request to the Radium server
      console.log(`[RADIUM] Sending request to: ${url}`);
      const response = await fetch(input, init);
      console.log(`[RADIUM] Response status: ${response.status}`);
      
      // Clone the response so we can log its content while still returning it
      const clonedResponse = response.clone();
      
      try {
        // Try to log response body for debugging
        if (clonedResponse.headers.get('content-type')?.includes('application/json')) {
          const jsonResponse = await clonedResponse.json();
          console.log('[RADIUM] JSON Response:', jsonResponse);
        } else if (clonedResponse.headers.get('content-type')?.includes('text/event-stream')) {
          console.log('[RADIUM] Streaming response detected');
        } else {
          const textResponse = await clonedResponse.text();
          console.log('[RADIUM] Text Response:', textResponse);
        }
      } catch (responseError) {
        console.error('[RADIUM] Error reading response:', responseError);
      }
      
      return response;
    } catch (error) {
      console.error('[RADIUM] Network Error:', error);
      throw error;
    }
  }
});
