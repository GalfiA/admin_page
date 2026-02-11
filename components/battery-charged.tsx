"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BatteryCharging } from "lucide-react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  Tooltip,
} from "recharts";

export default function BatteryChargeRadial() {
  // Battery charge contributions
  const sources = [
    { name: "Solar", value: 25, fill: "#facc15" },
    { name: "Grid", value: 40, fill: "#3b82f6" },
    { name: "Backup", value: 15, fill: "#22c55e" },
  ];

  const totalCharge = sources.reduce((sum, s) => sum + s.value, 0);

  // Convert sources into stacked radial segments
  const stackedData = sources.map((src) => ({
    ...src,
    total: totalCharge,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Card className="rounded-2xl shadow-xl border bg-gradient-to-br from-background to-muted/30">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <BatteryCharging className="h-6 w-6 text-primary" />
            Battery Charge
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Total charge stacked from multiple sources
          </p>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-6">
          {/* Single stacked radial bar */}
          <div className="relative">
            <RadialBarChart
              width={280}
              height={280}
              cx={140}
              cy={140}
              innerRadius={80}
              outerRadius={125}
              barSize={22}
              data={stackedData}
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                tick={false}
              />

              <Tooltip
                cursor={false}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid hsl(var(--border))",
                  background: "hsl(var(--background))",
                }}
              />

              {/* Background ring */}
              <RadialBar
                dataKey="total"
                fill="hsl(var(--muted))"
                cornerRadius={20}
                background
              />

              {/* Stacked segments */}
              <RadialBar
                dataKey="value"
                cornerRadius={20}
                stackId="charge"
              />
            </RadialBarChart>

            {/* Center Icon + Percentage */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <BatteryCharging className="h-12 w-12 text-primary" />
              </motion.div>

              <p className="text-4xl font-extrabold mt-2">
                {totalCharge}%
              </p>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Total Charge
              </p>
            </div>
          </div>

          {/* Breakdown Legend */}
          <div className="w-full grid gap-3">
            {sources.map((src) => (
              <div
                key={src.name}
                className="flex items-center justify-between rounded-xl border px-4 py-2 bg-muted/20"
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
