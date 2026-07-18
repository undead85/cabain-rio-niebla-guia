import { CaretRight } from "@phosphor-icons/react";
import IconTile from "@/components/ui/IconTile";
import SubHeader from "@/components/ui/SubHeader";
import type { PlaceListContent } from "@/content/types";

interface PlaceListScreenProps {
  content: PlaceListContent;
  onBack: () => void;
}

function mapsSearchUrl(q: string) {
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
}

export default function PlaceListScreen({ content, onBack }: PlaceListScreenProps) {
  return (
    <div>
      <SubHeader title={content.title} onBack={onBack} />
      <div className="px-5 pt-5 pb-10">
        <p className="mb-4 text-[13px] leading-[1.6] text-[#5D6B5A]">{content.intro}</p>
        <ul className="flex flex-col gap-[11px]">
          {content.items.map((item) => (
            <li key={item.name}>
              <a
                href={mapsSearchUrl(item.q)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-[14px] rounded-[16px] border border-[rgba(46,58,48,0.08)] bg-[#FBFAF6] p-4"
              >
                <IconTile icon={content.icon} />
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
