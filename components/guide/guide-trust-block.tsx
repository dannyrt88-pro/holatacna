type GuideTrustBlockProps = {
  badge?: string
  title: string
  description: string
}

export function GuideTrustBlock({
  badge = 'Confianza',
  title,
  description,
}: GuideTrustBlockProps) {
  return (
    <section className="rounded-[28px] border border-emerald-200 bg-[linear-gradient(180deg,#ecfdf5_0%,#ffffff_100%)] p-8 shadow-lg sm:p-10">
      <div className="mb-4 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
        {badge}
      </div>
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      <p className="mt-4 max-w-4xl text-base leading-8 text-slate-700 sm:text-lg">{description}</p>
    </section>
  )
}
