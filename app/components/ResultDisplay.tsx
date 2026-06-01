'use client'

export default function ResultDisplay({ image, error }: { image: string | "loading" | null, error: string | null }) {
  return (
    <>
      {error && <p>❌ {error}</p>}
      {image === "loading" && <p>Generating...</p>}
      {image && image !== "loading" && (
        <>
          <img src={image} alt="Generated" />
          <a href={image} download="generated.jpg">Download</a>
        </>
      )}
    </>
  )
}
