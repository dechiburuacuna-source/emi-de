'use client'

interface LoadingScreenProps {
  message?: string
  progress?: number
}

export default function LoadingScreen({ message = 'Loading intelligence feed', progress = 0 }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-50 bg-bg flex flex-col items-center justify-center gap-5">
      <div className="flex gap-1 items-center mb-1">
        <div className="w-2.5 h-2.5 rounded-sm bg-dc" />
        <div className="w-2.5 h-2.5 rounded-sm bg-mining" />
        <div className="w-2.5 h-2.5 rounded-sm bg-energy" />
        <div className="w-2.5 h-2.5 rounded-sm bg-institutional" />
      </div>

      <div className="font-condensed text-xl font-extrabold tracking-[3px] uppercase text-ink">
        Industry <span className="text-dc">Intel</span>
      </div>

      <div className="w-9 h-9 border-2 border-border-2 border-t-dc rounded-full animate-spin" />

      <div className="flex items-center gap-1.5 font-mono text-[11px] text-ink-2">
        <span>{message}</span>
        <span className="flex gap-0.5">
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="text-dc"
              style={{
                animation: `blink 1.4s infinite ${i * 0.2}s`,
                display: 'inline-block',
              }}
            >.</span>
          ))}
        </span>
      </div>

      <div className="w-56 h-0.5 bg-border rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #00C8F0, #9D7BF8)',
          }}
        />
      </div>

      <span className="font-mono text-[10px] text-ink-3">{progress}%</span>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 0.2; } 50% { opacity: 1; } }
      `}</style>
    </div>
  )
}
