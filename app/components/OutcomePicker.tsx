'use client'
import { getPublicOutcomes } from "@/outcomes"

type OutcomePickerProps = {
  outcomes: ReturnType<typeof getPublicOutcomes>
}

export default function OutcomePicker({ outcomes }: OutcomePickerProps) {
  return (
    <>
      <label htmlFor="outcomeId">Outcome</label>
      <select id="outcomeId" name="outcomeId" defaultValue={outcomes[0]?.id}>
        {outcomes.map(({ id, title }) => (
          <option key={id} value={id}>{title}</option>
        ))}
      </select>
    </>
  )
}
