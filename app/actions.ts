'use server'

import { MAX_FILE_SIZE, ALLOWED_IMAGE_TYPES } from "@/constants"
import { getOutcomeFull } from "@/outcomes"
import type { RequestPayload, ResponsePayload } from "@/types/schema"
import sharp from "sharp"
import runpodSdk from "runpod-sdk"
const { INFERENCE_TOKEN, INFERENCE_ENDPOINT_ID } = process.env

const runpodInstance = runpodSdk(INFERENCE_TOKEN as string) // TODO
const inferenceEndpoint = runpodInstance.endpoint(INFERENCE_ENDPOINT_ID as string) // TODO

export type FormState = {
  image: string | null
  error: string | null
}

// TODO needs to be properly typed
export async function requestOutcome(_prev: FormState, formData: FormData): Promise<FormState> {
  const file = formData.get("image")
  const outcomeId = formData.get("outcomeId")

  // TODO extract validation
  if (!(file instanceof File) || file.size === 0) {
    return { image: null, error: "❌ Reference image is required" }
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { image: null, error: "❌ Image must be JPEG, PNG, or WebP" }
  }

  if (file.size > MAX_FILE_SIZE) {
    return { image: null, error: "❌ Image exceeds 5MB limit" }
  }

  if (typeof outcomeId !== "string" || !outcomeId) {
    return { image: null, error: "❌ Outcome is required" }
  }

  const outcome = getOutcomeFull(outcomeId)
  if (!outcome) {
    return { image: null, error: "❌ Invalid outcome" }
  }

  if (!inferenceEndpoint) {
    return { image: null, error: "❌ Inference server not configured" }
  }

  const buffer = await file.arrayBuffer()
  const resized = await sharp(Buffer.from(buffer))
    .resize(512, 512, { fit: "inside" })
    .toBuffer()

  const input = {
    ...outcome,
    input_image: resized.toString("base64")
  } as RequestPayload

  try {
    const response = await inferenceEndpoint.runSync({ input }) as { output: ResponsePayload }

    return { image: `data:image/png;base64,${response.output.image}`, error: null }
  } catch {
     return { image: null, error: "❌ Inference server timed out" }
  }
}
