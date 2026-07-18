import { Car } from "@phosphor-icons/react";
import SubHeader from "@/components/ui/SubHeader";
import { checkinContent } from "@/content/guide";
import { CHECKIN_TIME, CHECKOUT_TIME } from "@/content/site";

interface CheckinScreenProps {
  onBack: () => void;
}

export default function CheckinScreen({ onBack }: CheckinScreenProps) {
  return (
    <div>
      <SubHeader title={checkinContent.title} onBack={onBack} />
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
  );
}
