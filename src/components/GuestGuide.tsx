"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  ArrowLeft,
  Bag,
  Car,
  CaretRight,
  ChatCircleDots,
  Check,
  CheckCircle,
  CigaretteSlash,
  Coffee,
  Compass,
  CookingPot,
  Copy,
  Drop,
  DropSlash,
  Flame,
  ForkKnife,
  Info,
  Key,
  Lightbulb,
  MapPinLine,
  NavigationArrow,
  Plant,
  Plug,
  Prohibit,
  Question,
  Scroll,
  ShoppingCartSimple,
  Sparkle,
  SuitcaseSimple,
  TShirt,
  TelevisionSimple,
  ThermometerSimple,
  Trash,
  WhatsappLogo,
  WifiHigh,
  Wind,
  type Icon,
} from "@phosphor-icons/react";
import cerroPhoto from "../../public/images/cerro-indicaciones.png";

type ScreenKey =
  | "home"
  | "wifi"
  | "checkin"
  | "rules"
  | "location"
  | "appliances"
  | "markets"
  | "food"
  | "explore"
  | "checkout"
  | "contact";

const WIFI_NETWORK = "__WIFI_NETWORK__";
const WIFI_PASS = "__WIFI_PASS__";
const CHECKIN_TIME = "15:00";
const CHECKOUT_TIME = "12:00";
const WHATSAPP_URL =
  "https://wa.me/__PHONE_NUMBER__?text=Hola%20Anita%2C%20te%20escribo%20desde%20la%20caba%C3%B1a%20R%C3%ADo%20y%20Niebla.";

const cats: { key: ScreenKey; icon: Icon; label: string; desc: string }[] = [
  { key: "wifi", icon: WifiHigh, label: "Wi-Fi", desc: "Red y clave" },
  { key: "checkin", icon: Key, label: "Check-in", desc: "Acceso y horarios" },
  { key: "rules", icon: Scroll, label: "Reglas", desc: "Normas del hogar" },
  { key: "location", icon: MapPinLine, label: "Cómo volver", desc: "Mapa y auto" },
  { key: "appliances", icon: Plug, label: "Artefactos", desc: "Cómo usarlos" },
  { key: "markets", icon: ShoppingCartSimple, label: "Supermercados", desc: "Dónde abastecerse" },
  { key: "food", icon: ForkKnife, label: "Dónde comer", desc: "Recomendados" },
  { key: "explore", icon: Compass, label: "Qué hacer", desc: "Valdivia y más" },
  { key: "checkout", icon: SuitcaseSimple, label: "Antes de irte", desc: "Check-out" },
  { key: "contact", icon: ChatCircleDots, label: "Contacto", desc: "Escríbeme" },
];

const ruleSections: {
  title: string;
  items: { icon: Icon; title: string; note: string }[];
}[] = [
  {
    title: "Normas Generales",
    items: [
      {
        icon: CigaretteSlash,
        title: "Área de fumadores en terraza",
        note: "Las colillas deben depositarse en una bolsa y dejarse en el basurero de la terraza.",
      },
      {
        icon: Prohibit,
        title: "No botar papeles al inodoro",
        note: "El baño funciona con fosa séptica. Por favor, no arrojes papel ni otros residuos al inodoro, ya que se tapa. Usa el basurero.",
      },
      {
        icon: DropSlash,
        title: "Para desmaquillar, no uses las toallas blancas",
        note: "Usa las toallitas desmaquillantes. Las encontrarás en el mueble del baño.",
      },
      {
        icon: Plant,
        title: "Las plantas son reales — cuídalas como en casa",
        note: "Tanto las de interior como las del jardín.",
      },
    ],
  },
  {
    title: "Cocina y Áreas Comunes",
    items: [
      {
        icon: CookingPot,
        title: "Deja la cocina limpia",
        note: "La loza, el horno y las ollas deben quedar limpios después de usarlos.",
      },
      {
        icon: Flame,
        title: "Limpia la parrilla",
        note: "Si la utilizas, debe quedar limpia como la encontraste.",
      },
    ],
  },
  {
    title: "Antes de Retirarte",
    items: [
      {
        icon: Trash,
        title: "Basura al contenedor de la terraza",
        note: "La basura del baño y la cocina va en el basurero grande al costado de la terraza.",
      },
      {
        icon: Lightbulb,
        title: "Apaga luces, TV, cocina y calefacción al salir",
        note: "",
      },
      {
        icon: Drop,
        title: "Cierra las llaves",
        note: "Revisa que no haya agua corriendo en las llaves de la cabaña y el patio.",
      },
      {
        icon: Bag,
        title: "No olvides tus pertenencias",
        note: "Podemos enviarte lo que quede, aunque el envío va a tu cargo.",
      },
    ],
  },
  {
    title: "Uso de la Plancha",
    items: [
      {
        icon: Wind,
        title: "Plancha a vapor disponible",
        note: "Cuenta con su manual de uso. Si no sabes cómo utilizarla, no dudes en consultarme.",
      },
    ],
  },
  {
    title: "Limpieza Adicional",
    items: [
      {
        icon: Sparkle,
        title: "Déjala como la encontraste",
        note: "En caso de requerir limpieza adicional significativa al finalizar la estadía, se aplicará un cargo proporcional al trabajo extra ($80.000). Esto incluye dejar la cabaña con suciedad excesiva, basura acumulada, ropa de cama o toallas manchadas, o cualquier daño que requiera limpieza profunda.",
      },
    ],
  },
];

