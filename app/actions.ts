"use server"

import { MAX_FILE_SIZE, ALLOWED_IMAGE_TYPES } from "@/constants"
import { getInferenceOutcome } from "@/outcomes"
import { runInferenceWithPolling } from "./inference-api"
import sharp from "sharp"

export enum ActionError {
  SERVER_TIMEOUT = "SERVER_TIMEOUT",

  OUTCOME_MISSING = "OUTCOME_MISSING",
  OUTCOME_INVALID = "OUTCOME_INVALID",

  INPUT_IMAGE_MISSING = "INPUT_IMAGE_MISSING",
  INPUT_IMAGE_TOO_LARGE = "INPUT_IMAGE_TOO_LARGE",
  INPUT_IMAGE_TYPE_NOT_ALLOWED = "INPUT_IMAGE_TYPE_NOT_ALLOWED",
}

export type ActionResult = { imageBase64: string } | { error: ActionError };

async function resizeImage(file: File) {
  const buffer = await file.arrayBuffer()

  return await sharp(Buffer.from(buffer))
    .resize(512, 512, { fit: "inside" })
    .toBuffer()
}

export async function requestOutcome(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const file = formData.get("image")

  if (!(file instanceof File) || file.size === 0) {
    return { error: ActionError.INPUT_IMAGE_MISSING }
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { error: ActionError.INPUT_IMAGE_TYPE_NOT_ALLOWED }
  }

  if (file.size > MAX_FILE_SIZE) {
    return { error: ActionError.INPUT_IMAGE_TOO_LARGE }
  }

  const outcomeId = formData.get("outcomeId")
  if (typeof outcomeId !== "string" || !outcomeId) {
    return { error: ActionError.OUTCOME_MISSING }
  }

  const outcome = getInferenceOutcome(outcomeId)
  if (!outcome) {
    return { error: ActionError.OUTCOME_INVALID }
  }

  const resizedImage = await resizeImage(file)

  try {
    const response = await runInferenceWithPolling({
      ...outcome,
      input_image: resizedImage.toString("base64"),
    })

    return { imageBase64: `data:image/png;base64,${response.output.image}` }
  } catch {
    return { error: ActionError.SERVER_TIMEOUT }
  }
}
