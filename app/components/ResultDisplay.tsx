'use client'

import { ActionError } from "../types"

const ERROR_MESSAGES = {
  [ActionError.SERVER_TIMEOUT]: "❌ Server timed out, please try again",
  [ActionError.OUTCOME_MISSING]: "❌ No outcome selected",
  [ActionError.OUTCOME_INVALID]: "❌ Invalid outcome selected",
  [ActionError.INPUT_IMAGE_MISSING]: "❌ Please upload an image",
  [ActionError.INPUT_IMAGE_TOO_LARGE]: "❌ Image exceeds 5MB limit",
  [ActionError.INPUT_IMAGE_TYPE_NOT_ALLOWED]: "❌ File type not supported",
}

type ResultDisplayProps = {
  image: string | "loading" | null
  error: ActionError | null
}

export default function ResultDisplay({ image, error }: ResultDisplayProps) {
  return (
    <>
      {error && !image && <p>{ERROR_MESSAGES[error] ?? error}</p>}
      {image === "loading" && <p>Generating...</p>}
      {image && image !== "loading" && (
        <>
          <img src={image} alt="Generated" />
          <hr />
          <a href={image} download="generated.jpg">Download</a>
        </>
      )}
    </>
  )
}
