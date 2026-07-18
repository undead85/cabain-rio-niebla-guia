"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  ArrowLeft,
  Car,
  CaretRight,
  ChatCircleDots,
  Check,
  CheckCircle,
  Copy,
  Info,
  NavigationArrow,
  Question,
  WhatsappLogo,
  WifiHigh,
  type Icon,
} from "@phosphor-icons/react";
import cerroPhoto from "../../public/images/cerro-indicaciones.png";
import {
  CHECKIN_TIME,
  CHECKOUT_TIME,
  WHATSAPP_URL,
  WIFI_NETWORK,
  WIFI_PASS,
} from "@/content/site";
import {
  appliancesContent,
  categories,
  checkinContent,
  checkoutContent,
  contactContent,
  exploreContent,
  foodContent,
  homeContent,
  locationContent,
  marketsContent,
  rulesContent,
  wifiContent,
} from "@/content/guide";
import type { Place, ScreenKey } from "@/content/types";

function mapsSearchUrl(q: string) {
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
}

function screenFromHash(): ScreenKey {
  const hash = window.location.hash.slice(1);
  return categories.some((c) => c.key === hash) ? (hash as ScreenKey) : "home";
}

function subscribeToHistory(callback: () => void) {
  window.addEventListener("popstate", callback);
  return () => window.removeEventListener("popstate", callback);
}

const getServerScreen = (): ScreenKey => "home";

function SubHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="sticky top-0 z-[5] flex items-center gap-[14px] bg-[#2E3A30] p-[18px] text-[#F5F5F2]">
      <button
        type="button"
        onClick={onBack}
        aria-label="Volver al inicio"
        className="grid h-[38px] w-[38px] cursor-pointer appearance-none place-items-center rounded-[11px] border-none bg-[rgba(247,247,242,0.1)] text-[#F5F5F2]"
      >
        <ArrowLeft size={22} />
      </button>
      <h2 className="text-[17px] font-bold tracking-[0.02em]">{title}</h2>
    </div>
  );
}

function IconTile({ icon: IconCmp }: { icon: Icon }) {
  return (
    <div className="grid h-[42px] w-[42px] flex-none place-items-center rounded-[12px] bg-[#E9ECE5] text-[#2E3A30]">
      <IconCmp size={21} />
    </div>
  );
}

