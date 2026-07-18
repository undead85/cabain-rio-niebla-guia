import { Question } from "@phosphor-icons/react";
import IconTile from "@/components/ui/IconTile";
import StepRow from "@/components/ui/StepRow";
import SubHeader from "@/components/ui/SubHeader";
import { appliancesContent } from "@/content/guide";

interface AppliancesScreenProps {
  onBack: () => void;
}

export default function AppliancesScreen({ onBack }: AppliancesScreenProps) {
  return (
    <div>
      <SubHeader title={appliancesContent.title} onBack={onBack} />
      <div className="px-5 pt-5 pb-10">
        <p className="mb-[18px] text-[13px] leading-[1.6] text-subtle">
          {appliancesContent.intro}
        </p>
        <ul className="flex flex-col gap-3">
          {appliancesContent.items.map((a) => (
            <li
              key={a.title}
              className="rounded-[16px] border border-primary/8 bg-surface px-[18px] py-4"
            >
              <div className="mb-[13px] flex items-center gap-[13px]">
                <IconTile icon={a.icon} />
                <div>
                  <h3 className="text-[15px] font-bold text-primary">{a.title}</h3>
                  <div className="mt-px text-[12px] text-muted-foreground">{a.subtitle}</div>
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
        <div className="mt-[18px] flex gap-3 rounded-[14px] bg-muted px-4 py-[15px]">
          <Question size={21} className="flex-none text-primary" />
          <div className="text-[12.5px] leading-[1.5] text-foreground">
            {appliancesContent.helpNote}
          </div>
        </div>
      </div>
    </div>
  );
}
