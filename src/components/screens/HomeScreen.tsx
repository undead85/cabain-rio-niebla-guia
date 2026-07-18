import Image from "next/image";
import { categories, homeContent } from "@/content/guide";
import { CHECKIN_TIME, CHECKOUT_TIME, WIFI_NETWORK } from "@/content/site";
import type { ScreenKey } from "@/content/types";

interface HomeScreenProps {
  onNavigate: (next: ScreenKey) => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div>
      <div className="relative overflow-hidden bg-primary px-[26px] pt-[46px] pb-[34px] text-center">
        <div className="pointer-events-none absolute -bottom-[40%] -left-[20%] -right-[20%] h-[90%] hero-glow" />
        <div className="relative">
          <div className="ml-[0.46em] text-[10px] font-semibold tracking-[0.46em] text-accent">
            {homeContent.kicker}
          </div>
          <svg
            viewBox="0 0 200 116"
            width="74"
            aria-hidden="true"
            className="mx-auto mt-[22px] mb-[12px] block"
          >
            <polygon points="52,114 120,8 188,114" className="fill-accent-light" />
            <polygon points="12,114 68,44 124,114" className="fill-accent" />
          </svg>
          <h1 className="text-[27px] font-extrabold tracking-[0.045em] text-cream">
            {homeContent.title}
          </h1>
          <div className="mt-[10px] ml-[0.46em] text-[9px] font-semibold tracking-[0.46em] text-accent">
            {homeContent.tagline}
          </div>
          <p className="mx-auto mt-[22px] max-w-[300px] font-serif text-[19px] leading-[1.45] font-medium italic text-accent-light">
            {homeContent.welcome}
          </p>
        </div>
      </div>

      <div className="flex gap-2 px-[18px] pt-[18px] pb-1">
        <div className="flex-1 rounded-[14px] border border-primary/7 bg-surface px-[10px] py-3 text-center">
          <div className="mb-[5px] text-[8px] font-semibold tracking-[0.18em] text-accent">
            {homeContent.checkinLabel}
          </div>
          <div className="text-[16px] font-bold text-primary">{CHECKIN_TIME}</div>
        </div>
        <div className="flex-1 rounded-[14px] border border-primary/7 bg-surface px-[10px] py-3 text-center">
          <div className="mb-[5px] text-[8px] font-semibold tracking-[0.18em] text-accent">
            {homeContent.checkoutLabel}
          </div>
          <div className="text-[16px] font-bold text-primary">{CHECKOUT_TIME}</div>
        </div>
        <div className="flex-[1.3] rounded-[14px] border border-primary/7 bg-surface px-[10px] py-3 text-center">
          <div className="mb-[5px] text-[8px] font-semibold tracking-[0.18em] text-accent">
            {homeContent.wifiLabel}
          </div>
          <div className="text-[13px] font-bold text-primary">{WIFI_NETWORK}</div>
        </div>
      </div>

      <div className="px-[18px] pt-[14px] pb-1">
        <div className="relative h-[170px] w-full overflow-hidden rounded-[16px] bg-muted">
          <Image
            src="/images/cabana.avif"
            alt={homeContent.photoAlt}
            priority
            fill
            sizes="(max-width: 440px) 100vw, 404px"
            className="object-cover"
          />
        </div>
      </div>

      <nav aria-label={homeContent.navLabel} className="px-[18px] pt-[14px] pb-[30px]">
        <div className="grid grid-cols-2 gap-[11px]">
          {categories.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => onNavigate(c.key)}
              className="flex cursor-pointer appearance-none flex-col rounded-[16px] border border-primary/8 bg-surface px-[15px] py-4 text-left"
            >
              <div className="mb-[11px] grid h-[38px] w-[38px] place-items-center rounded-[11px] bg-muted text-primary">
                <c.icon size={22} />
              </div>
              <div className="text-[14px] font-bold text-primary">{c.label}</div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">{c.desc}</div>
            </button>
          ))}
        </div>
      </nav>

      <div className="px-[18px] pb-10 text-center font-serif text-[16px] font-medium italic text-subtle">
        {homeContent.farewell}
      </div>
    </div>
  );
}