const appliances: { icon: Icon; title: string; subtitle: string; steps: string[] }[] = [
  {
    icon: ThermometerSimple,
    title: "Calefacción",
    subtitle: "Estufa eléctrica / split",
    steps: [
      "Enciende desde el control o el botón de encendido.",
      "Ajusta la temperatura a unos 21–22°C.",
      "Apágala al salir o al dormir para ahorrar energía.",
    ],
  },
  {
    icon: TShirt,
    title: "Plancha a vapor",
    subtitle: "En el clóset del pasillo",
    steps: [
      "Llena el depósito con agua hasta la marca.",
      "Conéctala y espera 1–2 minutos a que caliente.",
      "Usa el gatillo para soltar el vapor. Vacíala al terminar.",
    ],
  },
  {
    icon: Coffee,
    title: "Hervidor",
    subtitle: "Sobre la encimera",
    steps: [
      "Llena con agua entre el mínimo y el máximo.",
      "Apóyalo en la base y presiona el interruptor.",
      "Se apaga solo al hervir.",
    ],
  },
  {
    icon: TelevisionSimple,
    title: "Televisor",
    subtitle: "Smart TV con streaming",
    steps: [
      "Enciende con el control; entrada HDMI por defecto.",
      `Conéctate al Wi-Fi ${WIFI_NETWORK} si lo pide.`,
      "Cierra tu sesión de las apps antes de irte.",
    ],
  },
];

function mapsSearchUrl(q: string) {
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
}

const markets = [
  { name: "Jumbo Valdivia", note: "El más grande, de todo", q: "Jumbo Valdivia" },
  { name: "Líder Valdivia", note: "Variedad y buen precio", q: "Lider Valdivia" },
  { name: "Unimarc", note: "Céntrico y práctico", q: "Unimarc Valdivia" },
  { name: "Santa Isabel", note: "Compras rápidas", q: "Santa Isabel Valdivia" },
  { name: "Mercado Fluvial", note: "Pescados y mariscos frescos", q: "Mercado Fluvial Valdivia" },
];

const food = [
  {
    name: "Cervecería Kunstmann",
    note: "Cerveza artesanal y cocina alemana",
    q: "Cerveceria Kunstmann Valdivia",
  },
  { name: "Café Haussmann", note: "Crudos y kuchen, un clásico", q: "Cafe Haussmann Valdivia" },
  { name: "Entrelagos", note: "Chocolates, café y onces", q: "Entrelagos Valdivia" },
  { name: "La Última Frontera", note: "Bar bohemio y sándwiches", q: "La Ultima Frontera Valdivia" },
  { name: "El Growler", note: "Cervecería artesanal y pizzas", q: "El Growler Valdivia" },
  { name: "Sello Propio", note: "Cocina de autor", q: "Sello Propio Cocina Valdivia" },
];

