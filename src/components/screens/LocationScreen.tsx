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
        <div className="mt-[14px] rounded-[16px] border border-[rgba(46,58,48,0.08)] bg-[#FBFAF6] p-5">
          <div className="mb-[7px] text-[10px] font-semibold tracking-[0.3em] text-[#8A9E84]">
            {locationContent.addressLabel}
          </div>
          <div className="text-[16px] font-semibold text-[#2E3A30]">{locationContent.address}</div>
          <div className="mt-0.5 text-[13px] text-[#8a8a82]">{locationContent.addressDetail}</div>
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
  );
}
