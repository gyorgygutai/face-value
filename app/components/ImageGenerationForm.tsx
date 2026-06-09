'use client'

import { useActionState, useOptimistic, useState, useTransition } from "react"
import { useFormStatus } from "react-dom"
import { requestOutcome } from "@/app/actions"
import type { ActionResult } from "@/app/actions"
import ImageUpload from "@/app/components/ImageUpload"
import OutcomePicker from "@/app/components/OutcomePicker"
import ResultDisplay from "@/app/components/ResultDisplay"

function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus()
  return <button type="submit" disabled={pending || disabled}>{pending ? "Generating..." : "Generate"}</button>
}

export default function ImageGenerationForm({ outcomes }: { outcomes: { id: string; title: string }[] }) {
  const [state, action] = useActionState<ActionResult | null, FormData>(requestOutcome, null)
  const [optimisticImage, setOptimisticImage] = useOptimistic<string | "loading" | null>(
    state && 'imageBase64' in state ? state.imageBase64 : null
  )
  const [sizeError, setSizeError] = useState<string | null>(null)
  const [, startTransition] = useTransition()

  function handleAction(formData: FormData) {
    if (sizeError) {
      return
    }
    
    startTransition(() => {
      setOptimisticImage("loading")
      action(formData)
    })
  }

  return (
    <form action={handleAction}>
      <fieldset>
        <div>
          <ImageUpload onSizeError={setSizeError} />
          <OutcomePicker outcomes={outcomes} />
        </div>
        {sizeError && <p>{sizeError}</p>}
        <hr />
        <SubmitButton disabled={!!sizeError} />
      </fieldset>
      <ResultDisplay image={optimisticImage} error={state && 'error' in state ? state.error : null} />
    </form>
  )
}