const explore = [
  { name: "Mercado Fluvial", note: "Lobos marinos junto al río", q: "Mercado Fluvial Valdivia" },
  { name: "Costanera de Valdivia", note: "Paseo a orillas del río", q: "Costanera Valdivia" },
  {
    name: "Jardín Botánico UACh",
    note: "Naturaleza en Isla Teja",
    q: "Jardin Botanico Universidad Austral Valdivia",
  },
  { name: "Parque Saval", note: "Lagunas y senderos", q: "Parque Saval Valdivia" },
  {
    name: "Castillos de Niebla y Corral",
    note: "Fuertes históricos y paseo en barco",
    q: "Castillo de Niebla Valdivia",
  },
  {
    name: "Museo de Arte Contemporáneo",
    note: "Arte en Isla Teja",
    q: "Museo de Arte Contemporaneo Valdivia",
  },
];

const checkinSteps = [
  "Avísame cuando estés en camino para coordinar tu llegada.",
  "El acceso es por el sector Pino Huacho 2; el camino tiene huellas de cemento y sube cualquier vehículo.",
  "Te enviaré el código de la cerradura el día de tu llegada. ¡Bienvenido!",
];

const checkoutSteps = [
  "Deja las llaves donde acordamos al ingresar.",
  "Apaga luces, calefacción y cierra ventanas.",
  "Saca la basura al lugar indicado.",
  "Deja la loza limpia; del resto me encargo yo.",
];

