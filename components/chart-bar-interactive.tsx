"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "Interactive bar chart"

const chartData = [{"date":"2025-11-01","Gas":450,"Used electric":5,"Produced electric":3,"Steam":3,"Heating":0.3},
{"date":"2025-11-02","Gas":414,"Used electric":5.26,"Produced electric":2.99,"Steam":2.92,"Heating":0.33},
{"date":"2025-11-03","Gas":481,"Used electric":5,"Produced electric":2.99,"Steam":3.01,"Heating":0.33},
{"date":"2025-11-04","Gas":476,"Used electric":4.56,"Produced electric":3.08,"Steam":3.09,"Heating":0.29},
{"date":"2025-11-05","Gas":453,"Used electric":5.39,"Produced electric":2.89,"Steam":2.89,"Heating":0.29},
{"date":"2025-11-06","Gas":439,"Used electric":4.51,"Produced electric":3.29,"Steam":2.71,"Heating":0.3},
{"date":"2025-11-07","Gas":480,"Used electric":4.64,"Produced electric":3.17,"Steam":3.3,"Heating":0.27},
{"date":"2025-11-08","Gas":461,"Used electric":4.62,"Produced electric":2.95,"Steam":3.09,"Heating":0.29},
{"date":"2025-11-09","Gas":445,"Used electric":4.73,"Produced electric":3.01,"Steam":2.91,"Heating":0.28},
{"date":"2025-11-10","Gas":435,"Used electric":4.65,"Produced electric":2.76,"Steam":3.14,"Heating":0.32},
{"date":"2025-11-11","Gas":416,"Used electric":5.01,"Produced electric":3.05,"Steam":2.82,"Heating":0.3},
{"date":"2025-11-12","Gas":439,"Used electric":5.18,"Produced electric":2.93,"Steam":3.05,"Heating":0.32},
{"date":"2025-11-13","Gas":451,"Used electric":5.38,"Produced electric":3.08,"Steam":2.86,"Heating":0.28},
{"date":"2025-11-14","Gas":456,"Used electric":4.5,"Produced electric":3.23,"Steam":3.16,"Heating":0.3},
{"date":"2025-11-15","Gas":453,"Used electric":4.97,"Produced electric":2.77,"Steam":2.94,"Heating":0.32},
{"date":"2025-11-16","Gas":455,"Used electric":4.8,"Produced electric":3.16,"Steam":2.89,"Heating":0.33},
{"date":"2025-11-17","Gas":468,"Used electric":5.07,"Produced electric":3,"Steam":3.09,"Heating":0.27},
{"date":"2025-11-18","Gas":407,"Used electric":5.46,"Produced electric":2.98,"Steam":2.82,"Heating":0.32},
{"date":"2025-11-19","Gas":442,"Used electric":5.5,"Produced electric":2.82,"Steam":2.74,"Heating":0.32},
{"date":"2025-11-20","Gas":450,"Used electric":4.69,"Produced electric":2.83,"Steam":2.93,"Heating":0.33},
{"date":"2025-11-21","Gas":480,"Used electric":5.22,"Produced electric":2.8,"Steam":3.01,"Heating":0.29},
{"date":"2025-11-22","Gas":454,"Used electric":4.9,"Produced electric":2.77,"Steam":2.84,"Heating":0.31},
{"date":"2025-11-23","Gas":467,"Used electric":5.03,"Produced electric":2.97,"Steam":2.7,"Heating":0.28},
{"date":"2025-11-24","Gas":463,"Used electric":4.84,"Produced electric":2.7,"Steam":3.17,"Heating":0.32},
{"date":"2025-11-25","Gas":486,"Used electric":5.06,"Produced electric":3.22,"Steam":2.93,"Heating":0.33},
{"date":"2025-11-26","Gas":489,"Used electric":5.3,"Produced electric":3.19,"Steam":2.89,"Heating":0.27},
{"date":"2025-11-27","Gas":465,"Used electric":4.71,"Produced electric":2.99,"Steam":2.89,"Heating":0.31},
{"date":"2025-11-28","Gas":459,"Used electric":4.95,"Produced electric":2.91,"Steam":3.06,"Heating":0.33},
{"date":"2025-11-29","Gas":480,"Used electric":4.61,"Produced electric":2.81,"Steam":2.8,"Heating":0.3},
{"date":"2025-11-30","Gas":482,"Used electric":4.93,"Produced electric":3.19,"Steam":3.3,"Heating":0.31},
{"date":"2025-12-01","Gas":486,"Used electric":5.46,"Produced electric":3.07,"Steam":3.05,"Heating":0.28},
{"date":"2025-12-02","Gas":462,"Used electric":5.42,"Produced electric":3.2,"Steam":2.94,"Heating":0.27},
{"date":"2025-12-03","Gas":438,"Used electric":4.6,"Produced electric":2.78,"Steam":2.8,"Heating":0.28},
{"date":"2025-12-04","Gas":469,"Used electric":4.9,"Produced electric":2.92,"Steam":3.07,"Heating":0.31},
{"date":"2025-12-05","Gas":409,"Used electric":4.99,"Produced electric":2.77,"Steam":3.2,"Heating":0.28},
{"date":"2025-12-06","Gas":437,"Used electric":4.81,"Produced electric":3.2,"Steam":2.8,"Heating":0.29},
{"date":"2025-12-07","Gas":436,"Used electric":4.83,"Produced electric":2.73,"Steam":3.07,"Heating":0.33},
{"date":"2025-12-08","Gas":449,"Used electric":5.1,"Produced electric":3.06,"Steam":3.15,"Heating":0.32},
{"date":"2025-12-09","Gas":427,"Used electric":4.74,"Produced electric":3.05,"Steam":2.89,"Heating":0.27},
{"date":"2025-12-10","Gas":421,"Used electric":5.41,"Produced electric":2.74,"Steam":3.22,"Heating":0.27},
{"date":"2025-12-11","Gas":443,"Used electric":4.65,"Produced electric":3.01,"Steam":2.8,"Heating":0.3},
{"date":"2025-12-12","Gas":469,"Used electric":4.79,"Produced electric":2.86,"Steam":2.7,"Heating":0.33},
{"date":"2025-12-13","Gas":492,"Used electric":4.54,"Produced electric":3.26,"Steam":2.9,"Heating":0.3},
{"date":"2025-12-14","Gas":491,"Used electric":5.29,"Produced electric":3.09,"Steam":3.21,"Heating":0.33},
{"date":"2025-12-15","Gas":470,"Used electric":4.76,"Produced electric":3.03,"Steam":2.87,"Heating":0.32},
{"date":"2025-12-16","Gas":478,"Used electric":5.43,"Produced electric":2.73,"Steam":2.86,"Heating":0.3},
{"date":"2025-12-17","Gas":484,"Used electric":4.63,"Produced electric":2.73,"Steam":3.17,"Heating":0.28},
{"date":"2025-12-18","Gas":494,"Used electric":4.76,"Produced electric":2.71,"Steam":2.77,"Heating":0.32},
{"date":"2025-12-19","Gas":447,"Used electric":4.58,"Produced electric":2.73,"Steam":2.94,"Heating":0.27},
{"date":"2025-12-20","Gas":406,"Used electric":5.02,"Produced electric":2.85,"Steam":3.06,"Heating":0.3},
{"date":"2025-12-21","Gas":477,"Used electric":4.88,"Produced electric":2.99,"Steam":3.3,"Heating":0.31},
{"date":"2025-12-22","Gas":427,"Used electric":5,"Produced electric":3.23,"Steam":3.2,"Heating":0.29},
{"date":"2025-12-23","Gas":475,"Used electric":5.2,"Produced electric":3.04,"Steam":3.04,"Heating":0.3},
{"date":"2025-12-24","Gas":445,"Used electric":4.59,"Produced electric":3.08,"Steam":2.72,"Heating":0.3},
{"date":"2025-12-25","Gas":413,"Used electric":4.85,"Produced electric":3.16,"Steam":2.86,"Heating":0.32},
{"date":"2025-12-26","Gas":459,"Used electric":4.7,"Produced electric":2.86,"Steam":2.94,"Heating":0.28},
{"date":"2025-12-27","Gas":486,"Used electric":5.2,"Produced electric":2.91,"Steam":3.25,"Heating":0.32},
{"date":"2025-12-28","Gas":448,"Used electric":5.04,"Produced electric":2.88,"Steam":2.8,"Heating":0.3},
{"date":"2025-12-29","Gas":474,"Used electric":5.07,"Produced electric":3.21,"Steam":3.26,"Heating":0.3},
{"date":"2025-12-30","Gas":452,"Used electric":5.21,"Produced electric":2.76,"Steam":3.04,"Heating":0.27},
{"date":"2025-12-31","Gas":486,"Used electric":5.15,"Produced electric":2.83,"Steam":3,"Heating":0.3},
{"date":"2026-01-01","Gas":484,"Used electric":5.08,"Produced electric":3.13,"Steam":3.06,"Heating":0.31},
{"date":"2026-01-02","Gas":452,"Used electric":5.03,"Produced electric":3.03,"Steam":2.95,"Heating":0.31},
{"date":"2026-01-03","Gas":481,"Used electric":5.37,"Produced electric":2.78,"Steam":3.05,"Heating":0.27},
{"date":"2026-01-04","Gas":471,"Used electric":4.81,"Produced electric":2.81,"Steam":2.74,"Heating":0.3},
{"date":"2026-01-05","Gas":485,"Used electric":4.6,"Produced electric":3.25,"Steam":2.87,"Heating":0.31},
{"date":"2026-01-06","Gas":447,"Used electric":5.33,"Produced electric":2.96,"Steam":3.13,"Heating":0.28},
{"date":"2026-01-07","Gas":462,"Used electric":4.77,"Produced electric":3.03,"Steam":2.83,"Heating":0.28},
{"date":"2026-01-08","Gas":435,"Used electric":4.73,"Produced electric":3.27,"Steam":2.97,"Heating":0.31},
{"date":"2026-01-09","Gas":477,"Used electric":5.41,"Produced electric":2.71,"Steam":3.05,"Heating":0.33},
{"date":"2026-01-10","Gas":421,"Used electric":4.51,"Produced electric":2.99,"Steam":2.88,"Heating":0.27},
{"date":"2026-01-11","Gas":474,"Used electric":5.43,"Produced electric":3.11,"Steam":2.79,"Heating":0.29},
{"date":"2026-01-12","Gas":445,"Used electric":5.06,"Produced electric":3.27,"Steam":3.13,"Heating":0.27},
{"date":"2026-01-13","Gas":423,"Used electric":5.2,"Produced electric":2.71,"Steam":2.97,"Heating":0.33},
{"date":"2026-01-14","Gas":420,"Used electric":5.01,"Produced electric":3.19,"Steam":3.18,"Heating":0.32},
{"date":"2026-01-15","Gas":427,"Used electric":5.34,"Produced electric":2.75,"Steam":2.93,"Heating":0.3},
{"date":"2026-01-16","Gas":457,"Used electric":4.75,"Produced electric":3.13,"Steam":3.16,"Heating":0.3},
{"date":"2026-01-17","Gas":487,"Used electric":5.12,"Produced electric":3.17,"Steam":3.27,"Heating":0.27},
{"date":"2026-01-18","Gas":492,"Used electric":5.26,"Produced electric":2.91,"Steam":3.22,"Heating":0.28},
{"date":"2026-01-19","Gas":406,"Used electric":4.63,"Produced electric":3.11,"Steam":2.96,"Heating":0.32},
{"date":"2026-01-20","Gas":472,"Used electric":4.68,"Produced electric":2.75,"Steam":3.3,"Heating":0.33},
{"date":"2026-01-21","Gas":409,"Used electric":5.49,"Produced electric":2.73,"Steam":3.24,"Heating":0.31},
{"date":"2026-01-22","Gas":434,"Used electric":5.08,"Produced electric":3.09,"Steam":2.8,"Heating":0.27},
{"date":"2026-01-23","Gas":454,"Used electric":4.53,"Produced electric":2.85,"Steam":3.2,"Heating":0.31},
{"date":"2026-01-24","Gas":465,"Used electric":4.59,"Produced electric":2.75,"Steam":3.28,"Heating":0.3},
{"date":"2026-01-25","Gas":430,"Used electric":4.83,"Produced electric":2.76,"Steam":3.09,"Heating":0.32},
{"date":"2026-01-26","Gas":412,"Used electric":4.52,"Produced electric":3.24,"Steam":2.84,"Heating":0.27},
{"date":"2026-01-27","Gas":414,"Used electric":5.26,"Produced electric":2.71,"Steam":3.27,"Heating":0.29},
{"date":"2026-01-28","Gas":483,"Used electric":5,"Produced electric":2.7,"Steam":3.28,"Heating":0.33},
{"date":"2026-01-29","Gas":434,"Used electric":5.34,"Produced electric":2.95,"Steam":3.06,"Heating":0.29},
{"date":"2026-01-30","Gas":433,"Used electric":4.59,"Produced electric":2.73,"Steam":2.8,"Heating":0.3},
{"date":"2026-01-31","Gas":490,"Used electric":5.4,"Produced electric":3.16,"Steam":3.11,"Heating":0.32}]

