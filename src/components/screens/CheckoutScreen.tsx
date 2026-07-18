import { CheckCircle } from "@phosphor-icons/react";
import SubHeader from "@/components/ui/SubHeader";
import { checkoutContent } from "@/content/guide";
import { CHECKOUT_TIME } from "@/content/site";

interface CheckoutScreenProps {
  onBack: () => void;
}

export default function CheckoutScreen({ onBack }: CheckoutScreenProps) {
  return (
    <div>
      <SubHeader title={checkoutContent.title} onBack={onBack} />
      <div className="px-5 pt-6 pb-10">
        <div className="mb-5 flex items-center justify-between rounded-[16px] bg-[#2E3A30] px-5 py-[18px] text-[#F5F5F2]">
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[#A7B6A1]">
            {checkoutContent.checkoutLabel}
          </span>
          <span className="text-[20px] font-bold">{CHECKOUT_TIME}</span>
        </div>
        <ul>
          {checkoutContent.steps.map((s) => (
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
          {checkoutContent.farewell}
        </p>
      </div>
    </div>
  );
}
