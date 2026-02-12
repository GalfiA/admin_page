"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Cpu, Droplets, Flame, Lightbulb, Minus, Plus, Thermometer } from "lucide-react"

interface RoomControlPanelProps {
  initialTemp: number
  initialHumidity: number
  initialHeatMode: "Kézi" | "AI"
  initialHeating: "Hőszivattyú" | "Kazán"
  initialLights: "On" | "Off"
  currentPrice?: number
}

function FancyToggle<T extends string>({
  id,
  options,
  value,
  onChange,
  disabled,
}: {
  id: string
  options: [T, T]
  value: T
  onChange: (val: T) => void
  disabled?: boolean
}) {
  return (
    <div className={`relative flex w-fit items-center rounded-full bg-gray-200 p-1 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
      {options.map((option) => {
        const isActive = value === option
        return (
          <button
            key={option}
            disabled={disabled}
            onClick={() => onChange(option)}
            className={`relative z-10 px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
              isActive ? "text-black" : "text-gray-500 hover:text-gray-700"
            } ${disabled ? "cursor-not-allowed" : ""}`}
          >
            {isActive && (
              <motion.div
                layoutId={`active-${id}`}
                className="absolute inset-0 rounded-full bg-white shadow-sm"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-20">{option}</span>
          </button>
        )
      })}
    </div>
  )
}

export function RoomControlPanel({
  initialTemp,
  initialHumidity,
  initialHeatMode,
  initialHeating,
  initialLights,
  currentPrice,
}: RoomControlPanelProps) {
  const [temp, setTemp] = useState(initialTemp)
  const [humidity, setHumidity] = useState(initialHumidity)
  const [heatMode, setHeatMode] = useState(initialHeatMode)
  const [heating, setHeating] = useState(initialHeating)
  const [lights, setLights] = useState(initialLights)

  useEffect(() => {
    if (heatMode === "AI" && currentPrice !== undefined) {
      if (currentPrice > 52) {
        setHeating("Kazán")
      } else if (currentPrice < 50) {
        setHeating("Hőszivattyú")
      }
    }
  }, [heatMode, currentPrice])

  return (
    <div className="flex gap-6 bg-gray-50 p-6 rounded-xl shadow-lg">
      
      {/* Thermometer Panel */}
      <div className="flex flex-col items-center justify-center bg-white rounded-xl p-4 shadow-md w-32">
        <div className="p-2 bg-red-50 rounded-lg text-red-500 mb-2">
          <Thermometer className="w-6 h-6" />
        </div>
        <div className="text-sm font-semibold mb-2 text-gray-700">Hőmérséklet</div>
        <div className="text-2xl font-bold mb-2">{temp}°C</div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
            onClick={() => setTemp(temp - 1)}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
            onClick={() => setTemp(temp + 1)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Controls Column */}
      <div className="flex flex-col gap-4 flex-1">
        
        {/* Humidity */}
        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
              <Droplets className="w-5 h-5" />
            </div>
            <span className="font-semibold text-gray-700">Páratartalom</span>
          </div>
          <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-lg border border-gray-100">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-md hover:bg-white hover:shadow-sm text-gray-500 hover:text-gray-900"
              onClick={() => setHumidity(humidity - 1)}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <div className="font-bold text-gray-900 w-12 text-center">{humidity}%</div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-md hover:bg-white hover:shadow-sm text-gray-500 hover:text-gray-900"
              onClick={() => setHumidity(humidity + 1)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Heat Mode */}
        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg text-purple-500">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="font-semibold text-gray-700">Klimatizálás</span>
          </div>
          <FancyToggle
            id="heatMode"
            options={["Kézi", "AI"]}
            value={heatMode}
            onChange={setHeatMode}
          />
        </div>

        {/* Heating */}
        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 rounded-lg text-orange-500">
              <Flame className="w-5 h-5" />
            </div>
            <span className="font-semibold text-gray-700">Fűtés</span>
          </div>
          <FancyToggle
            id="heating"
            options={["Hőszivattyú", "Kazán"]}
            value={heating}
            onChange={setHeating}
            disabled={heatMode === "AI"}
          />
        </div>

        {/* Lights */}
        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-50 rounded-lg text-yellow-500">
              <Lightbulb className="w-5 h-5" />
            </div>
            <span className="font-semibold text-gray-700">Világítás</span>
          </div>
          <FancyToggle
            id="lights"
            options={["Off", "On"]}
            value={lights}
            onChange={setLights}
          />
        </div>

      </div>
    </div>
  )
}