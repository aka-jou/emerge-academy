import { useEffect, useState } from "react"

type TimeLeft = { hours: number; minutes: number; seconds: number }

function getTimeLeft(target: number): TimeLeft {
  const diff = Math.max(0, target - Date.now())
  const totalSeconds = Math.floor(diff / 1000)
  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

const pad = (n: number) => n.toString().padStart(2, "0")

export function CountdownTimer({ startsInMs }: { startsInMs: number }) {
  // El instante objetivo se fija una sola vez al montar el componente.
  const [target] = useState(() => Date.now() + startsInMs)
  const [time, setTime] = useState<TimeLeft>(() => getTimeLeft(target))

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const blocks: { value: number; label: string }[] = [
    { value: time.hours, label: "Horas" },
    { value: time.minutes, label: "Minutos" },
    { value: time.seconds, label: "Segundos" },
  ]

  return (
    <div className="flex flex-col items-center">
      <p className="text-sm font-medium text-muted">La sesión comienza en:</p>
      <div className="mt-4 flex items-start justify-center gap-3 sm:gap-4">
        {blocks.map((block) => (
          <div key={block.label} className="flex flex-col items-center gap-2">
            <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm sm:h-24 sm:w-24">
              <span className="font-mono text-3xl font-bold tabular-nums sm:text-4xl">{pad(block.value)}</span>
            </div>
            <span className="text-xs font-medium text-muted">{block.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
