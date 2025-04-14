'use client'

import { Character, StatLevelKey, Stats } from "@/types/character"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts";
import { getMaxStatValuesPerLevelKey } from "@/data/characters";

interface RadarChartComparisonProps {
    characters: Character[] | undefined;
    includeHpMp?: boolean;
    lsPoints: StatLevelKey;
}

export default function RadarChartComparison({ characters, includeHpMp, lsPoints }: RadarChartComparisonProps) {
    if (!characters || characters.length === 0) {
        return null;
    }

    const maxStatValuesPerLevelKey = getMaxStatValuesPerLevelKey();

    const maxHPValues = maxStatValuesPerLevelKey[lsPoints].HP;
    const maxMPValues = maxStatValuesPerLevelKey[lsPoints].MP;
    const maxMainStatValues = maxStatValuesPerLevelKey[lsPoints].mainStat;

    const statsKey = [
        'PWR',
        'INT',
        'SPD',
        'END',
        'SPR',
        'LCK',
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
                dataPoint[character.name] = character.stats[lsPoints].HP / maxHPValues * maxMainStatValues;
                dataPoint[`${character.name}Original`] = character.stats[lsPoints].HP;
            } else if (key == "MP") {
                dataPoint[character.name] = character.stats[lsPoints].MP / maxMPValues * maxMainStatValues;
                dataPoint[`${character.name}Original`] = character.stats[lsPoints].MP;
            } else {
                dataPoint[character.name] = character.stats[lsPoints][key as keyof Stats];
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
                <PolarRadiusAxis domain={[0, maxMainStatValues]} angle={30} />
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