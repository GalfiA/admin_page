"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "Interactive area chart"

const chartData = [{"date":"2025-11-01","Cl2":1316,"MDI":932,"NaOH":332,"PVC":251,"TDI":155},
{"date":"2025-11-02","Cl2":1366,"MDI":904,"NaOH":363,"PVC":250,"TDI":159},
{"date":"2025-11-03","Cl2":1440,"MDI":844,"NaOH":303,"PVC":238,"TDI":151},
{"date":"2025-11-04","Cl2":1293,"MDI":991,"NaOH":340,"PVC":228,"TDI":151},
{"date":"2025-11-05","Cl2":1236,"MDI":977,"NaOH":346,"PVC":244,"TDI":151},
{"date":"2025-11-06","Cl2":1422,"MDI":879,"NaOH":336,"PVC":271,"TDI":158},
{"date":"2025-11-07","Cl2":1425,"MDI":1022,"NaOH":302,"PVC":245,"TDI":145},
{"date":"2025-11-08","Cl2":1202,"MDI":939,"NaOH":359,"PVC":242,"TDI":160},
{"date":"2025-11-09","Cl2":1258,"MDI":999,"NaOH":317,"PVC":237,"TDI":150},
{"date":"2025-11-10","Cl2":1355,"MDI":965,"NaOH":334,"PVC":254,"TDI":155},
{"date":"2025-11-11","Cl2":1234,"MDI":864,"NaOH":361,"PVC":250,"TDI":154},
{"date":"2025-11-12","Cl2":1230,"MDI":926,"NaOH":317,"PVC":268,"TDI":146},
{"date":"2025-11-13","Cl2":1319,"MDI":965,"NaOH":345,"PVC":252,"TDI":146},
{"date":"2025-11-14","Cl2":1334,"MDI":871,"NaOH":357,"PVC":257,"TDI":163},
{"date":"2025-11-15","Cl2":1259,"MDI":897,"NaOH":317,"PVC":245,"TDI":154},
{"date":"2025-11-16","Cl2":1308,"MDI":942,"NaOH":324,"PVC":268,"TDI":160},
{"date":"2025-11-17","Cl2":1323,"MDI":868,"NaOH":329,"PVC":247,"TDI":169},
{"date":"2025-11-18","Cl2":1355,"MDI":860,"NaOH":303,"PVC":275,"TDI":152},
{"date":"2025-11-19","Cl2":1202,"MDI":894,"NaOH":340,"PVC":261,"TDI":147},
{"date":"2025-11-20","Cl2":1254,"MDI":902,"NaOH":338,"PVC":260,"TDI":165},
{"date":"2025-11-21","Cl2":1328,"MDI":896,"NaOH":351,"PVC":259,"TDI":167},
{"date":"2025-11-22","Cl2":1242,"MDI":856,"NaOH":338,"PVC":253,"TDI":152},
{"date":"2025-11-23","Cl2":1209,"MDI":1009,"NaOH":303,"PVC":267,"TDI":161},
{"date":"2025-11-24","Cl2":1208,"MDI":1001,"NaOH":330,"PVC":252,"TDI":142},
{"date":"2025-11-25","Cl2":1411,"MDI":919,"NaOH":326,"PVC":246,"TDI":154},
{"date":"2025-11-26","Cl2":1351,"MDI":887,"NaOH":352,"PVC":260,"TDI":151},
{"date":"2025-11-27","Cl2":1428,"MDI":983,"NaOH":308,"PVC":250,"TDI":166},
{"date":"2025-11-28","Cl2":1309,"MDI":896,"NaOH":348,"PVC":275,"TDI":158},
{"date":"2025-11-29","Cl2":1444,"MDI":994,"NaOH":325,"PVC":276,"TDI":159},
{"date":"2025-11-30","Cl2":1209,"MDI":851,"NaOH":314,"PVC":276,"TDI":155},
{"date":"2025-12-01","Cl2":1288,"MDI":968,"NaOH":354,"PVC":265,"TDI":157},
{"date":"2025-12-02","Cl2":1223,"MDI":1017,"NaOH":312,"PVC":227,"TDI":160},
{"date":"2025-12-03","Cl2":1388,"MDI":1023,"NaOH":332,"PVC":244,"TDI":168},
{"date":"2025-12-04","Cl2":1282,"MDI":969,"NaOH":304,"PVC":266,"TDI":170},
{"date":"2025-12-05","Cl2":1346,"MDI":932,"NaOH":360,"PVC":249,"TDI":162},
{"date":"2025-12-06","Cl2":1213,"MDI":899,"NaOH":346,"PVC":269,"TDI":143},
{"date":"2025-12-07","Cl2":1215,"MDI":1011,"NaOH":333,"PVC":244,"TDI":164},
{"date":"2025-12-08","Cl2":1271,"MDI":1007,"NaOH":344,"PVC":266,"TDI":143},
{"date":"2025-12-09","Cl2":1388,"MDI":841,"NaOH":340,"PVC":250,"TDI":156},
{"date":"2025-12-10","Cl2":1193,"MDI":908,"NaOH":308,"PVC":245,"TDI":166},
{"date":"2025-12-11","Cl2":1285,"MDI":903,"NaOH":299,"PVC":234,"TDI":166},
{"date":"2025-12-12","Cl2":1191,"MDI":920,"NaOH":307,"PVC":245,"TDI":146},
{"date":"2025-12-13","Cl2":1365,"MDI":938,"NaOH":320,"PVC":240,"TDI":144},
{"date":"2025-12-14","Cl2":1241,"MDI":925,"NaOH":320,"PVC":256,"TDI":145},
{"date":"2025-12-15","Cl2":1426,"MDI":855,"NaOH":332,"PVC":238,"TDI":144},
{"date":"2025-12-16","Cl2":1218,"MDI":882,"NaOH":338,"PVC":276,"TDI":144},
{"date":"2025-12-17","Cl2":1390,"MDI":975,"NaOH":324,"PVC":262,"TDI":152},
{"date":"2025-12-18","Cl2":1340,"MDI":904,"NaOH":323,"PVC":228,"TDI":165},
{"date":"2025-12-19","Cl2":1309,"MDI":1002,"NaOH":346,"PVC":230,"TDI":169},
{"date":"2025-12-20","Cl2":1308,"MDI":895,"NaOH":304,"PVC":228,"TDI":161},
{"date":"2025-12-21","Cl2":1370,"MDI":1025,"NaOH":300,"PVC":249,"TDI":153},
{"date":"2025-12-22","Cl2":1368,"MDI":912,"NaOH":358,"PVC":267,"TDI":157},
{"date":"2025-12-23","Cl2":1421,"MDI":871,"NaOH":341,"PVC":242,"TDI":166},
{"date":"2025-12-24","Cl2":1261,"MDI":1012,"NaOH":361,"PVC":269,"TDI":163},
{"date":"2025-12-25","Cl2":1285,"MDI":908,"NaOH":314,"PVC":262,"TDI":166},
{"date":"2025-12-26","Cl2":1415,"MDI":1008,"NaOH":362,"PVC":240,"TDI":160},
{"date":"2025-12-27","Cl2":1208,"MDI":925,"NaOH":333,"PVC":248,"TDI":166},
{"date":"2025-12-28","Cl2":1375,"MDI":970,"NaOH":333,"PVC":267,"TDI":142},
{"date":"2025-12-29","Cl2":1321,"MDI":901,"NaOH":354,"PVC":226,"TDI":164},
{"date":"2025-12-30","Cl2":1271,"MDI":928,"NaOH":303,"PVC":254,"TDI":165},
{"date":"2025-12-31","Cl2":1312,"MDI":840,"NaOH":304,"PVC":229,"TDI":154},
{"date":"2026-01-01","Cl2":1327,"MDI":905,"NaOH":350,"PVC":256,"TDI":159},
{"date":"2026-01-02","Cl2":1305,"MDI":943,"NaOH":345,"PVC":229,"TDI":155},
{"date":"2026-01-03","Cl2":1224,"MDI":871,"NaOH":303,"PVC":243,"TDI":157},
{"date":"2026-01-04","Cl2":1433,"MDI":918,"NaOH":355,"PVC":233,"TDI":145},
{"date":"2026-01-05","Cl2":1377,"MDI":871,"NaOH":350,"PVC":242,"TDI":155},
{"date":"2026-01-06","Cl2":1394,"MDI":883,"NaOH":349,"PVC":252,"TDI":169},
{"date":"2026-01-07","Cl2":1392,"MDI":999,"NaOH":312,"PVC":276,"TDI":149},
{"date":"2026-01-08","Cl2":1213,"MDI":855,"NaOH":337,"PVC":262,"TDI":155},
{"date":"2026-01-09","Cl2":1400,"MDI":854,"NaOH":355,"PVC":232,"TDI":153},
{"date":"2026-01-10","Cl2":1397,"MDI":886,"NaOH":337,"PVC":248,"TDI":142},
{"date":"2026-01-11","Cl2":1273,"MDI":891,"NaOH":302,"PVC":235,"TDI":158},
{"date":"2026-01-12","Cl2":1332,"MDI":917,"NaOH":320,"PVC":231,"TDI":168},
{"date":"2026-01-13","Cl2":1215,"MDI":841,"NaOH":353,"PVC":265,"TDI":160},
{"date":"2026-01-14","Cl2":1300,"MDI":961,"NaOH":364,"PVC":264,"TDI":143},
{"date":"2026-01-15","Cl2":1219,"MDI":1005,"NaOH":355,"PVC":251,"TDI":153},
{"date":"2026-01-16","Cl2":1323,"MDI":890,"NaOH":352,"PVC":251,"TDI":164},
{"date":"2026-01-17","Cl2":1377,"MDI":927,"NaOH":324,"PVC":233,"TDI":151},
{"date":"2026-01-18","Cl2":1263,"MDI":889,"NaOH":357,"PVC":272,"TDI":151},
{"date":"2026-01-19","Cl2":1224,"MDI":968,"NaOH":352,"PVC":228,"TDI":162},
{"date":"2026-01-20","Cl2":1325,"MDI":1001,"NaOH":365,"PVC":243,"TDI":147},
{"date":"2026-01-21","Cl2":1274,"MDI":839,"NaOH":336,"PVC":227,"TDI":144},
{"date":"2026-01-22","Cl2":1207,"MDI":911,"NaOH":357,"PVC":264,"TDI":169},
{"date":"2026-01-23","Cl2":1208,"MDI":865,"NaOH":314,"PVC":273,"TDI":150},
{"date":"2026-01-24","Cl2":1397,"MDI":854,"NaOH":326,"PVC":269,"TDI":166},
{"date":"2026-01-25","Cl2":1334,"MDI":966,"NaOH":318,"PVC":255,"TDI":150},
{"date":"2026-01-26","Cl2":1207,"MDI":843,"NaOH":364,"PVC":228,"TDI":163},
{"date":"2026-01-27","Cl2":1361,"MDI":911,"NaOH":332,"PVC":229,"TDI":142},
{"date":"2026-01-28","Cl2":1346,"MDI":885,"NaOH":352,"PVC":250,"TDI":141},
{"date":"2026-01-29","Cl2":1259,"MDI":985,"NaOH":299,"PVC":251,"TDI":145},
{"date":"2026-01-30","Cl2":1389,"MDI":1019,"NaOH":314,"PVC":275,"TDI":163},
{"date":"2026-01-31","Cl2":1381,"MDI":976,"NaOH":308,"PVC":227,"TDI":168}]

