"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { TopAlert } from "@/components/top-alert";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { RoomTile } from "@/components/room-tile";
import { RoomControlPanel } from "@/components/room-details";
import { rooms, RoomData } from "@/lib/room-data";
import { TramPriceTicker } from "@/components/moving-chart";
import { ConsumptionSection } from "@/components/consumption-section";

export default function ReportsPage() {
  const [showWarning, setShowWarning] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number>(0);

  // Split rooms into top, left, right, bottom (same as your earlier layout)
  const topRooms = [rooms[0], rooms[2], rooms[6]];
  const sideLeftRooms = [rooms[1], rooms[3]];
  const sideRightRooms = [rooms[5], rooms[7]];
  const bottomRooms = [rooms[4], rooms[8], rooms[9]];

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* ALERT */}
              <TopAlert
                title="Figyelmeztetés!"
                message="Probléma van az egyik szobában. Kérem ellenőrizze a részleteket."
                show={showWarning}
                onClose={() => setShowWarning(false)}
              />

              <div className="p-6 flex flex-col gap-4">
                {/* TOGGLE BUTTON */}
                <Button
                  variant="ghost"
                  onClick={() => setShowWarning(!showWarning)}
                >
                  Figyelmeztető kapcsoló
                </Button>
              </div>

              {/* Floor Plan + Tiles */}
              <div className="p-6 flex justify-center gap-16 items-center">
                <div className="grid grid-rows-[auto,1fr,auto] gap-4 relative">
                  {/* Top Rooms */}
                  <div className="flex justify-center gap-4">
                    {topRooms.map((room) => (
                      <div
                        key={room.name}
                        onClick={() => setSelectedRoom(room)}
                      >
                        <RoomTile
                          name={room.name}
                          info={room.tileInfo}
                          selected={selectedRoom?.name === room.name}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Middle: Left tiles + Floor Plan + Right tiles */}
                  <div className="flex items-center gap-4">
                    {/* Left Side */}
                    <div className="flex flex-col gap-4">
                      {sideLeftRooms.map((room) => (
                        <div
                          key={room.name}
                          onClick={() => setSelectedRoom(room)}
                        >
                          <RoomTile
                            name={room.name}
                            info={room.tileInfo}
                            selected={selectedRoom?.name === room.name}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Floor Plan */}
                    <div className="w-96 h-auto">
                      <img
                        src="/images/alaprajz_1.svg"
                        alt="Floor Plan"
                        className="w-full h-auto object-contain"
                      />
                    </div>

                    {/* Right Side */}
                    <div className="flex flex-col gap-4">
                      {sideRightRooms.map((room) => (
                        <div
                          key={room.name}
                          onClick={() => setSelectedRoom(room)}
                        >
                          <RoomTile
                            name={room.name}
                            info={room.tileInfo}
                            selected={selectedRoom?.name === room.name}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Rooms */}
                  <div className="flex justify-center gap-4">
                    {bottomRooms.map((room) => (
                      <div
                        key={room.name}
                        onClick={() => setSelectedRoom(room)}
                      >
                        <RoomTile
                          name={room.name}
                          info={room.tileInfo}
                          selected={selectedRoom?.name === room.name}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-96 shrink-0">
                  <ConsumptionSection className="w-full" />
                </div>
              </div>

              {/* Room Details Panel */}
              {selectedRoom && (
                <div className="mt-6 w-3/4 mx-auto flex gap-4">
                  <div className="flex-1">
                    <RoomControlPanel
                      key={selectedRoom.name}
                      initialTemp={selectedRoom.temp}
                      initialHumidity={selectedRoom.humidity}
                      initialHeatMode={selectedRoom.heatMode}
                      initialHeating={selectedRoom.heating}
                      initialLights={selectedRoom.lights}
                      currentPrice={currentPrice}
                    />
                  </div>
                  <div className="w-72 shrink-0">
                    <TramPriceTicker
                      className="h-full"
                      onPriceUpdate={setCurrentPrice}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