function screenFromHash(): ScreenKey {
  const hash = window.location.hash.slice(1);
  return cats.some((c) => c.key === hash) ? (hash as ScreenKey) : "home";
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
  items: { name: string; note: string; q: string }[];
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
                  GUÍA DEL HUÉSPED
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
                  ENTRE RÍO Y NIEBLA
                </h1>
                <div className="mt-[10px] ml-[0.46em] text-[9px] font-semibold tracking-[0.46em] text-[#8A9E84]">
                  CABAÑA · VALDIVIA
                </div>
                <p className="mx-auto mt-[22px] max-w-[300px] font-serif text-[19px] leading-[1.45] font-medium italic text-[#A7B6A1]">
                  Qué bueno tenerte aquí. Todo lo que necesitas, a un toque.
                </p>
              </div>
            </div>

            <div className="flex gap-2 px-[18px] pt-[18px] pb-1">
              <div className="flex-1 rounded-[14px] border border-[rgba(46,58,48,0.07)] bg-[#FBFAF6] px-[10px] py-3 text-center">
                <div className="mb-[5px] text-[8px] font-semibold tracking-[0.18em] text-[#8A9E84]">
                  CHECK-IN
                </div>
                <div className="text-[16px] font-bold text-[#2E3A30]">{CHECKIN_TIME}</div>
              </div>
              <div className="flex-1 rounded-[14px] border border-[rgba(46,58,48,0.07)] bg-[#FBFAF6] px-[10px] py-3 text-center">
                <div className="mb-[5px] text-[8px] font-semibold tracking-[0.18em] text-[#8A9E84]">
                  CHECK-OUT
                </div>
                <div className="text-[16px] font-bold text-[#2E3A30]">{CHECKOUT_TIME}</div>
              </div>
              <div className="flex-[1.3] rounded-[14px] border border-[rgba(46,58,48,0.07)] bg-[#FBFAF6] px-[10px] py-3 text-center">
                <div className="mb-[5px] text-[8px] font-semibold tracking-[0.18em] text-[#8A9E84]">
                  WI-FI
                </div>
                <div className="text-[13px] font-bold text-[#2E3A30]">{WIFI_NETWORK}</div>
              </div>
            </div>

            <div className="px-[18px] pt-[14px] pb-1">
              <div className="relative h-[170px] w-full overflow-hidden rounded-[16px] bg-[#E9ECE5]">
                <Image
                  src="/images/cabana.avif"
                  alt="Cabaña Entre Río y Niebla"
                  priority
                  fill
                  sizes="(max-width: 440px) 100vw, 404px"
                  className="object-cover"
                />
              </div>
            </div>

            <nav aria-label="Secciones de la guía" className="px-[18px] pt-[14px] pb-[30px]">
              <div className="grid grid-cols-2 gap-[11px]">
                {cats.map((c) => (
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
              Cualquier cosa, estoy para ayudarte. — Anita
            </div>
          </div>
        )}

        {screen === "wifi" && (
          <div>
            <SubHeader title="Wi-Fi" onBack={goHome} />
            <div className="px-5 pt-6 pb-10">
              <div className="rounded-[20px] bg-[#2E3A30] px-[26px] py-[30px] text-center text-[#F5F5F2]">
                <div className="mx-auto mb-[18px] grid h-[54px] w-[54px] place-items-center rounded-[16px] bg-[rgba(167,182,161,0.18)] text-[#A7B6A1]">
                  <WifiHigh size={28} />
                </div>
                <div className="mb-2 text-[10px] font-semibold tracking-[0.34em] text-[#8A9E84]">
                  RED
                </div>
                <div className="text-[24px] font-bold tracking-[0.01em]">{WIFI_NETWORK}</div>
                <div className="my-[22px] h-px bg-[rgba(138,158,132,0.25)]" />
                <div className="mb-2 text-[10px] font-semibold tracking-[0.34em] text-[#8A9E84]">
                  CLAVE
                </div>
                <div className="text-[24px] font-bold tracking-[0.04em]">{WIFI_PASS}</div>
              </div>
              <button
                type="button"
                onClick={copyWifi}
                className="mt-[14px] flex w-full cursor-pointer appearance-none items-center justify-center gap-[9px] rounded-[14px] border-none bg-[#8A9E84] p-4 text-[13px] font-bold tracking-[0.08em] text-white"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                <span aria-live="polite">{copied ? "¡CLAVE COPIADA!" : "COPIAR CLAVE"}</span>
              </button>
              <p className="mx-2 mt-5 text-center text-[13px] leading-[1.7] text-[#5D6B5A]">
                Copia la clave y pégala en la configuración Wi-Fi de tu teléfono. Señal disponible
                en toda la cabaña y la terraza.
              </p>
            </div>
          </div>
        )}

        {screen === "checkin" && (
          <div>
            <SubHeader title="Check-in & acceso" onBack={goHome} />
            <div className="px-5 pt-6 pb-10">
              <div className="mb-5 flex gap-[11px]">
                <div className="flex-1 rounded-[16px] border border-[rgba(46,58,48,0.08)] bg-[#FBFAF6] p-[18px] text-center">
                  <div className="mb-[7px] text-[9px] font-semibold tracking-[0.24em] text-[#8A9E84]">
                    LLEGADA
                  </div>
                  <div className="text-[22px] font-bold">{CHECKIN_TIME}</div>
                </div>
                <div className="flex-1 rounded-[16px] border border-[rgba(46,58,48,0.08)] bg-[#FBFAF6] p-[18px] text-center">
                  <div className="mb-[7px] text-[9px] font-semibold tracking-[0.24em] text-[#8A9E84]">
                    SALIDA
                  </div>
                  <div className="text-[22px] font-bold">{CHECKOUT_TIME}</div>
                </div>
              </div>
              <div className="mb-[14px] text-[11px] font-semibold tracking-[0.3em] text-[#8A9E84]">
                PASOS PARA ENTRAR
              </div>
              <ol className="flex flex-col gap-3">
                {checkinSteps.map((step, i) => (
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
                  Estacionamiento gratuito en la propiedad.
                </div>
              </div>
            </div>
          </div>
        )}

        {screen === "rules" && (
          <div>
            <SubHeader title="Reglas del hogar" onBack={goHome} />
            <div className="px-5 pt-6 pb-10">
              <div>
                {ruleSections.map((section) => (
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
                Gracias por cuidar este lugar como si fuera tuyo.
              </p>
            </div>
          </div>
        )}

        {screen === "location" && (
          <div>
            <SubHeader title="Cómo volver" onBack={goHome} />
            <div className="px-5 pt-5 pb-10">
              <div className="mt-[14px] rounded-[16px] border border-[rgba(46,58,48,0.08)] bg-[#FBFAF6] p-5">
                <div className="mb-[7px] text-[10px] font-semibold tracking-[0.3em] text-[#8A9E84]">
                  DIRECCIÓN
                </div>
                <div className="text-[16px] font-semibold text-[#2E3A30]">Sector Pino Huacho 2</div>
                <div className="mt-0.5 text-[13px] text-[#8a8a82]">Valdivia, Los Ríos · Chile</div>
              </div>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=-39.865443,-73.375001&travelmode=driving"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex w-full items-center justify-center gap-[10px] rounded-[14px] bg-[#2E3A30] p-4 text-[13px] font-bold tracking-[0.06em] text-[#F5F5F2]"
              >
                <NavigationArrow size={18} />
                CÓMO VOLVER EN GOOGLE MAPS
              </a>
              <Image
                src={cerroPhoto}
                alt="Indicaciones para transitar por el cerro"
                className="mt-[14px] block w-full rounded-[16px]"
              />
              <div className="mt-[14px] flex gap-3 rounded-[14px] bg-[#E9ECE5] px-4 py-[15px]">
                <Info size={21} className="flex-none text-[#2E3A30]" />
                <div className="text-[12.5px] leading-[1.5] text-[#3A463C]">
                  El camino de subida es parte del encanto: tranquilo y rodeado de naturaleza.
                  Algunos tramos son angostos y pasa un auto a la vez, así que te recomendamos ir
                  con calma. Por ley, quien sube tiene la preferencia, pero aquí nos cuidamos entre
                  vecinos: si ves que alguien ya viene bajando a mitad de camino, regálale la
                  pasada. Manejando despacio y con atención, llegarás sin problema.
                </div>
              </div>
            </div>
          </div>
        )}

        {screen === "appliances" && (
          <div>
            <SubHeader title="Cómo usar los artefactos" onBack={goHome} />
            <div className="px-5 pt-5 pb-10">
              <p className="mb-[18px] text-[13px] leading-[1.6] text-[#5D6B5A]">
                Guía rápida de los equipos de la cabaña. Sigue los pasos de cada uno.
              </p>
              <ul className="flex flex-col gap-3">
                {appliances.map((a) => (
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
                  ¿Algo no funciona o tienes dudas? Escríbeme por WhatsApp y te ayudo.
                </div>
              </div>
            </div>
          </div>
        )}

        {screen === "markets" && (
          <PlaceListScreen
            title="Supermercados"
            intro="Para abastecerte en Valdivia. Toca para abrir en Google Maps."
            items={markets}
            icon={ShoppingCartSimple}
            onBack={goHome}
          />
        )}

        {screen === "food" && (
          <PlaceListScreen
            title="Dónde comer"
            intro="Nuestros favoritos en Valdivia. Toca para ver en el mapa."
            items={food}
            icon={ForkKnife}
            onBack={goHome}
          />
        )}

        {screen === "explore" && (
          <PlaceListScreen
            title="Qué hacer"
            intro="Lo mejor de Valdivia y sus alrededores."
            items={explore}
            icon={Compass}
            onBack={goHome}
          />
        )}

        {screen === "checkout" && (
          <div>
            <SubHeader title="Antes de irte" onBack={goHome} />
            <div className="px-5 pt-6 pb-10">
              <div className="mb-5 flex items-center justify-between rounded-[16px] bg-[#2E3A30] px-5 py-[18px] text-[#F5F5F2]">
                <span className="text-[11px] font-semibold tracking-[0.2em] text-[#A7B6A1]">
                  CHECK-OUT
                </span>
                <span className="text-[20px] font-bold">{CHECKOUT_TIME}</span>
              </div>
              <ul>
                {checkoutSteps.map((s) => (
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
                ¡Gracias por tu visita! Vuelve pronto.
              </p>
            </div>
          </div>
        )}

        {screen === "contact" && (
          <div>
            <SubHeader title="Contacto" onBack={goHome} />
            <div className="px-5 pt-[30px] pb-10 text-center">
              <div className="mx-auto mb-[18px] grid h-[72px] w-[72px] place-items-center rounded-full bg-[#2E3A30] text-[#A7B6A1]">
                <ChatCircleDots size={34} />
              </div>
              <div className="font-serif text-[26px] font-medium text-[#2E3A30]">Anita</div>
              <div className="mt-1 text-[10px] font-semibold tracking-[0.3em] text-[#8A9E84]">
                TU ANFITRIONA
              </div>
              <p className="mx-auto mt-[18px] mb-[26px] max-w-[280px] text-[14px] leading-[1.6] text-[#5D6B5A]">
                Esta guía responde casi todo, pero si necesitas algo, escríbeme por WhatsApp. Estoy
                para ayudarte.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-[10px] rounded-[14px] bg-[#8A9E84] p-4 text-[13px] font-bold tracking-[0.06em] text-white"
              >
                <WhatsappLogo size={20} />
                ESCRIBIR POR WHATSAPP
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
