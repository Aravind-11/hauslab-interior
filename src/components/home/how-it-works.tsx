const STEPS = [
  {
    step: "01",
    title: "Set the room",
    desc: "Pick living, bedroom, kitchen, and more. Type width and depth in feet.",
  },
  {
    step: "02",
    title: "Place pieces",
    desc: "Drag from the library, snap to the grid, rotate, and recolor until it fits.",
  },
  {
    step: "03",
    title: "Lock the look",
    desc: "Tune walls and floors, save locally, or export a JSON snapshot of the plan.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-t border-ink/8 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-dark">
            How it works
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Three steps to a clearer plan
          </h2>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.step} className="relative text-center md:text-left">
              <span className="font-display text-5xl text-brass/45">{s.step}</span>
              <h3 className="mt-2 font-display text-xl text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/55">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