const chartConfig = {
  Cl2: {
    label: "Cl2",
    color: "var(--chart-1)",
  },
  MDI: {
    label: "MDI",
    color: "var(--chart-2)",
  },
  NaOH: {
    label: "NaOH",
    color: "var(--chart-3)",
  },
  PVC: {
    label: "PVC",
    color: "var(--chart-4)",
  },
  TDI: {
    label: "TDI",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2026-01-31")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  }).map((item) => {
    return {
      date: item.date,
      Cl2: item.Cl2,
      MDI: item.MDI,
      NaOH: item.NaOH,
      PVC: item.PVC,
      TDI: item.TDI,
    }
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Daily energy production and consumption</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillCl2" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-1)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMDI" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-2)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-2)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillNaOH" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-3)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-3)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillPVC" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-4)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-4)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillTDI" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-5)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-5)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <YAxis hide domain={["auto", "auto"]} />
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
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="Cl2"
              type="natural"
              fill="url(#fillCl2)"
              stroke="var(--chart-1)"
              stackId="a"
            />
            <Area
              dataKey="MDI"
              type="natural"
              fill="url(#fillMDI)"
              stroke="var(--chart-2)"
              stackId="a"
            />
            <Area
              dataKey="NaOH"
              type="natural"
              fill="url(#fillNaOH)"
              stroke="var(--chart-3)"
              stackId="a"
            />
            <Area
              dataKey="PVC"
              type="natural"
              fill="url(#fillPVC)"
              stroke="var(--chart-4)"
              stackId="a"
            />
            <Area
              dataKey="TDI"
              type="natural"
              fill="url(#fillTDI)"
              stroke="var(--chart-5)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
