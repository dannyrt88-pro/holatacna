import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'

type MedicalCitySeoPageProps = {
  badge: string
  title: string
  description: string
  bullets: string[]
  primaryHref: string
  primaryLabel: string
  gradientClass: string
  children: ReactNode
}

export function buildMedicalCityMetadata(title: string, description: string): Metadata {
  return { title, description }
}

export function MedicalCitySeoPage({
  badge,
  title,
  description,
  bullets,
  primaryHref,
  primaryLabel,
  gradientClass,
  children,
}: MedicalCitySeoPageProps) {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className={`${gradientClass} px-5 py-14 text-white sm:px-6 lg:px-8 lg:py-20`}>
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <div className="mb-5 inline-block rounded-full bg-green-600 px-4 py-2 text-sm font-bold">
              {badge}
            </div>
            <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl">{title}</h1>
            <p className="mb-6 text-lg leading-8 text-white/90 sm:text-xl">{description}</p>

            <div className="mb-6 grid gap-3 text-base leading-7 sm:text-lg">
              {bullets.map((bullet) => (
                <div key={bullet}>{bullet}</div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={primaryHref}
                className="rounded-xl bg-green-600 px-5 py-3 font-bold text-white transition hover:bg-green-500"
              >
                {primaryLabel}
              </Link>
            </div>
          </div>

          {children}
        </div>
      </section>
    </main>
  )
}
