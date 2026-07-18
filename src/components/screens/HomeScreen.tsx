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
      <div className="relative overflow-hidden bg-[#2E3A30] px-[26px] pt-[46px] pb-[34px] text-center">
        <div className="pointer-events-none absolute -bottom-[40%] -left-[20%] -right-[20%] h-[90%] bg-[radial-gradient(60%_100%_at_50%_100%,rgba(167,182,161,0.28),transparent_65%)]" />
        <div className="relative">
          <div className="ml-[0.46em] text-[10px] font-semibold tracking-[0.46em] text-[#8A9E84]">
            {homeContent.kicker}
          </div>
          <svg
            viewBox="0 0 200 116"
            width="74"
            aria-hidden="true"
            className="mx-auto mt-[22px] mb-[12px] block"
          >
            <polygon points="52,114 120,8 188,114" fill="#A7B6A1" />
            <polygon points="12,114 68,44 124,114" fill="#8A9E84" />
          </svg>
          <h1 className="text-[27px] font-extrabold tracking-[0.045em] text-[#F5F5F2]">
            {homeContent.title}
          </h1>
          <div className="mt-[10px] ml-[0.46em] text-[9px] font-semibold tracking-[0.46em] text-[#8A9E84]">
            {homeContent.tagline}
          </div>
          <p className="mx-auto mt-[22px] max-w-[300px] font-serif text-[19px] leading-[1.45] font-medium italic text-[#A7B6A1]">
            {homeContent.welcome}
          </p>
        </div>
      </div>

      <div className="flex gap-2 px-[18px] pt-[18px] pb-1">
        <div className="flex-1 rounded-[14px] border border-[rgba(46,58,48,0.07)] bg-[#FBFAF6] px-[10px] py-3 text-center">
          <div className="mb-[5px] text-[8px] font-semibold tracking-[0.18em] text-[#8A9E84]">
            {homeContent.checkinLabel}
          </div>
          <div className="text-[16px] font-bold text-[#2E3A30]">{CHECKIN_TIME}</div>
        </div>
        <div className="flex-1 rounded-[14px] border border-[rgba(46,58,48,0.07)] bg-[#FBFAF6] px-[10px] py-3 text-center">
          <div className="mb-[5px] text-[8px] font-semibold tracking-[0.18em] text-[#8A9E84]">
            {homeContent.checkoutLabel}
          </div>
          <div className="text-[16px] font-bold text-[#2E3A30]">{CHECKOUT_TIME}</div>
        </div>
        <div className="flex-[1.3] rounded-[14px] border border-[rgba(46,58,48,0.07)] bg-[#FBFAF6] px-[10px] py-3 text-center">
          <div className="mb-[5px] text-[8px] font-semibold tracking-[0.18em] text-[#8A9E84]">
            {homeContent.wifiLabel}
          </div>
          <div className="text-[13px] font-bold text-[#2E3A30]">{WIFI_NETWORK}</div>
        </div>
      </div>

      <div className="px-[18px] pt-[14px] pb-1">
        <div className="relative h-[170px] w-full overflow-hidden rounded-[16px] bg-[#E9ECE5]">
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
              className="flex cursor-pointer appearance-none flex-col rounded-[16px] border border-[rgba(46,58,48,0.08)] bg-[#FBFAF6] px-[15px] py-4 text-left"
            >
              <div className="mb-[11px] grid h-[38px] w-[38px] place-items-center rounded-[11px] bg-[#E9ECE5] text-[#2E3A30]">
                <c.icon size={22} />
              </div>
              <div className="text-[14px] font-bold text-[#2E3A30]">{c.label}</div>
              <div className="mt-0.5 text-[11px] text-[#8a8a82]">{c.desc}</div>
            </button>
          ))}
        </div>
      </nav>

      <div className="px-[18px] pb-10 text-center font-serif text-[16px] font-medium italic text-[#5D6B5A]">
        {homeContent.farewell}
      </div>
    </div>
  );
}
