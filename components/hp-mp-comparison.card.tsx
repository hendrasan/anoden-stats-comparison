import { Character } from "@/types/character";

interface HpMpComparisonCardProps {
    characters: Character[] | undefined;
    isMp?: boolean;
}

export default function HpMpComparisonCard({ characters, isMp }: HpMpComparisonCardProps) {
    return (
        <div className="p-4 bg-white border border-muted rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-6">{isMp ? 'MP' : 'HP'}</h2>

            <div className="flex flex-col gap-4">
                {characters?.map((character, index) => (
                    <div key={index} className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <span>{character.name}</span>
                            <span className="font-bold">{isMp ? character.MP : character.HP}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                            <div className="h-1.5 rounded-full" style={{
                                width: `${isMp ? (character.MP / 4000) * 100 : (character.HP / 8800) * 100}%`,
                                backgroundColor: `hsl(var(--chart-${index + 1}))`
                            }} ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}