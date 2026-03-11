type GuideCardItem = {
  title: string
  description: string
}

type GuideCardGridProps = {
  badge?: string
  title: string
  items: GuideCardItem[]
}

export function GuideCardGrid({
  badge = 'Categorias',
  title,
  items,
}: GuideCardGridProps) {
  return (
    <section className="rounded-[28px] bg-white p-8 shadow-lg sm:p-10">
      <div className="mb-4 inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">
        {badge}
      </div>
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <article
            key={item.title}
            className="rounded-[24px] border border-slate-200 bg-slate-50 p-6"
          >
            <h3 className="text-2xl font-bold">{item.title}</h3>
            <p className="mt-3 text-base leading-7 text-slate-600">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
