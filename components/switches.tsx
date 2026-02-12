"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function IndustrialControlPanel() {
  const [states, setStates] = useState({
    turbine: true,
    generator: false,
    cooling: true,
    emergency: false,
  });

  const controls = [
    { id: "turbine", label: "Turbine Power", color: "bg-green-500" },
    { id: "generator", label: "Generator Output", color: "bg-blue-500" },
    { id: "cooling", label: "Cooling System", color: "bg-cyan-500" },
    { id: "emergency", label: "Emergency Shutdown", color: "bg-red-600" },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Card className="rounded-2xl shadow-xl border bg-background">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Industrial Control Panel
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Monitor and toggle critical machine systems
          </p>
        </CardHeader>

        <CardContent className="grid gap-6">
          {controls.map((control) => {
            const enabled = states[control.id];
            const isLocked = states.emergency && control.id !== "emergency";

            return (
              <motion.div
                key={control.id}
                className="flex items-center justify-between rounded-2xl border p-6 bg-muted/20"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 }}
                style={{ opacity: isLocked ? 0.5 : 1 }}
              >
                {/* Left side info */}
                <div className="space-y-1">
                  <Label
                    htmlFor={control.id}
                    className="text-lg font-semibold"
                  >
                    {control.label}
                  </Label>

                  {/* Status indicator */}
                  <div className="flex items-center gap-2">
                    <motion.span
                      className={`h-3 w-3 rounded-full ${
                        enabled ? control.color : "bg-gray-400"
                      }`}
                      animate={{
                        scale: enabled ? [1, 1.4, 1] : 1,
                        opacity: enabled ? 1 : 0.5,
                      }}
                      transition={{ repeat: enabled ? Infinity : 0, duration: 1.5 }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {enabled ? "ACTIVE" : "OFFLINE"}
                    </span>
                  </div>
                </div>

                {/* Right side giant switch */}
                <motion.div whileTap={{ scale: 0.9 }}>
                  <Switch
                    id={control.id}
                    checked={enabled}
                    disabled={isLocked}
                    onCheckedChange={(val) => {
                      if (control.id === "emergency" && val) {
                        setStates({
                          turbine: false,
                          generator: false,
                          cooling: false,
                          emergency: true,
                        });
                      } else {
                        setStates((prev) => ({ ...prev, [control.id]: val }));
                      }
                    }}
                    className={`h-12 w-24 rounded-full transition-all 
                      data-[state=checked]:bg-green-500 
                      data-[state=unchecked]:bg-gray-500`}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </CardContent>
      </Card>
    </motion.div>
  );
}
