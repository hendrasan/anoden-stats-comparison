'use client'

import { Character } from "@/types/character";
import { useEffect, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { cn } from "@/lib/utils";

interface CharacterSelectorProps {
    characters: Character[];
    selectedCharacter: Character;
    onSelect: (character: Character) => void;
}

export default function CharacterSelector({
    characters,
    selectedCharacter,
    onSelect,
}: CharacterSelectorProps) {
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCharacters, setFilteredCharacters] = useState<Character[]>(characters);
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!searchQuery) {
            setFilteredCharacters(characters);
            return;
        }

        const query = searchQuery.toLowerCase();
        const filtered = characters.filter((character) => character.name.toLowerCase().includes(query));

        setFilteredCharacters(filtered);
    }, [searchQuery, characters]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between w-full flex-1">
                    <div className="flex items-center gap-2 truncate">
                        <span className="truncate">{selectedCharacter.name}</span>
                    </div>
                    <ChevronsUpDown className="flex-shrink-0 w-4 h-4 ml-2 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent ref={popoverRef} className="w-[300px] p-0" align="start" side="bottom">
                <Command>
                    <CommandInput
                        placeholder="Search characters..."
                        value={searchQuery}
                        onValueChange={setSearchQuery}
                        className="h-9"
                    />
                    <CommandList className="max-h-[300px] overflow-auto">
                        <CommandEmpty>No characters found.</CommandEmpty>
                        <CommandGroup>
                            {filteredCharacters.map((character) => (
                                <CommandItem
                                    key={character.name}
                                    value={character.name}
                                    onSelect={() => {
                                        onSelect(character)
                                        setOpen(false)
                                        setSearchQuery("")
                                    }}
                                    className="flex items-center gap-2"
                                >
                                    <span className="truncate">{character.name}</span>
                                    <Check
                                        className={cn(
                                            "ml-auto h-4 w-4 flex-shrink-0",
                                            selectedCharacter.name === character.name ? "opacity-100" : "opacity-0",
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}