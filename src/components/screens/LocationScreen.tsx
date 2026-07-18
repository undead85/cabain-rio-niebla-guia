import Image from "next/image";
import { Info, NavigationArrow } from "@phosphor-icons/react";
import SubHeader from "@/components/ui/SubHeader";
import { locationContent } from "@/content/guide";
import cerroPhoto from "../../../public/images/cerro-indicaciones.png";

interface LocationScreenProps {
  onBack: () => void;
}

export default function LocationScreen({ onBack }: LocationScreenProps) {
  return (
    <div>
      <SubHeader title={locationContent.title} onBack={onBack} />
      <div className="px-5 pt-5 pb-10">
        <div className="mt-[14px] rounded-[16px] border border-primary/8 bg-surface p-5">
          <div className="mb-[7px] text-[10px] font-semibold tracking-[0.3em] text-accent">
            {locationContent.addressLabel}
          </div>
          <div className="text-[16px] font-semibold text-primary">{locationContent.address}</div>
          <div className="mt-0.5 text-[13px] text-muted-foreground">{locationContent.addressDetail}</div>
        </div>
        <a
          href={locationContent.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex w-full items-center justify-center gap-[10px] rounded-[14px] bg-primary p-4 text-[13px] font-bold tracking-[0.06em] text-cream"
        >
          <NavigationArrow size={18} />
          {locationContent.directionsCta}
        </a>
        <Image
          src={cerroPhoto}
          alt={locationContent.photoAlt}
          className="mt-[14px] block w-full rounded-[16px]"
        />
        <div className="mt-[14px] flex gap-3 rounded-[14px] bg-muted px-4 py-[15px]">
          <Info size={21} className="flex-none text-primary" />
          <div className="text-[12.5px] leading-[1.5] text-foreground">
            {locationContent.roadNote}
          </div>
        </div>
      </div>
    </div>
  );
}
