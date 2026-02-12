"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TramPriceTickerProps {
    basePrice?: number;
    fluctuationPercent?: number; // e.g., 5 for 5%
    label?: string;
    className?: string;
    onPriceUpdate?: (price: number) => void;
}

export function TramPriceTicker({
    basePrice = 50,
    fluctuationPercent = 10,
    label = "Villamos Energia Árfolyam",
    className,
    onPriceUpdate
}: TramPriceTickerProps) {
    // 5 minutes * 60 seconds / 5 seconds interval = 60 data points
    const maxDataPoints = 60;
    const updateInterval = 5000; // 5 seconds

    // Initialize with some fake history so it's not empty
    const initialHistory = useMemo(() => {
        return Array.from({ length: maxDataPoints }, () => {
            const randomFactor = 1 + (Math.random() * (fluctuationPercent * 2) - fluctuationPercent) / 100;
            return basePrice * randomFactor;
        });
    }, [basePrice, fluctuationPercent]);

    const [history, setHistory] = useState<number[]>(initialHistory);
    const [currentPrice, setCurrentPrice] = useState<number>(initialHistory[initialHistory.length - 1]);

    useEffect(() => {
        if (onPriceUpdate) {
            onPriceUpdate(currentPrice);
        }
    }, [currentPrice, onPriceUpdate]);

    useEffect(() => {
        const interval = setInterval(() => {
            setHistory((prev) => {
                const lastValue = prev[prev.length - 1];
                // Calculate new value based on basePrice to keep it grounded, but with randomness
                // Or walk randomly from last value? 
                // "Középérték és ahhoz képest kellene véletlenszerűen" -> Relative to basePrice.

                const randomFactor = 1 + (Math.random() * (fluctuationPercent * 2) - fluctuationPercent) / 100;
                const newValue = basePrice * randomFactor;

                const newHistory = [...prev.slice(1), newValue];
                setCurrentPrice(newValue);
                return newHistory;
            });
        }, updateInterval);

        return () => clearInterval(interval);
    }, [basePrice, fluctuationPercent]);

    // Calculate change for display
    const previousPrice = history[history.length - 2] || basePrice;
    const priceChange = currentPrice - previousPrice;
    const percentChange = (priceChange / previousPrice) * 100;
    const isPositive = priceChange >= 0;

    // Chart SVG calculations
    const minVal = Math.min(...history, 50, 52);
    const maxVal = Math.max(...history, 50, 52);
    const range = maxVal - minVal || 1; // Avoid division by zero

    // Viewbox dimensions
    const width = 200;
    const height = 60;

    const getY = (val: number) => {
        const normalizedY = (val - minVal) / range;
        return height - (normalizedY * height);
    };

    // Generate path for the line chart
    const pathData = history.map((val, index) => {
        const x = (index / (maxDataPoints - 1)) * width;
        // Normalize y: 0 at bottom, height at top. 
        // SVG coords: y=0 is top. So we want (val - min) / range -> 0..1. 
        // Invert for SVG: 1 - normalized.
        const y = getY(val);
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    return (
        <Card className={`w-full shadow-lg border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex flex-col ${className}`}>
            <CardHeader className="p-3 pb-1 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-xs font-semibold uppercase text-muted-foreground tracking-wider flex items-center gap-1">
                    <Zap className="h-3 w-3 text-secondary-foreground" />
                    {label}
                </CardTitle>
                <div className={`text-xs font-bold px-1.5 py-0.5 rounded flex items-center ${isPositive ? 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400' : 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400'}`}>
                    {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    {Math.abs(percentChange).toFixed(2)}%
                </div>
            </CardHeader>
            <CardContent className="p-3 pt-0 flex-1 flex flex-col justify-center">
                <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-2xl font-bold font-mono tracking-tight">
                        {currentPrice.toFixed(2)}
                    </span>
                    <span className="text-xs text-muted-foreground">EUR/MWh</span>
                </div>

                {/* Simple Sparkline Chart */}
                <div className="h-[120px] w-full mt-2 overflow-hidden relative">
                    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="overflow-visible">
                        <defs>
                            <linearGradient id="gradientDetails" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        {/* Reference lines */}
                        <line x1="0" y1={getY(50)} x2={width} y2={getY(50)} stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-muted-foreground"/>
                        <line x1="0" y1={getY(52)} x2={width} y2={getY(52)} stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-muted-foreground"/>

                        {/* Area fill */}
                        <motion.path
                            d={`${pathData} L ${width} ${height} L 0 ${height} Z`}
                            fill="url(#gradientDetails)"
                            initial={false}
                            animate={{ d: `${pathData} L ${width} ${height} L 0 ${height} Z` }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                        {/* Stroke line */}
                        <motion.path
                            d={pathData}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-primary"
                            initial={false}
                            animate={{ d: pathData }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    </svg>
                    {/* Axis lines (visual decoration) */}
                    <div className="absolute bottom-0 w-full border-b border-border/50 border-dashed" />
                    <div className="absolute top-0 w-full border-t border-border/50 border-dashed" />
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>-5 perc</span>
                    <span>Most</span>
                </div>
            </CardContent>
        </Card>
    );
}
