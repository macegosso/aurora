import { Reveal } from "./Reveal";

/** Kicker + serif title + optional lede, used at the top of each view. */
export function SectionHeading({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="wrap pt-28 pb-2 md:pt-32">
      <Reveal immediate>
        <div className="mb-2.5 font-mono text-xs tracking-[0.16em] text-coral uppercase">
          {kicker}
        </div>
        <h1 className="font-serif text-[2rem] leading-[1.1] font-semibold tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {children ? (
          <p className="mt-3 max-w-[680px] text-[15px] text-muted">{children}</p>
        ) : null}
      </Reveal>
    </div>
  );
}
