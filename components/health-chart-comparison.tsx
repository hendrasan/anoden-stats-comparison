'use client'

import { Character } from "@/types/character"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";

interface HealthChartComparisonProps {
    characters: Character[] | undefined;
}

export default function HealthChartComparison({ characters }: HealthChartComparisonProps) {
    if (!characters || characters.length === 0) {
        return null;
    }

    const data = [
        ...characters.map((character, index) => ({
            name: character.name,
            value: character.HP,
            fill: `hsl(var(--chart-${index + 1}))`,
        })),
    ];

    const chartConfig = {
        value: {
            label: 'HP'
        }
    } satisfies ChartConfig;

    return (
        <ChartContainer
            config={chartConfig}
            className="max-h-[200px] w-full"
        >
            <BarChart
                accessibilityLayer
                layout="vertical"
                data={data}
                barCategoryGap={"20%"}
                barGap={0}
                margin={{
                    left: 50,
                    right: 50,
                }}
            >
                <CartesianGrid vertical={true} />
                <YAxis
                    dataKey="name"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                />
                <XAxis dataKey="value" type="number" hide />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                    dataKey="value"
                    radius={4}
                    barSize={20}
                    width={100}
                >
                    <LabelList
                        position="right"
                        offset={8}
                        className="fill-foreground"
                        fontSize={12}
                    />
                </Bar>
            </BarChart>
        </ChartContainer>
    )
}