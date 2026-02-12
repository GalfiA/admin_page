"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Droplets, Flame, Zap, LucideIcon } from "lucide-react"

function generateRandom(base: number, variation: number) {
  return Math.round(base + (Math.random() - 0.5) * variation)
}

function getSmoothPath(points: [number, number][]) {
  if (points.length === 0) return ""
  if (points.length === 1) return `M ${points[0][0]} ${points[0][1]}`

  let d = `M ${points[0][0]} ${points[0][1]}`

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? 0 : i - 1]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] || p2

    const cp1x = p1[0] + (p2[0] - p0[0]) / 6
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6

    const cp2x = p2[0] - (p3[0] - p1[0]) / 6
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6

    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2[0]} ${p2[1]}`
  }

  return d
}

function LineChart({
  title,
  unit,
  data,
  icon: Icon,
  color,
  id,
  minY,
  maxY,
}: {
  title: string
  unit: string
  data: number[]
  icon: LucideIcon
  color: string
  id: number
  minY?: number
  maxY?: number
}) {
  const max = maxY ?? Math.max(...data) * 1.1
  const min = minY ?? Math.min(...data) * 0.9
  const range = max - min || 1

  const width = 100
  const height = 40
  const step = width / (data.length - 1)

  const points: [number, number][] = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((v - min) / range) * height
    return [x, y]
  })

  const pathD = getSmoothPath(points)

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
        <div className="h-[60px] w-full mt-2 overflow-hidden [mask-image:linear-gradient(to_right,black_85%,transparent_100%)]">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`gradient-${title.replace(/\s/g, '')}`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.g
              key={id}
              initial={{ x: 0 }}
              animate={{ x: -step }}
              transition={{ duration: 1, ease: "linear" }}
            >
              <path
                d={areaD}
                fill={`url(#gradient-${title.replace(/\s/g, '')})`}
              />
              <path
                d={pathD}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.g>
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
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setWater((prev) => [...prev.slice(1), generateRandom(10, 4)])
      setGas((prev) => [...prev.slice(1), generateRandom(8, 2)])
      setElectricity((prev) => [...prev.slice(1), generateRandom(20, 5)])
      setTick((t) => t + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`flex flex-col gap-4 ${className ?? "w-1/2 mx-auto mt-10"}`}>
      {/* Section Title */}
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Fogyasztási adatok valós időben
      </h2>

      {/* Graphs */}
      <LineChart title="Vízfogyasztás" unit="m³/h" data={water} icon={Droplets} color="#3b82f6" id={tick} minY={0} maxY={20} />
      <LineChart title="Gázfogyasztás" unit="m³/h" data={gas} icon={Flame} color="#f97316" id={tick} minY={0} maxY={15} />
      <LineChart title="Áramfogyasztás" unit="kW" data={electricity} icon={Zap} color="#eab308" id={tick} minY={10} maxY={30} />

      {/* Export Button */}
      <Button className="mt-2 w-full" variant="outline">
        Adat exportálása CSV-be
      </Button>
    </div>
  )
}