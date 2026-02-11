"use client"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "Radar chart"

const chartData = [
  { category: "Preventive maintenance", value: 60 },
  { category: "Energy Efficiency", value: 75 },
  { category: "CO2 emission reduction", value: 60 },
  { category: "Water useage reduction", value: 70 },
  { category: "System stability", value: 90 },
  
]

const chartConfig = {
  value: {
    label: "Value (%)",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartRadar() {
  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Grid Performance Metrics</CardTitle>
        <CardDescription>
          A radar chart showing key performance metrics for the grid.
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="category" />
            <PolarGrid />
            <Radar
              dataKey="value"
              fill="var(--primary)"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="text-muted-foreground flex items-center gap-2 leading-none">
          Values: normalized scores (0–100)
        </div>
      </CardFooter>
    </Card>
  )
}