function PlaceListScreen({
  title,
  intro,
  items,
  icon,
  onBack,
}: {
  title: string;
  intro: string;
  items: Place[];
  icon: Icon;
  onBack: () => void;
}) {
  return (
    <div>
      <SubHeader title={title} onBack={onBack} />
      <div className="px-5 pt-5 pb-10">
        <p className="mb-4 text-[13px] leading-[1.6] text-[#5D6B5A]">{intro}</p>
        <ul className="flex flex-col gap-[11px]">
          {items.map((item) => (
            <li key={item.name}>
              <a
                href={mapsSearchUrl(item.q)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-[14px] rounded-[16px] border border-[rgba(46,58,48,0.08)] bg-[#FBFAF6] p-4"
              >
                <IconTile icon={icon} />
                <div className="flex-1">
                  <div className="text-[14px] font-bold text-[#2E3A30]">{item.name}</div>
                  <div className="mt-0.5 text-[12px] text-[#8a8a82]">{item.note}</div>
                </div>
                <CaretRight size={18} className="text-[#b6bbb0]" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StepRow({ num, text }: { num: number; text: string }) {
  return (
    <li className="flex items-start gap-[11px]">
      <div className="mt-px grid h-[22px] w-[22px] flex-none place-items-center rounded-full bg-[#2E3A30] text-[11px] font-bold text-white">
        {num}
      </div>
      <div className="text-[13px] leading-[1.5] text-[#3A463C]">{text}</div>
    </li>
  );
}

export default function GuestGuide() {
  const screen = useSyncExternalStore(subscribeToHistory, screenFromHash, getServerScreen);
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const paneRef = useRef<HTMLDivElement>(null);
  const skipFocus = useRef(true);

  useEffect(() => {
    const onPopState = () => window.scrollTo(0, 0);
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  useEffect(() => {
    if (skipFocus.current) {
      skipFocus.current = false;
      return;
    }
    paneRef.current?.focus({ preventScroll: true });
  }, [screen]);

  function go(next: ScreenKey) {
    window.history.pushState({ guide: true }, "", "#" + next);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  function goHome() {
    if (window.history.state?.guide) {
      window.history.back();
    } else {
      window.history.replaceState(null, "", window.location.pathname);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  }

  function copyWifi() {
    if (!navigator.clipboard) return;
    navigator.clipboard
      .writeText(WIFI_PASS)
      .then(() => {
        setCopied(true);
        if (copyTimer.current) clearTimeout(copyTimer.current);
        copyTimer.current = setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {});
  }

  return (
    <div className="relative mx-auto min-h-screen max-w-[440px] overflow-hidden bg-[#EFEDE4] shadow-[0_0_80px_-20px_rgba(31,40,35,0.35)]">
      <div
        key={screen}
        ref={paneRef}
        tabIndex={-1}
        className="outline-none motion-safe:animate-[rnfade_0.3s_ease_both]"
      >
        {screen === "home" && (
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
                    onClick={() => go(c.key)}
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
        )}

        {screen === "wifi" && (
          <div>
            <SubHeader title={wifiContent.title} onBack={goHome} />
            <div className="px-5 pt-6 pb-10">
              <div className="rounded-[20px] bg-[#2E3A30] px-[26px] py-[30px] text-center text-[#F5F5F2]">
                <div className="mx-auto mb-[18px] grid h-[54px] w-[54px] place-items-center rounded-[16px] bg-[rgba(167,182,161,0.18)] text-[#A7B6A1]">
                  <WifiHigh size={28} />
                </div>
                <div className="mb-2 text-[10px] font-semibold tracking-[0.34em] text-[#8A9E84]">
                  {wifiContent.networkLabel}
                </div>
                <div className="text-[24px] font-bold tracking-[0.01em]">{WIFI_NETWORK}</div>
                <div className="my-[22px] h-px bg-[rgba(138,158,132,0.25)]" />
                <div className="mb-2 text-[10px] font-semibold tracking-[0.34em] text-[#8A9E84]">
                  {wifiContent.passLabel}
                </div>
                <div className="text-[24px] font-bold tracking-[0.04em]">{WIFI_PASS}</div>
              </div>
              <button
                type="button"
                onClick={copyWifi}
                className="mt-[14px] flex w-full cursor-pointer appearance-none items-center justify-center gap-[9px] rounded-[14px] border-none bg-[#8A9E84] p-4 text-[13px] font-bold tracking-[0.08em] text-white"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                <span aria-live="polite">{copied ? wifiContent.copiedCta : wifiContent.copyCta}</span>
              </button>
              <p className="mx-2 mt-5 text-center text-[13px] leading-[1.7] text-[#5D6B5A]">
                {wifiContent.hint}
              </p>
            </div>
          </div>
        )}

        {screen === "checkin" && (
          <div>
            <SubHeader title={checkinContent.title} onBack={goHome} />
            <div className="px-5 pt-6 pb-10">
              <div className="mb-5 flex gap-[11px]">
                <div className="flex-1 rounded-[16px] border border-[rgba(46,58,48,0.08)] bg-[#FBFAF6] p-[18px] text-center">
                  <div className="mb-[7px] text-[9px] font-semibold tracking-[0.24em] text-[#8A9E84]">
                    {checkinContent.arrivalLabel}
                  </div>
                  <div className="text-[22px] font-bold">{CHECKIN_TIME}</div>
                </div>
                <div className="flex-1 rounded-[16px] border border-[rgba(46,58,48,0.08)] bg-[#FBFAF6] p-[18px] text-center">
                  <div className="mb-[7px] text-[9px] font-semibold tracking-[0.24em] text-[#8A9E84]">
                    {checkinContent.departureLabel}
                  </div>
                  <div className="text-[22px] font-bold">{CHECKOUT_TIME}</div>
                </div>
              </div>
              <div className="mb-[14px] text-[11px] font-semibold tracking-[0.3em] text-[#8A9E84]">
                {checkinContent.stepsLabel}
              </div>
              <ol className="flex flex-col gap-3">
                {checkinContent.steps.map((step, i) => (
                  <li
                    key={step}
                    className="flex gap-[14px] rounded-[14px] border border-[rgba(46,58,48,0.08)] bg-[#FBFAF6] p-4"
                  >
                    <div className="grid h-[26px] w-[26px] flex-none place-items-center rounded-full bg-[#2E3A30] text-[12px] font-bold text-white">
                      {i + 1}
                    </div>
                    <div className="text-[14px] leading-[1.5] text-[#3A463C]">{step}</div>
                  </li>
                ))}
              </ol>
              <div className="mt-[18px] flex items-center gap-3 rounded-[14px] bg-[#E9ECE5] px-4 py-[15px]">
                <Car size={22} className="flex-none text-[#2E3A30]" />
                <div className="text-[13px] leading-[1.4] font-medium text-[#3A463C]">
                  {checkinContent.parkingNote}
                </div>
              </div>
            </div>
          </div>
        )}

        {screen === "rules" && (
          <div>
            <SubHeader title={rulesContent.title} onBack={goHome} />
            <div className="px-5 pt-6 pb-10">
              <div>
                {rulesContent.sections.map((section) => (
                  <div key={section.title}>
                    <h3 className="mt-6 mb-2 text-[11px] font-semibold tracking-[0.3em] text-[#8A9E84]">
                      {section.title.toUpperCase()}
                    </h3>
                    <ul>
                      {section.items.map((r) => (
                        <li
                          key={r.title}
                          className="flex items-start gap-[13px] border-b border-[rgba(46,58,48,0.09)] py-[15px]"
                        >
                          <r.icon size={21} className="mt-px flex-none text-[#8A9E84]" />
                          <div>
                            <div className="text-[14px] font-semibold text-[#2E3A30]">
                              {r.title}
                            </div>
                            {r.note ? (
                              <div className="mt-0.5 text-[12.5px] leading-[1.5] text-[#8a8a82]">
                                {r.note}
                              </div>
                            ) : null}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="mx-1.5 mt-6 text-center font-serif text-[16px] leading-[1.5] font-medium italic text-[#5D6B5A]">
                {rulesContent.farewell}
              </p>
            </div>
          </div>
        )}

        {screen === "location" && (
          <div>
            <SubHeader title={locationContent.title} onBack={goHome} />
            <div className="px-5 pt-5 pb-10">
              <div className="mt-[14px] rounded-[16px] border border-[rgba(46,58,48,0.08)] bg-[#FBFAF6] p-5">
                <div className="mb-[7px] text-[10px] font-semibold tracking-[0.3em] text-[#8A9E84]">
                  {locationContent.addressLabel}
                </div>
                <div className="text-[16px] font-semibold text-[#2E3A30]">
                  {locationContent.address}
                </div>
                <div className="mt-0.5 text-[13px] text-[#8a8a82]">
                  {locationContent.addressDetail}
                </div>
              </div>
              <a
                href={locationContent.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex w-full items-center justify-center gap-[10px] rounded-[14px] bg-[#2E3A30] p-4 text-[13px] font-bold tracking-[0.06em] text-[#F5F5F2]"
              >
                <NavigationArrow size={18} />
                {locationContent.directionsCta}
              </a>
              <Image
                src={cerroPhoto}
                alt={locationContent.photoAlt}
                className="mt-[14px] block w-full rounded-[16px]"
              />
              <div className="mt-[14px] flex gap-3 rounded-[14px] bg-[#E9ECE5] px-4 py-[15px]">
                <Info size={21} className="flex-none text-[#2E3A30]" />
                <div className="text-[12.5px] leading-[1.5] text-[#3A463C]">
                  {locationContent.roadNote}
                </div>
              </div>
            </div>
          </div>
        )}

        {screen === "appliances" && (
          <div>
            <SubHeader title={appliancesContent.title} onBack={goHome} />
            <div className="px-5 pt-5 pb-10">
              <p className="mb-[18px] text-[13px] leading-[1.6] text-[#5D6B5A]">
                {appliancesContent.intro}
              </p>
              <ul className="flex flex-col gap-3">
                {appliancesContent.items.map((a) => (
                  <li
                    key={a.title}
                    className="rounded-[16px] border border-[rgba(46,58,48,0.08)] bg-[#FBFAF6] px-[18px] py-4"
                  >
                    <div className="mb-[13px] flex items-center gap-[13px]">
                      <IconTile icon={a.icon} />
                      <div>
                        <h3 className="text-[15px] font-bold text-[#2E3A30]">{a.title}</h3>
                        <div className="mt-px text-[12px] text-[#8a8a82]">{a.subtitle}</div>
                      </div>
                    </div>
                    <ol className="flex flex-col gap-[9px]">
                      {a.steps.map((step, i) => (
                        <StepRow key={step} num={i + 1} text={step} />
                      ))}
                    </ol>
                  </li>
                ))}
              </ul>
              <div className="mt-[18px] flex gap-3 rounded-[14px] bg-[#E9ECE5] px-4 py-[15px]">
                <Question size={21} className="flex-none text-[#2E3A30]" />
                <div className="text-[12.5px] leading-[1.5] text-[#3A463C]">
                  {appliancesContent.helpNote}
                </div>
              </div>
            </div>
          </div>
        )}

        {screen === "markets" && (
          <PlaceListScreen
            title={marketsContent.title}
            intro={marketsContent.intro}
            items={marketsContent.items}
            icon={marketsContent.icon}
            onBack={goHome}
          />
        )}

        {screen === "food" && (
          <PlaceListScreen
            title={foodContent.title}
            intro={foodContent.intro}
            items={foodContent.items}
            icon={foodContent.icon}
            onBack={goHome}
          />
        )}

        {screen === "explore" && (
          <PlaceListScreen
            title={exploreContent.title}
            intro={exploreContent.intro}
            items={exploreContent.items}
            icon={exploreContent.icon}
            onBack={goHome}
          />
        )}

        {screen === "checkout" && (
          <div>
            <SubHeader title={checkoutContent.title} onBack={goHome} />
            <div className="px-5 pt-6 pb-10">
              <div className="mb-5 flex items-center justify-between rounded-[16px] bg-[#2E3A30] px-5 py-[18px] text-[#F5F5F2]">
                <span className="text-[11px] font-semibold tracking-[0.2em] text-[#A7B6A1]">
                  {checkoutContent.checkoutLabel}
                </span>
                <span className="text-[20px] font-bold">{CHECKOUT_TIME}</span>
              </div>
              <ul>
                {checkoutContent.steps.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-[13px] border-b border-[rgba(46,58,48,0.09)] py-[14px]"
                  >
                    <CheckCircle size={21} className="mt-px flex-none text-[#8A9E84]" />
                    <div className="text-[14px] leading-[1.5] font-medium text-[#3A463C]">{s}</div>
                  </li>
                ))}
              </ul>
              <p className="mx-1.5 mt-6 text-center font-serif text-[17px] leading-[1.5] font-medium italic text-[#5D6B5A]">
                {checkoutContent.farewell}
              </p>
            </div>
          </div>
        )}

        {screen === "contact" && (
          <div>
            <SubHeader title={contactContent.title} onBack={goHome} />
            <div className="px-5 pt-[30px] pb-10 text-center">
              <div className="mx-auto mb-[18px] grid h-[72px] w-[72px] place-items-center rounded-full bg-[#2E3A30] text-[#A7B6A1]">
                <ChatCircleDots size={34} />
              </div>
              <div className="font-serif text-[26px] font-medium text-[#2E3A30]">
                {contactContent.name}
              </div>
              <div className="mt-1 text-[10px] font-semibold tracking-[0.3em] text-[#8A9E84]">
                {contactContent.role}
              </div>
              <p className="mx-auto mt-[18px] mb-[26px] max-w-[280px] text-[14px] leading-[1.6] text-[#5D6B5A]">
                {contactContent.message}
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-[10px] rounded-[14px] bg-[#8A9E84] p-4 text-[13px] font-bold tracking-[0.06em] text-white"
              >
                <WhatsappLogo size={20} />
                {contactContent.cta}
              </a>
            </div>
          </div>
        )}
      </div>
      <footer className="-mt-4 pb-6 text-center text-[9px] font-semibold tracking-[0.3em] text-[#b6bbb0]">
        v{process.env.NEXT_PUBLIC_APP_VERSION}
      </footer>
    </div>
  );
}
