import { useEffect, useRef, useState } from "react";
import { Check, Copy, WifiHigh } from "@phosphor-icons/react";
import SubHeader from "@/components/ui/SubHeader";
import { wifiContent } from "@/content/guide";
import { WIFI_NETWORK, WIFI_PASS } from "@/content/site";

interface WifiScreenProps {
  onBack: () => void;
}

export default function WifiScreen({ onBack }: WifiScreenProps) {
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

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
    <div>
      <SubHeader title={wifiContent.title} onBack={onBack} />
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
  );
}
