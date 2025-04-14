"use client"

import { characters } from "@/data/characters";
import { Character } from "@/types/character";
import { useState } from "react";
import { Button } from "./ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import CharacterSelector from "./character-selector";
import RadarChartComparison from "./radar-chart-comparison";
import { Checkbox } from "./ui/checkbox";
import HpMpComparisonCard from "./hp-mp-comparison.card";

export default function CharacterComparison() {
    const [includeHpMp, setIncludeHpMp] = useState(false);
    const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([characters[0], characters[1]]);

    const maxCharactersReached = selectedCharacters.length >= 4;

    const handleCharacterSelect = (character: Character, index: number) => {
        const newSelectedCharacters = [...selectedCharacters]
        newSelectedCharacters[index] = character;
        setSelectedCharacters(newSelectedCharacters);
    }

    const handleAddCharacter = () => {
        const availableCharacter = characters.find(
            (char) => !selectedCharacters.some((selected) => selected.name === char.name),
        )

        if (availableCharacter) {
            setSelectedCharacters([...selectedCharacters, availableCharacter])
        }
    }

    const handleRemoveCharacter = (index: number) => {
        // if (selectedCharacters.length <= 2) return;

        const newSelectedCharacters = [...selectedCharacters];
        newSelectedCharacters.splice(index, 1);
        setSelectedCharacters(newSelectedCharacters);
    }

    return (
        <div className="space-y-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {selectedCharacters.map((character, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <CharacterSelector
                            characters={characters}
                            selectedCharacter={character}
                            onSelect={(char) => handleCharacterSelect(char, index)}
                        />

                        {selectedCharacters.length > 2 && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => { handleRemoveCharacter(index) }}
                                className="shrink-0"
                            >
                                <Trash2 className="w-4 h-4" />
                                <span className="sr-only">Remove character</span>
                            </Button>
                        )}
                    </div>
                ))}

                {!maxCharactersReached && (selectedCharacters.length < characters.length && (
                    <Button variant="outline" onClick={handleAddCharacter} className="flex items-center gap-2">
                        <PlusCircle className="w-4 h-4" />
                        Add Character
                    </Button>
                ))}

            </div>

            <div className="p-6 border rounded-lg">
                <div className="flex justify-between mb-6">
                    <p>Select up to 4 characters to compare their stats.</p>

                    <div className="flex items-center space-x-2">
                        <Checkbox id="separate" checked={includeHpMp} onCheckedChange={(checked) => setIncludeHpMp(checked === true)} />
                        <label
                            htmlFor="separate"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Include HP and MP in chart
                        </label>
                    </div>
                </div>

                <div className="flex md:flex-row md:items-center gap-4">
                    {!includeHpMp && (
                        <div className="flex-1 w-full flex flex-col gap-4">
                            <HpMpComparisonCard characters={selectedCharacters} />
                            <HpMpComparisonCard characters={selectedCharacters} isMp={true} />
                        </div>
                    )}

                    <div className="flex-1 flex flex-col items-center justify-center w-full h-full p-4">
                        <RadarChartComparison characters={selectedCharacters} includeHpMp={includeHpMp} />
                    </div>
                </div>

            </div>
        </div>
    )
}