import ScoreCalculator from "../src/components/ScoreCalculator";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">FIKA Score Calculator</h1>
      <ScoreCalculator />
    </main>
  )
}
