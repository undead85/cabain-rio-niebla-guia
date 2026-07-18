import {
  Bag,
  ChatCircleDots,
  CigaretteSlash,
  Coffee,
  Compass,
  CookingPot,
  Drop,
  DropSlash,
  Flame,
  ForkKnife,
  Key,
  Lightbulb,
  MapPinLine,
  Plant,
  Plug,
  Prohibit,
  Scroll,
  ShoppingCartSimple,
  Sparkle,
  SuitcaseSimple,
  TShirt,
  TelevisionSimple,
  ThermometerSimple,
  Trash,
  WifiHigh,
  Wind,
} from "@phosphor-icons/react";
import { WIFI_NETWORK } from "./site";
import type {
  AppliancesContent,
  Category,
  CheckinContent,
  CheckoutContent,
  ContactContent,
  HomeContent,
  LocationContent,
  PlaceListContent,
  RulesContent,
  WifiContent,
} from "./types";

export const categories: Category[] = [
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

export const homeContent: HomeContent = {
  kicker: "GUÍA DEL HUÉSPED",
  title: "ENTRE RÍO Y NIEBLA",
  tagline: "CABAÑA · VALDIVIA",
  welcome: "Qué bueno tenerte aquí. Todo lo que necesitas, a un toque.",
  checkinLabel: "CHECK-IN",
  checkoutLabel: "CHECK-OUT",
  wifiLabel: "WI-FI",
  photoAlt: "Cabaña Entre Río y Niebla",
  navLabel: "Secciones de la guía",
  farewell: "Cualquier cosa, estoy para ayudarte. — Anita",
};

export const wifiContent: WifiContent = {
  title: "Wi-Fi",
  networkLabel: "RED",
  passLabel: "CLAVE",
  copyCta: "COPIAR CLAVE",
  copiedCta: "¡CLAVE COPIADA!",
  hint: "Copia la clave y pégala en la configuración Wi-Fi de tu teléfono. Señal disponible en toda la cabaña y la terraza.",
};

export const checkinContent: CheckinContent = {
  title: "Check-in & acceso",
  arrivalLabel: "LLEGADA",
  departureLabel: "SALIDA",
  stepsLabel: "PASOS PARA ENTRAR",
  steps: [
    "Avísame cuando estés en camino para coordinar tu llegada.",
    "El acceso es por el sector Pino Huacho 2; el camino tiene huellas de cemento y sube cualquier vehículo.",
    "Te enviaré el código de la cerradura el día de tu llegada. ¡Bienvenido!",
  ],
  parkingNote: "Estacionamiento gratuito en la propiedad.",
};

export const rulesContent: RulesContent = {
  title: "Reglas del hogar",
  sections: [
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
  ],
  farewell: "Gracias por cuidar este lugar como si fuera tuyo.",
};

export const locationContent: LocationContent = {
  title: "Cómo volver",
  addressLabel: "DIRECCIÓN",
  address: "Sector Pino Huacho 2",
  addressDetail: "Valdivia, Los Ríos · Chile",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=-39.865443,-73.375001&travelmode=driving",
  directionsCta: "CÓMO VOLVER EN GOOGLE MAPS",
  photoAlt: "Indicaciones para transitar por el cerro",
  roadNote:
    "El camino de subida es parte del encanto: tranquilo y rodeado de naturaleza. Algunos tramos son angostos y pasa un auto a la vez, así que te recomendamos ir con calma. Por ley, quien sube tiene la preferencia, pero aquí nos cuidamos entre vecinos: si ves que alguien ya viene bajando a mitad de camino, regálale la pasada. Manejando despacio y con atención, llegarás sin problema.",
};

export const appliancesContent: AppliancesContent = {
  title: "Cómo usar los artefactos",
  intro: "Guía rápida de los equipos de la cabaña. Sigue los pasos de cada uno.",
  items: [
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
  ],
  helpNote: "¿Algo no funciona o tienes dudas? Escríbeme por WhatsApp y te ayudo.",
};

export const marketsContent: PlaceListContent = {
  title: "Supermercados",
  intro: "Para abastecerte en Valdivia. Toca para abrir en Google Maps.",
  icon: ShoppingCartSimple,
  items: [
    { name: "Jumbo Valdivia", note: "El más grande, de todo", q: "Jumbo Valdivia" },
    { name: "Líder Valdivia", note: "Variedad y buen precio", q: "Lider Valdivia" },
    { name: "Unimarc", note: "Céntrico y práctico", q: "Unimarc Valdivia" },
    { name: "Santa Isabel", note: "Compras rápidas", q: "Santa Isabel Valdivia" },
    { name: "Mercado Fluvial", note: "Pescados y mariscos frescos", q: "Mercado Fluvial Valdivia" },
  ],
};

export const foodContent: PlaceListContent = {
  title: "Dónde comer",
  intro: "Nuestros favoritos en Valdivia. Toca para ver en el mapa.",
  icon: ForkKnife,
  items: [
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
  ],
};

export const exploreContent: PlaceListContent = {
  title: "Qué hacer",
  intro: "Lo mejor de Valdivia y sus alrededores.",
  icon: Compass,
  items: [
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
  ],
};

export const checkoutContent: CheckoutContent = {
  title: "Antes de irte",
  checkoutLabel: "CHECK-OUT",
  steps: [
    "Deja las llaves donde acordamos al ingresar.",
    "Apaga luces, calefacción y cierra ventanas.",
    "Saca la basura al lugar indicado.",
    "Deja la loza limpia; del resto me encargo yo.",
  ],
  farewell: "¡Gracias por tu visita! Vuelve pronto.",
};

export const contactContent: ContactContent = {
  title: "Contacto",
  name: "Anita",
  role: "TU ANFITRIONA",
  message:
    "Esta guía responde casi todo, pero si necesitas algo, escríbeme por WhatsApp. Estoy para ayudarte.",
  cta: "ESCRIBIR POR WHATSAPP",
};
