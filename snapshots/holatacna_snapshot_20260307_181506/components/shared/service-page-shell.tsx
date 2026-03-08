import type { ReactNode } from 'react'

type ServicePageShellProps = {
  badge: string
  title: string
  description: string
  bullets: string[]
  formTitle: string
  gradientClass: string
  backgroundClass?: string
  children: ReactNode
}

export function ServicePageShell({
  badge,
  title,
  description,
  bullets,
  formTitle,
  gradientClass,
  backgroundClass = 'bg-slate-50',
  children,
}: ServicePageShellProps) {
  return (
    <main className={`min-h-screen ${backgroundClass}`}>
      <section className={`${gradientClass} px-5 py-14 text-white sm:px-6 lg:px-8 lg:py-20`}>
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <div className="mb-5 inline-block rounded-full bg-green-600 px-4 py-2 text-sm font-bold">
              {badge}
            </div>
            <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl">{title}</h1>
            <p className="mb-6 text-lg leading-8 text-white/90 sm:text-xl">{description}</p>
            <div className="grid gap-3 text-base leading-7 sm:text-lg">
              {bullets.map((bullet) => (
                <div key={bullet}>{bullet}</div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 text-slate-900 shadow-[0_10px_30px_rgba(0,0,0,0.15)] sm:p-6">
            <h2 className="mb-5 text-2xl font-bold">{formTitle}</h2>
            {children}
          </div>
        </div>
      </section>
    </main>
  )
}
