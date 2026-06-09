import runpod  from 'runpod-sdk'
import { EndpointCompletedOutput }  from 'runpod-sdk/src'
import type { RequestPayload, ResponsePayload } from "./schema"

const { INFERENCE_TOKEN, INFERENCE_ENDPOINT_ID } = process.env

const client = runpod(INFERENCE_TOKEN)
const inferenceEndpoint = client.endpoint(INFERENCE_ENDPOINT_ID)

async function runEndpoint<TRequestPayload, TResponsePayload>(input: TRequestPayload) {
  return (
    await inferenceEndpoint!.runSync({ input })
  ) as EndpointCompletedOutput & { output: TResponsePayload }
  
}

export function runInferenceWithPolling(input: RequestPayload) {
  return runEndpoint<RequestPayload, ResponsePayload>(input)
}

