import Link from 'next/link'

type GuideHeroProps = {
  badge?: string
  title: string
  description: string
  primaryCtaLabel?: string
  primaryCtaHref?: string
}

export function GuideHero({
  badge = 'Guia funcional',
  title,
  description,
  primaryCtaLabel,
  primaryCtaHref,
}: GuideHeroProps) {
  return (
    <section className="rounded-[32px] bg-[linear-gradient(135deg,#082f49_0%,#155e75_50%,#15803d_100%)] px-8 py-12 text-white shadow-xl sm:px-10 sm:py-14">
      <div className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em]">
        {badge}
      </div>
      <h1 className="max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">{description}</p>
      {primaryCtaLabel && primaryCtaHref ? (
        <div className="mt-8">
          <Link
            href={primaryCtaHref}
            className="inline-flex rounded-2xl bg-white px-6 py-4 text-base font-bold text-slate-950 transition hover:bg-slate-100"
          >
            {primaryCtaLabel}
          </Link>
        </div>
      ) : null}
    </section>
  )
}