const chartConfig = {
  views: {
    label: "Energy used",
  },
  gas: {
    label: "Gas",
    color: "var(--chart-1)",
  },
  usedElectric: {
    label: "Used electric",
    color: "var(--chart-2)",
  },
  producedElectric: {
    label: "Produced electric",
    color: "var(--chart-3)",
  },
  steam: {
    label: "Steam",
    color: "var(--chart-4)",
  },
  heating: {
    label: "Heating",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function ChartBarInteractive() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("gas")

  const total = React.useMemo(
    () => ({
      gas: chartData.reduce((acc, curr) => acc + curr.Gas, 0),
      usedElectric: chartData.reduce((acc, curr) => acc + curr["Used electric"], 0),
      producedElectric: chartData.reduce((acc, curr) => acc + curr["Produced electric"], 0),
      steam: chartData.reduce((acc, curr) => acc + curr.Steam, 0),
      heating: chartData.reduce((acc, curr) => acc + curr.Heating, 0),
    }),
    []
  )

  const mappedData = React.useMemo(() => {
    return chartData.map((item) => ({
      date: item.date,
      gas: item.Gas,
      usedElectric: item["Used electric"],
      producedElectric: item["Produced electric"],
      steam: item.Steam,
      heating: item.Heating,
    }))
  }, [])

  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
          <CardTitle>Daily Energy Usage</CardTitle>
          <CardDescription>
            Showing how much energy was used each day, and how much of it was produced by the different sources. Click on the buttons below to switch between different energy sources.
          </CardDescription>
        </div>
        <div className="flex">
          {["gas", "usedElectric", "producedElectric", "steam", "heating"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={mappedData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <YAxis hide domain={[(min: number) => min * 0.9, "auto"]} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
