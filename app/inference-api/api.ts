import runpod from "runpod-sdk";
import { EndpointCompletedOutput } from "runpod-sdk/src";
import type { paths } from "./schema";

export type RequestPayload = NonNullable<
  paths["/runsync"]["post"]["requestBody"]
>["content"]["application/json"];

export type ResponsePayload =
  paths["/runsync"]["post"]["responses"]["200"]["content"]["application/json"];

const { INFERENCE_TOKEN, INFERENCE_ENDPOINT_ID } = process.env;

const client = runpod(INFERENCE_TOKEN);
const inferenceEndpoint = client.endpoint(INFERENCE_ENDPOINT_ID);

const RUNPOD_TIMEOUT = 60000 * 5;

export function runInferenceWithPolling(input: RequestPayload) {
  return inferenceEndpoint!.runSync({ input }, RUNPOD_TIMEOUT) as Promise<
    EndpointCompletedOutput & { output: ResponsePayload }
  >;
}
