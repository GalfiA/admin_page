"use client"

export interface RoomTileProps {
  name: string
  info: { label: string; value: string | number; color?: string }[]
  selected?: boolean
}

export function RoomTile({ name, info, selected }: RoomTileProps) {
  return (
    <div className={`shadow-md rounded-xl p-4 flex flex-col justify-between w-48
                    transition transform hover:scale-105 hover:shadow-xl cursor-pointer
                    ${selected ? "bg-blue-50 ring-2 ring-blue-500" : "bg-gray-100"}`}>
      {/* Room Name */}
      <h3 className="text-lg font-semibold mb-2">{name}</h3>

      {/* Room Info */}
      <div className="flex flex-col gap-1 text-sm">
        {info.map((item, index) => (
          <span key={index}>
            {item.label}:{" "}
            <span className={`font-bold ${item.color ?? "text-gray-800"}`}>{item.value}</span>
          </span>
        ))}
      </div>
    </div>
  )
}