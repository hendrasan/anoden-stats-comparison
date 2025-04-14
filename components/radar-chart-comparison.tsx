'use client'

import { Character } from "@/types/character"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts";

interface RadarChartComparisonProps {
    characters: Character[] | undefined;
    includeHpMp?: boolean;
}

export default function RadarChartComparison({ characters, includeHpMp }: RadarChartComparisonProps) {
    if (!characters || characters.length === 0) {
        return null;
    }

    const statsKey = [
        'PWR',
        'INT',
        'SPD',
        'END',
        'SPR',
        'LCK',
        // 'HP',
        // 'MP',
    ];

    if (includeHpMp) {
        statsKey.push('HP', 'MP');
    }

    const data = statsKey.map((key) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const dataPoint: Record<string, any> = {
            stat: key
        };

        characters.forEach((character) => {
            if (key == "HP") {
                dataPoint[character.name] = character.HP / 8800 * 350;
                dataPoint[`${character.name}Original`] = character.HP;
            } else if (key == "MP") {
                dataPoint[character.name] = character.MP / 4000 * 350;
                dataPoint[`${character.name}Original`] = character.MP;
            } else {
                dataPoint[character.name] = character[key as keyof Character];
            }
        });

        return dataPoint;
    });

    const chartConfig = characters.reduce((config, character, index) => {
        config[`char${index + 1}`] = {
            label: character.name,
            color: `hsl(var(--chart-${index + 1}))`,
        };
        return config;
    }, {} as ChartConfig);

    return (
        <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square min-h-[320px]"
        >
            <RadarChart data={data}>
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <PolarAngleAxis dataKey="stat" />
                <PolarRadiusAxis domain={[0, 350]} angle={30} />
                <PolarGrid />
                {characters.map((character, index) => (
                    <Radar
                        key={character.name + index}
                        name={character.name}
                        dataKey={character.name}
                        fill={`var(--color-char${index + 1})`}
                        fillOpacity={0.6}
                    />
                ))}
            </RadarChart>
        </ChartContainer>
    )
}