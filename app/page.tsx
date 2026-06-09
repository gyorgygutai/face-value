import { getPublicOutcomes } from "@/outcomes"
import ImageGenerationForm from "@/app/components/ImageGenerationForm"

export default function Home() {
  const outcomes = getPublicOutcomes()

  return (
    <main>
      <h1>Face Value</h1>
      <ImageGenerationForm outcomes={outcomes} />
    </main>
  )
}
