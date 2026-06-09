import runpod from 'runpod-sdk'
import { EndpointCompletedOutput } from 'runpod-sdk/src'
import type { RequestPayload, ResponsePayload } from "./schema"

const { INFERENCE_TOKEN, INFERENCE_ENDPOINT_ID } = process.env

const client = runpod(INFERENCE_TOKEN)
const inferenceEndpoint = client.endpoint(INFERENCE_ENDPOINT_ID)

export function runInferenceWithPolling(input: RequestPayload) {
  return inferenceEndpoint!.runSync({ input }) as Promise<
    EndpointCompletedOutput & { output: ResponsePayload }
  >
}

