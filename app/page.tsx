import { getOutcomes } from "@/outcomes"
import ImageGenerationForm from "@/app/components/ImageGenerationForm"

export default function Home() {
  const outcomes = getOutcomes()

  return (
    <main>
      <h1>Face Value</h1>
      <ImageGenerationForm outcomes={outcomes} />
    </main>
  )
}
