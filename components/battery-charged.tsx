"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BatteryCharging } from "lucide-react";
import { PieChart, Pie, Cell } from "recharts";

export default function BatteryChargeRadial() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sources = [
    { name: "Solar", value: 25, fill: "#facc15" },
    { name: "Grid", value: 40, fill: "#3b82f6" },
    { name: "Backup", value: 15, fill: "#22c55e" },
  ];

  const totalCharge = sources.reduce((sum, s) => sum + s.value, 0);
  const chartData = [
    ...sources,
    { name: "Remaining", value: 100 - totalCharge, fill: "transparent" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="rounded-2xl shadow-xl border bg-gradient-to-br from-background to-muted/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold">
            <BatteryCharging className="h-6 w-6 text-primary" />
            Battery Charge
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Total charge stacked from multiple sources
          </p>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-6">
          <div className="relative">
            <PieChart
              width={280}
              height={280}
            >
              {/* Colored Segments */}
              <Pie
                data={chartData}
                dataKey="value"
                cx={140}
                cy={140}
                innerRadius={85}
                outerRadius={125}
                startAngle={90}
                endAngle={-270}
                stroke="none"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                isAnimationActive={false}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.fill}
                    className="transition-opacity duration-300 ease-in-out"
                    style={{
                      cursor: entry.name === "Remaining" ? "default" : "pointer",
                      pointerEvents: entry.name === "Remaining" ? "none" : "auto",
                      opacity: activeIndex !== null && activeIndex !== index ? 0.3 : 1,
                    }}
                  />
                ))}
              </Pie>
            </PieChart>

            {/* Center Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <motion.div
                animate={activeIndex !== null ? { scale: 1.1 } : { scale: [1, 1.15, 1] }}
                transition={activeIndex !== null ? { duration: 0.3 } : { repeat: Infinity, duration: 2 }}
              >
                <BatteryCharging className="h-12 w-12 text-primary" />
              </motion.div>

              <p className="text-4xl font-extrabold mt-2">
                {activeIndex !== null && chartData[activeIndex]?.name !== "Remaining"
                  ? chartData[activeIndex].value
                  : totalCharge}%
              </p>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {activeIndex !== null && chartData[activeIndex]?.name !== "Remaining"
                  ? chartData[activeIndex].name
                  : "Total Charge"}
              </p>
            </div>
          </div>

          {/* Legend */}
          <div className="w-full grid gap-3">
            {sources.map((src, index) => (
              <div
                key={src.name}
                className="flex items-center justify-between rounded-xl border px-4 py-2 bg-muted/20 cursor-pointer"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                style={{
                  opacity: activeIndex !== null && activeIndex !== index ? 0.3 : 1,
                  transition: "opacity 0.3s ease-in-out",
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: src.fill }}
                  />
                  <p className="text-sm font-medium">{src.name}</p>
                </div>
                <p className="text-sm font-semibold">{src.value}%</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
