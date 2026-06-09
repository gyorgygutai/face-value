'use client'

import { MAX_FILE_SIZE } from "@/constants"

type ImageUploadProps = {
  onSizeError: (error: string | null) => void
}

export default function ImageUpload({ onSizeError }: ImageUploadProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    onSizeError(file && file.size > MAX_FILE_SIZE ? "❌ Image exceeds 5MB limit" : null)
  }

  return (
    <>
      <label htmlFor="image">Face photo</label>
      <input id="image" type="file" name="image" accept="image/*" required onChange={handleChange} />
    </>
  )
}
