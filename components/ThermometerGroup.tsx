"use client"


import React, { ChangeEvent, useState } from 'react';

// Individual Thermometer Component
interface ThermometerProps {
  label: string;
  min?: number;
  max?: number;
  initialValue?: number;
}

const Thermometer: React.FC<ThermometerProps> = ({ 
  label, 
  min = 10, 
  max = 40, 
  initialValue = 20 
}) => {
  const [temperature, setTemperature] = useState(initialValue);

  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTemperature(Number(event.target.value));
  };

  // Calculate the percentage height of the fill
  // Ensure it stays within 0-100%
  const percentage = Math.min(100, Math.max(0, ((temperature - min) / (max - min)) * 100));

  // Determine color based on temperature for visual feedback
  const getTemperatureColor = (temp: number) => {
    if (temp < -15) return '#0000ff'; // Dark blue for extremely cold
    if (temp < 0) return '#3b82f6'; // Blue for freezing
    if (temp < 15) return '#0ea5e9'; // Light blue for cold
    if (temp < 25) return '#10b981'; // Green for comfortable
    if (temp < 35) return '#f59e0b'; // Orange for warm
    if (temp < 50) return '#ef4444'; // Red for hot
    if (temp < 65) return '#b91c1c'; // Dark red for very hot
    return '#000000';
  };

  const currentColor = getTemperatureColor(temperature);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '1rem',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 600 }}>{label}</h3>
      
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
        {/* Thermometer Graphic */}
        <div style={{
          position: 'relative',
          width: '50px',
          height: '200px',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '1.5rem' // Space for the bulb overhang
        }}>
          {/* Stem (Background) */}
          <div style={{
            width: '16px',
            height: '100%',
            backgroundColor: '#e5e7eb',
            borderRadius: '9999px',
            position: 'relative',
            overflow: 'hidden', // Ensures fill stays inside rounded corners
            border: '1px solid #d1d5db',
            zIndex: 1
          }}>
            {/* Animated Fill */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: `${percentage}%`,
              backgroundColor: currentColor,
              // This transition creates the delayed animation effect
              transition: 'height 10s cubic-bezier(0.4, 0, 0.2, 1), background-color 10s ease',
            }} />
          </div>

          {/* Bulb */}
          <div style={{
            position: 'absolute',
            bottom: '-20px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: currentColor,
            border: '1px solid #d1d5db',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            transition: 'background-color 10s ease',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <span style={{ 
              color: 'white', 
              fontSize: '0.85rem', 
              fontWeight: 'bold',
              textShadow: '0 1px 2px rgba(0,0,0,0.2)'
            }}>
              {temperature}°
            </span>
          </div>
        </div>

        {/* Controls */}
        <div style={{
          display: 'flex',
          height: '200px',
          alignItems: 'center',
          gap: '0.25rem',
          paddingTop: '0.5rem',
          direction: 'rtl',// Align top of slider with top of thermometer stem
        }}>
          <input
            type="range"
            min={min}
            max={max}
            value={temperature}
            onChange={handleSliderChange}
            style={{
              writingMode: 'vertical-rl',
              width: '8px',
              height: '150px',
              cursor: 'pointer',
              background: 'transparent',}}
          />
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '150px',
            fontSize: '0.75rem',
            color: '#6b7280',
            fontWeight: 500,
          }}>
            <span>{max}°</span>
            <span>{Math.round((min + max) / 2)}°</span>
            <span>{min}°</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ThermometerGroup() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', padding: '2rem', justifyContent: 'center', backgroundColor: '#f9fafb', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
      <Thermometer label="Office" initialValue={22} />
      <Thermometer label="Kitchen" initialValue={19} />
      <Thermometer label="Freezer" initialValue={-18} min={-30} max={10} />
      <Thermometer label="Boiler" initialValue={60} min={20} max={70} />
    </div>
  );
}