export interface RoomData {
  name: string;
  tileInfo: { label: string; value: string | number; color?: string }[]; // used in RoomTile
  temp: number;
  humidity: number;
  heatMode: "Kézi" | "AI";
  heating: "Hőszivattyú" | "Kazán";
  lights: "On" | "Off";
}

export const rooms: RoomData[] = [
  {
    name: "1) Iroda (107)",
    tileInfo: [
      { label: "Fűtés/Hűtés", value: "Aktív", color: "text-green-600" },
      { label: "Világítás", value: "On", color: "text-yellow-500" },
      { label: "Hőmérséklet", value: "20°C" },
    ],
    temp: 20,
    humidity: 40,
    heatMode: "Kézi",
    heating: "Hőszivattyú",
    lights: "On",
  },
  {
    name: "2) Iroda (106)",
    tileInfo: [
      { label: "Fűtés/Hűtés", value: "Inaktív", color: "text-red-600" },
      { label: "Világítás", value: "Off", color: "text-gray-400" },
      { label: "Hőmérséklet", value: "19°C" },
    ],
    temp: 19,
    humidity: 35,
    heatMode: "AI",
    heating: "Kazán",
    lights: "Off",
  },
  {
    name: "3) Iroda (108)",
    tileInfo: [
      { label: "Fűtés/Hűtés", value: "Aktív", color: "text-green-600" },
      { label: "Világítás", value: "Off", color: "text-gray-400" },
      { label: "Hőmérséklet", value: "21°C" },
    ],
    temp: 21,
    humidity: 45,
    heatMode: "Kézi",
    heating: "Hőszivattyú",
    lights: "Off",
  },
  {
    name: "4) Tárgyaló (105)",
    tileInfo: [
      { label: "Fűtés/Hűtés", value: "Inaktív", color: "text-red-600" },
      { label: "Szellőzés", value: "On", color: "text-yellow-500" },
      { label: "Hőmérséklet", value: "18°C" },
    ],
    temp: 18,
    humidity: 38,
    heatMode: "Kézi",
    heating: "Kazán",
    lights: "Off",
  },
  {
    name: "5) Bemutató terem",
    tileInfo: [
      { label: "Fűtés/Hűtés", value: "Aktív", color: "text-green-600" },
      { label: "Világítás", value: "On", color: "text-yellow-500" },
      { label: "Hőmérséklet", value: "22°C" },
    ],
    temp: 22,
    humidity: 42,
    heatMode: "AI",
    heating: "Hőszivattyú",
    lights: "On",
  },
  {
    name: "6) Nagylabor",
    tileInfo: [
      { label: "Fűtés/Hűtés", value: "Inaktív", color: "text-red-600" },
      { label: "Világítás", value: "On", color: "text-yellow-500" },
      { label: "Páratartalom", value: "50%", color: "text-blue-600" },
    ],
    temp: 20,
    humidity: 50,
    heatMode: "Kézi",
    heating: "Kazán",
    lights: "Off",
  },
  {
    name: "7) Gyengeáram",
    tileInfo: [
      { label: "Áramfogyasztás", value: "20kW", color: "text-yellow-600" },
      { label: "Riasztás", value: "Készenlét", color: "text-blue-600" },
      { label: "Hőmérséklet", value: "19°C" },
    ],
    temp: 19,
    humidity: 39,
    heatMode: "AI",
    heating: "Hőszivattyú",
    lights: "On",
  },
  {
    name: "8) Mosdó, Öltöző",
    tileInfo: [
      { label: "Fűtés/Hűtés", value: "Inaktív", color: "text-red-600" },
      { label: "Világítás", value: "On", color: "text-yellow-500" },
      { label: "Szellőzés", value: "On", color: "text-yellow-500" },
    ],
    temp: 21,
    humidity: 41,
    heatMode: "Kézi",
    heating: "Kazán",
    lights: "On",
  },
  {
    name: "9) Konyha",
    tileInfo: [
      { label: "Szellőzés", value: "On", color: "text-yellow-500" },
      { label: "Világítás", value: "Off", color: "text-gray-400" },
      { label: "Hőmérséklet", value: "20°C" },
    ],
    temp: 20,
    humidity: 36,
    heatMode: "AI",
    heating: "Hőszivattyú",
    lights: "Off",
  },
  {
    name: "10) Gépészet",
    tileInfo: [
      { label: "Fűtés/Hűtés", value: "Inaktív", color: "text-red-600" },
      { label: "Világítás", value: "On", color: "text-yellow-500" },
      { label: "Hőmérséklet", value: "18°C" },
    ],
    temp: 18,
    humidity: 43,
    heatMode: "Kézi",
    heating: "Kazán",
    lights: "Off",
  },
];
