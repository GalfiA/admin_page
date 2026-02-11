"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

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

export const description = "A donut chart with text"

const chartData = [
  { source: "Cl2", value: 40100, fill: "var(--chart-5)"},
  { source: "MDI", value: 28790, fill: "var(--ring)" },
  { source: "NaOH", value: 10385, fill: "var(--chart-3)" },
  { source: "PVC", value: 7820, fill: "var(--foreground)" },
  { source: "TDI", value: 4791, fill: "var(--chart-2)" },
]

const chartConfig = {
  value: {
    label: "Value",
  },
  cl2: {
    label: "Cl2",
    color: "var(--chart-1)",
  },
  mdi: {
    label: "MDI",
    color: "var(--chart-2)",
  },
  naoh: {
    label: "NaOH",
    color: "var(--chart-3)",
  },
  pvc: {
    label: "PVC",
    color: "var(--chart-4)",
  },
  tdi: {
    label: "TDI",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function ChartPieDonut() {
  const totalValue = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Production Mix</CardTitle>
        <CardDescription>Current Month</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="source"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalValue.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          Shows the production of different chemicals for the current month.
        </div>
      </CardFooter>
    </Card>
  )
}
