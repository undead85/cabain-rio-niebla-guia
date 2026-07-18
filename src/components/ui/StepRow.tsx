interface StepRowProps {
  num: number;
  text: string;
}

export default function StepRow({ num, text }: StepRowProps) {
  return (
    <li className="flex items-start gap-[11px]">
      <div className="mt-px grid h-[22px] w-[22px] flex-none place-items-center rounded-full bg-primary text-[11px] font-bold text-white">
        {num}
      </div>
      <div className="text-[13px] leading-[1.5] text-foreground">{text}</div>
    </li>
  );
}
