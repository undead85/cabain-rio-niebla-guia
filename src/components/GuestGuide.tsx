"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import AppliancesScreen from "@/components/screens/AppliancesScreen";
import CheckinScreen from "@/components/screens/CheckinScreen";
import CheckoutScreen from "@/components/screens/CheckoutScreen";
import ContactScreen from "@/components/screens/ContactScreen";
import HomeScreen from "@/components/screens/HomeScreen";
import LocationScreen from "@/components/screens/LocationScreen";
import PlaceListScreen from "@/components/screens/PlaceListScreen";
import RulesScreen from "@/components/screens/RulesScreen";
import WifiScreen from "@/components/screens/WifiScreen";
import { categories, exploreContent, foodContent, marketsContent } from "@/content/guide";
import type { ScreenKey } from "@/content/types";

function screenFromHash(): ScreenKey {
  const hash = window.location.hash.slice(1);
  return categories.some((c) => c.key === hash) ? (hash as ScreenKey) : "home";
}

function subscribeToHistory(callback: () => void) {
  window.addEventListener("popstate", callback);
  return () => window.removeEventListener("popstate", callback);
}

const getServerScreen = (): ScreenKey => "home";

export default function GuestGuide() {
  const screen = useSyncExternalStore(subscribeToHistory, screenFromHash, getServerScreen);
  const paneRef = useRef<HTMLDivElement>(null);
  const skipFocus = useRef(true);

  useEffect(() => {
    const onPopState = () => window.scrollTo(0, 0);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
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

  return (
    <div className="relative mx-auto min-h-screen max-w-[440px] overflow-hidden bg-[#EFEDE4] shadow-[0_0_80px_-20px_rgba(31,40,35,0.35)]">
      <div
        key={screen}
        ref={paneRef}
        tabIndex={-1}
        className="outline-none motion-safe:animate-[rnfade_0.3s_ease_both]"
      >
        {screen === "home" && <HomeScreen onNavigate={go} />}
        {screen === "wifi" && <WifiScreen onBack={goHome} />}
        {screen === "checkin" && <CheckinScreen onBack={goHome} />}
        {screen === "rules" && <RulesScreen onBack={goHome} />}
        {screen === "location" && <LocationScreen onBack={goHome} />}
        {screen === "appliances" && <AppliancesScreen onBack={goHome} />}
        {screen === "markets" && <PlaceListScreen content={marketsContent} onBack={goHome} />}
        {screen === "food" && <PlaceListScreen content={foodContent} onBack={goHome} />}
        {screen === "explore" && <PlaceListScreen content={exploreContent} onBack={goHome} />}
        {screen === "checkout" && <CheckoutScreen onBack={goHome} />}
        {screen === "contact" && <ContactScreen onBack={goHome} />}
      </div>
      <footer className="-mt-4 pb-6 text-center text-[9px] font-semibold tracking-[0.3em] text-[#b6bbb0]">
        v{process.env.NEXT_PUBLIC_APP_VERSION}
      </footer>
    </div>
  );
}
