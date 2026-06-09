'use client'

import { ComponentProps, useActionState, useOptimistic, useState, useTransition } from "react"
import { useFormStatus } from "react-dom"
import { requestOutcome } from "@/app/actions"
import type { ActionResult } from "@/app/actions"
import ImageUpload from "@/app/components/ImageUpload"
import OutcomePicker from "@/app/components/OutcomePicker"
import ResultDisplay from "@/app/components/ResultDisplay"

type SubmitButtonProps = {
  disabled?: boolean
}

function SubmitButton({ disabled }: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return <button type="submit" disabled={pending || disabled}>Generate</button>
}

type ImageGenerationFormProps = {
  outcomes: ComponentProps<typeof OutcomePicker>['outcomes']
}

export default function ImageGenerationForm({ outcomes }: ImageGenerationFormProps) {
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
          <div>
            <ImageUpload onSizeError={setSizeError} />
          </div>
          <div>
            <OutcomePicker outcomes={outcomes} />
          </div>
        </div>
        {sizeError && <p>{sizeError}</p>}

        <hr />

        <SubmitButton disabled={!!sizeError} />
      </fieldset>
      <ResultDisplay image={optimisticImage} error={state && 'error' in state ? state.error : null} />
    </form>
  )
}
