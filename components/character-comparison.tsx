"use client"

import { characters } from "@/data/characters";
import { Character, StatLevelKey } from "@/types/character";
import { useState } from "react";
import { Button } from "./ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import CharacterSelector from "./character-selector";
import RadarChartComparison from "./radar-chart-comparison";
import { Checkbox } from "./ui/checkbox";
import HpMpComparisonCard from "./hp-mp-comparison.card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function CharacterComparison() {
    const [includeHpMp, setIncludeHpMp] = useState(false);
    const [selectedLSPoints, setSelectedLSPoints] = useState<StatLevelKey>("base");
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
            <p>Select up to 4 characters to compare their stats.</p>

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
                <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
                    {/* <p>Select up to 4 characters to compare their stats.</p> */}

                    <div className="flex items-center gap-4 md:ml-auto">
                        <span>Light/Shadow Points:</span>
                        <Select value={selectedLSPoints} onValueChange={(value) => setSelectedLSPoints(value as StatLevelKey)}>
                            <SelectTrigger className="w-[100px] md:w-[220px]">
                                <SelectValue placeholder="Select Light/Shadow Points" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="base">Base</SelectItem>
                                <SelectItem value="ls5">5</SelectItem>
                                <SelectItem value="ls15">15</SelectItem>
                                <SelectItem value="ls30">30</SelectItem>
                                <SelectItem value="ls50">50</SelectItem>
                                <SelectItem value="ls75">75</SelectItem>
                                <SelectItem value="ls105">105</SelectItem>
                                <SelectItem value="ls140">140</SelectItem>
                                <SelectItem value="ls175">175</SelectItem>
                                <SelectItem value="ls215">215</SelectItem>
                                <SelectItem value="ls255">255</SelectItem>
                                <SelectItem value="ls80sa">80 SA</SelectItem>
                                <SelectItem value="ls255sa">255 SA</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {!includeHpMp && (
                        <div className="flex-1 w-full flex flex-col gap-4 order-2 md:order-1">
                            <HpMpComparisonCard characters={selectedCharacters} lsPoints={selectedLSPoints} />
                            <HpMpComparisonCard characters={selectedCharacters} isMp={true} lsPoints={selectedLSPoints} />
                        </div>
                    )}

                    <div className="flex-1 flex flex-col items-center justify-center w-full h-full p-4 order-1 md:order-2">
                        <RadarChartComparison characters={selectedCharacters} includeHpMp={includeHpMp} lsPoints={selectedLSPoints} />

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
                </div>

            </div>
        </div>
    )
}