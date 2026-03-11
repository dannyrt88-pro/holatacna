import Link from 'next/link'

type GuideCtaStripProps = {
  title: string
  description: string
  primaryCtaLabel: string
  primaryCtaHref: string
  secondaryCtaLabel: string
  secondaryCtaHref: string
}

export function GuideCtaStrip({
  title,
  description,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
}: GuideCtaStripProps) {
  return (
    <section className="rounded-[32px] bg-slate-950 px-8 py-10 text-white shadow-xl sm:px-10 sm:py-12">
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      <p className="mt-4 max-w-3xl text-base leading-8 text-white/80 sm:text-lg">{description}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href={primaryCtaHref}
          className="inline-flex rounded-2xl bg-white px-6 py-4 text-base font-bold text-slate-950 transition hover:bg-slate-100"
        >
          {primaryCtaLabel}
        </Link>
        <Link
          href={secondaryCtaHref}
          className="inline-flex rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-base font-bold text-white transition hover:bg-white/15"
        >
          {secondaryCtaLabel}
        </Link>
      </div>
    </section>
  )
}
