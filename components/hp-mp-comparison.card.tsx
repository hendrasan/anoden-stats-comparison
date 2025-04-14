import { getMaxStatValuesPerLevelKey } from "@/data/characters";
import { Character, StatLevelKey } from "@/types/character";

interface HpMpComparisonCardProps {
    characters: Character[] | undefined;
    isMp?: boolean;
    lsPoints: StatLevelKey;
}

export default function HpMpComparisonCard({ characters, isMp, lsPoints }: HpMpComparisonCardProps) {
    const maxStatValuesPerLevelKey = getMaxStatValuesPerLevelKey();

    const maxHPValues = maxStatValuesPerLevelKey[lsPoints].HP;
    const maxMPValues = maxStatValuesPerLevelKey[lsPoints].MP;

    return (
        <div className="p-4 bg-white border border-muted rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-6">{isMp ? 'MP' : 'HP'}</h2>

            <div className="flex flex-col gap-4">
                {characters?.map((character, index) => (
                    <div key={index} className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <span>{character.name}</span>
                            <span className="font-bold">{isMp ? character.stats[lsPoints].MP : character.stats[lsPoints].HP}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                            <div className="h-1.5 rounded-full" style={{
                                width: `${isMp ? (character.stats[lsPoints].MP / maxMPValues) * 100 : (character.stats[lsPoints].HP / maxHPValues) * 100}%`,
                                backgroundColor: `hsl(var(--chart-${index + 1}))`
                            }} ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}