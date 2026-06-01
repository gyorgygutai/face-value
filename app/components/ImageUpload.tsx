'use client'

import { MAX_FILE_SIZE } from "@/constants"

export default function ImageUpload({ onSizeError }: { onSizeError: (error: string | null) => void }) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    onSizeError(file && file.size > MAX_FILE_SIZE ? "❌ Image exceeds 5MB limit" : null)
  }

  return (
    <>
      <label htmlFor="image">Reference image</label>
      <input id="image" type="file" name="image" accept="image/*" required onChange={handleChange} />
    </>
  )
}
