import SubHeader from "@/components/ui/SubHeader";
import { rulesContent } from "@/content/guide";

interface RulesScreenProps {
  onBack: () => void;
}

export default function RulesScreen({ onBack }: RulesScreenProps) {
  return (
    <div>
      <SubHeader title={rulesContent.title} onBack={onBack} />
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
                      <div className="text-[14px] font-semibold text-[#2E3A30]">{r.title}</div>
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
  );
}
