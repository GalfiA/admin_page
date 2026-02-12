"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Droplets, Flame, Zap, LucideIcon } from "lucide-react"

function generateRandom(base: number, variation: number) {
  return Math.round(base + (Math.random() - 0.5) * variation)
}

function LineChart({
  title,
  unit,
  data,
  icon: Icon,
  color,
}: {
  title: string
  unit: string
  data: number[]
  icon: LucideIcon
  color: string
}) {
  const max = Math.max(...data) * 1.1
  const min = Math.min(...data) * 0.9
  const range = max - min || 1

  const width = 100
  const height = 40

  const pathD = `M ${data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width
      const y = height - ((v - min) / range) * height
      return `${x} ${y}`
    })
    .join(" L ")}`

  const areaD = `${pathD} L ${width} ${height} L 0 ${height} Z`

  return (
    <Card className="overflow-hidden shadow-sm border-none ring-1 ring-gray-200 bg-white/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <div className="p-2 rounded-lg bg-opacity-10" style={{ backgroundColor: `${color}20`, color: color }}>
            <Icon className="h-4 w-4" />
          </div>
          {title}
        </CardTitle>
        <div className="text-2xl font-bold tabular-nums">
          {data[data.length - 1]} <span className="text-xs font-normal text-muted-foreground">{unit}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="h-[60px] w-full mt-2">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`gradient-${title.replace(/\s/g, '')}`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d={areaD}
              fill={`url(#gradient-${title.replace(/\s/g, '')})`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, d: areaD }}
              transition={{ duration: 0.5 }}
            />
            <motion.path
              d={pathD}
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1, d: pathD }}
              transition={{ duration: 1.5, ease: "linear" }}
            />
          </svg>
        </div>
      </CardContent>
    </Card>
  )
}

export function ConsumptionSection({ className }: { className?: string }) {
  const [water, setWater] = useState<number[]>(() => Array.from({ length: 20 }, () => generateRandom(10, 4)))
  const [gas, setGas] = useState<number[]>(() => Array.from({ length: 20 }, () => generateRandom(8, 2)))
  const [electricity, setElectricity] = useState<number[]>(() => Array.from({ length: 20 }, () => generateRandom(20, 5)))

  useEffect(() => {
    const interval = setInterval(() => {
      setWater((prev) => [...prev.slice(1), generateRandom(10, 4)])
      setGas((prev) => [...prev.slice(1), generateRandom(8, 2)])
      setElectricity((prev) => [...prev.slice(1), generateRandom(20, 5)])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`flex flex-col gap-4 ${className ?? "w-1/2 mx-auto mt-10"}`}>
      {/* Section Title */}
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Factory Consumption Monitoring
      </h2>

      {/* Graphs */}
      <LineChart title="Water Consumption" unit="m³/h" data={water} icon={Droplets} color="#3b82f6" />
      <LineChart title="Gas Consumption" unit="m³/h" data={gas} icon={Flame} color="#f97316" />
      <LineChart title="Electricity Usage" unit="kW" data={electricity} icon={Zap} color="#eab308" />

      {/* Export Button */}
      <Button className="mt-2 w-full" variant="outline">
        Export Data to CSV
      </Button>
    </div>
  )
}