"use client"

import CharacterComparison from "@/components/character-comparison"

export default function Home() {
  return (
    <main className="container py-10 px-4 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-center">Character Comparison</h1>
      <CharacterComparison />
    </main>
  );
}
