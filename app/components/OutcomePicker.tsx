'use client'

import type { Outcome } from "@/outcomes"

export default function OutcomePicker({ outcomes }: { outcomes: Outcome[] }) {
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
