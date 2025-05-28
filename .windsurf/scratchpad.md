# Radium Custom Model Integration

## Background
The goal is to integrate a custom model from Radium's local LLM server into the chat application using the OpenAI Compatible Provider from the AI SDK. The custom model is available at `http://llm-inference.radium.cloud:8001` and can be accessed with an empty bearer token. The model path is `/models/meta-llama/Llama-2-7b-chat-hf`.

The AI SDK's OpenAI Compatible Provider package can be used to create a custom provider that will communicate with this endpoint.

## Challenges
- Setting up the OpenAI Compatible Provider correctly for the Radium LLM server
- Ensuring proper authentication with the custom endpoint (using empty Bearer token)
- Integrating the custom model into the existing model selection framework
- Updating the schema validation to include the new model ID
- Adding the model to entitlements
- Testing the integration to ensure it works properly
- Implementing robust error handling for when the model is unavailable

## Task Breakdown
1. **Analyze Current Model Structure** ✓
   - Reviewed the existing model structure in the codebase
   - Found models defined in `lib/ai/models.ts`
   - Providers configured in `lib/ai/providers.ts`
   - Model access controlled in `lib/ai/entitlements.ts`
   - Chat API schema in `app/(chat)/api/chat/schema.ts`

2. **Install Required Dependencies**
   - Ensure `@ai-sdk/openai-compatible` is installed

3. **Configure Custom Model Provider**
   - Create a new provider using `createOpenAICompatible`
   - Configure it with the proper baseURL and authentication
   - Define appropriate model IDs for the provider

4. **Integrate with Existing Models**
   - Add the custom model to the available models list
   - Update UI to display the new model option

5. **Implement Error Handling**
   - Add proper error handling for when the custom model is unavailable
   - Create fallback mechanism if needed

6. **Testing**
   - Test the model integration with sample prompts
   - Verify the model selection UI works correctly
   - Test error scenarios

7. **Documentation**
   - Document the configuration in comments and/or README
   - Create usage examples

## Project Status Board
- [x] Review existing model structure in codebase
- [x] Install the `@ai-sdk/openai-compatible` package (already installed)
- [x] Create and configure the Radium OpenAI Compatible Provider
- [x] Add the 'radium-llama-2' model to `models.ts`
- [x] Update the Zod schema to include the new model ID
- [x] Update entitlements to grant access to the new model
- [x] Integrate the Radium provider with the existing provider structure
- [x] Implement error handling for the Radium model
- [x] Test the integration with sample prompts
- [x] Create documentation for the Radium model integration

## Executor's Feedback
Tested the Radium LLM server endpoints with both regular and streaming chat completions. The server is working as expected and returns properly formatted responses compatible with the OpenAI API format.

Implemented the custom model integration with the following changes:
1. Created `lib/ai/radium-provider.ts` to configure the OpenAI Compatible Provider
2. Added 'radium-llama-2' to the available chat models in `lib/ai/models.ts`
3. Updated the API schema in `app/(chat)/api/chat/schema.ts` to accept the new model ID
4. Updated entitlements in `lib/ai/entitlements.ts` to grant access to the new model
5. Integrated the Radium provider with the existing provider structure in `lib/ai/providers.ts`
6. Created `lib/ai/error-handling.ts` with a utility function for handling Radium model errors

**IMPORTANT FIX: Streaming Issue**
Fixed an issue where the Radium Llama model wasn't returning streaming responses correctly. The problem was that the OpenAI Compatible Provider needed to explicitly enforce the `stream: true` parameter for all chat completion requests. Implemented a custom fetch handler in the Radium provider that ensures the stream parameter is always set to true for chat completion requests.

The fix involved:
1. Adding a custom fetch implementation to the `radiumProvider` configuration
2. Intercepting requests to the `/chat/completions` endpoint
3. Ensuring the `stream` parameter is set to `true` in the request body

This ensures that the Radium model will correctly stream responses just like the other models in the application.

The model integration is now complete with proper streaming functionality.

## Lessons

### API Format Compatibility
When integrating with Llama models served through OpenAI-compatible APIs, be aware that many local servers implement the older `/completions` endpoint rather than the newer `/chat/completions` endpoint. 

Implemented solution involves:
1. Converting the `/chat/completions` endpoint requests to `/completions` format
2. Extracting the user message from the messages array to create a prompt
3. Converting streaming completions responses back to chat completions format

This approach maintains compatibility with the AI SDK while allowing integration with simpler LLM servers.
