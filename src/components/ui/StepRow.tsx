interface StepRowProps {
  num: number;
  text: string;
}

export default function StepRow({ num, text }: StepRowProps) {
  return (
    <li className="flex items-start gap-[11px]">
      <div className="mt-px grid h-[22px] w-[22px] flex-none place-items-center rounded-full bg-[#2E3A30] text-[11px] font-bold text-white">
        {num}
      </div>
      <div className="text-[13px] leading-[1.5] text-[#3A463C]">{text}</div>
    </li>
  );
}
